import {AST_NODE_TYPES, ESLintUtils} from '@typescript-eslint/utils';
import ts from 'typescript';

import {
    DEFAULT_DECORATORS,
    getDecoratorName,
    isCallbackUsage,
    isThisBindCall,
    methodUsesThis,
    normalizeDecoratorNames,
    unwrapExpression
} from './utils/no-unbound-method-utils';

import type {TSESLint, TSESTree} from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
    name => `https://github.com/nfqde/eslint-config-nfq/blob/master/docs/rules/${name}.md`
);

type RuleOptions = [
    {decoratorNames?: string[]}?
];

type MessageIds = 'constructorBind' | 'unboundMethod';

type MethodInfo = {
    autoBind: boolean;
    hasDecorator: boolean;
    isStatic: boolean;
    usesThis: boolean;
};

export const noUnboundMethod = createRule<RuleOptions, MessageIds>({
    defaultOptions: [{decoratorNames: DEFAULT_DECORATORS}],
    meta: {
        docs: {description: 'Warn when unbound class methods that use this are passed as callbacks.'},
        messages: {
            constructorBind: 'Do not bind in the constructor; prefer {{decoratorName}}.',
            unboundMethod: 'Method {{methodName}} uses this and is passed unbound. Add {{decoratorName}} or bind it.'
        },
        schema: [
            {
                additionalProperties: false,
                properties: {
                    decoratorNames: {
                        items: {type: 'string'},
                        type: 'array',
                        uniqueItems: true
                    }
                },
                type: 'object'
            }
        ],
        type: 'problem'
    },
    name: 'no-unbound-method',
    /**
     * Creates the rule listeners and initializes caches for symbol analysis.
     * It wires the parser services to the TypeScript type checker and configures decorator handling.
     * It returns ESLint listeners that report unbound method usage in callbacks and constructor binding.
     *
     * @param context Rule context used to access parser services and report issues.
     * @returns The rule listener map for this rule.
     *
     * @example
     * ```tsx
     * const listeners = rule.create(context);
     * ```
     */
    // eslint-disable-next-line max-lines-per-function
    create(context) {
        const services = ESLintUtils.getParserServices(context);
        const checker = services.program.getTypeChecker();
        const decoratorNames = normalizeDecoratorNames(context.options[0]?.decoratorNames);
        const decoratorLabel = `@${Array.from(decoratorNames)[0] ?? 'autobind'}`;
        const methodCache = new Map<ts.Symbol, MethodInfo>();
        const reportCache = new Map<ts.Symbol, boolean>();
        const aliasCache = new Map<ts.Symbol, ts.Symbol>();
        const memberSymbolCache = new Map<TSESTree.MemberExpression, ts.Symbol | null>();
        const classAutoBindCache = new WeakMap<ts.ClassLikeDeclaration, boolean>();

        /**
         * Determines whether a TypeScript expression represents an options object with autoBind enabled. It validates
         * that the node is an object literal and inspects its properties for an autoBind flag. It returns true only
         * when the property exists and its initializer is the boolean literal true.
         *
         * @param node The TypeScript expression to inspect for an autoBind option.
         * @returns True when the expression is an object literal with autoBind set to true.
         *
         * @example
         * ```tsx
         * const enabled = isAutoBindOption(optionsExpression);
         * ```
         */
        const isAutoBindOption = (node: ts.Expression): boolean => {
            if (!ts.isObjectLiteralExpression(node)) {
                return false;
            }

            return node.properties.some(property => {
                if (!ts.isPropertyAssignment(property)) {
                    return false;
                }

                // eslint-disable-next-line no-nested-ternary
                const name = ts.isIdentifier(property.name)
                    ? property.name.text
                    : ts.isStringLiteral(property.name)
                        ? property.name.text
                        : null;

                if (name !== 'autoBind') {
                    return false;
                }

                return property.initializer.kind === ts.SyntaxKind.TrueKeyword;
            });
        };

        /**
         * Checks whether a TypeScript expression refers to a makeAutoObservable call target. It accepts both a direct
         * identifier reference and a property access reference on another expression. It returns true only when the
         * identifier text matches the expected callee name.
         *
         * @param node The TypeScript expression to test as a potential callee.
         * @returns True when the expression resolves to a makeAutoObservable identifier or property access.
         *
         * @example
         * ```tsx
         * const matches = isMakeAutoObservableCallee(callExpression.expression);
         * ```
         */
        const isMakeAutoObservableCallee = (node: ts.Expression): boolean => {
            if (ts.isIdentifier(node)) {
                return node.text === 'makeAutoObservable';
            }

            return ts.isPropertyAccessExpression(node) && node.name.text === 'makeAutoObservable';
        };

        /**
         * Determines whether a class constructor calls `makeAutoObservable` with autoBind enabled. It inspects the
         * constructor body for a qualifying call expression and caches the result to avoid repeated scans. It returns
         * true only when the call targets `this` and includes an options object that sets autoBind to true.
         *
         * @param classDecl The class declaration whose constructor should be inspected.
         * @returns True when the constructor configures autoBind via makeAutoObservable.
         *
         *
         * @example
         * ```tsx
         * const enabled = hasAutoBindInConstructor(classDeclaration);
         * ```
         */
        const hasAutoBindInConstructor = (classDecl: ts.ClassLikeDeclaration): boolean => {
            const cached = classAutoBindCache.get(classDecl);

            if (cached !== undefined) {
                return cached;
            }

            const ctor = classDecl.members.find(member => ts.isConstructorDeclaration(member));

            if (!ctor?.body) {
                classAutoBindCache.set(classDecl, false);

                return false;
            }

            for (const statement of ctor.body.statements) {
                if (!ts.isExpressionStatement(statement)) {
                    continue;
                }

                const expr = statement.expression;

                if (!ts.isCallExpression(expr)) {
                    continue;
                }

                if (!isMakeAutoObservableCallee(expr.expression)) {
                    continue;
                }

                // eslint-disable-next-line @nfq/no-magic-numbers
                if (expr.arguments.length < 2) {
                    continue;
                }

                if (expr.arguments[0].kind !== ts.SyntaxKind.ThisKeyword) {
                    continue;
                }

                const hasAutoBind = expr.arguments.slice(1).some(arg => isAutoBindOption(arg));

                if (hasAutoBind) {
                    classAutoBindCache.set(classDecl, true);

                    return true;
                }
            }

            classAutoBindCache.set(classDecl, false);

            return false;
        };

        /**
         * Resolves an alias symbol to its original symbol and caches the result for reuse.
         * This function avoids repeated TypeScript checker work by memoizing alias resolutions.
         * It ensures downstream analysis consistently uses the same canonical symbol instance.
         *
         * @param symbol The symbol that may be an alias and needs resolution.
         * @returns The resolved canonical symbol for further analysis.
         *
         * @example
         * ```tsx
         * const resolved = resolveSymbol(methodSymbol);
         * ```
         */
        const resolveSymbol = (symbol: ts.Symbol): ts.Symbol => {
            const cached = aliasCache.get(symbol);

            if (cached) {
                return cached;
            }

            // eslint-disable-next-line no-bitwise
            const resolved = symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol;

            aliasCache.set(symbol, resolved);

            return resolved;
        };

        /**
         * Computes metadata about a method-like symbol and caches the result for later use.
         * This function filters out non-method symbols and constructor declarations before gathering details.
         * It also determines decorator presence, static status, and whether the method uses `this`.
         *
         * @param symbol The symbol to inspect for method information.
         * @returns The resolved method info or null when the symbol is not a supported method.
         *
         * @example
         * ```tsx
         * const info = getMethodInfo(methodSymbol);
         * ```
         */
        const getMethodInfo = (symbol: ts.Symbol): MethodInfo | null => {
            const aliased = resolveSymbol(symbol);
            const cached = methodCache.get(aliased);

            if (cached) {
                return cached;
            }

            if (!(
                // eslint-disable-next-line no-bitwise
                aliased.flags
                & (
                    // eslint-disable-next-line no-bitwise
                    ts.SymbolFlags.Method
                    | ts.SymbolFlags.Property
                    | ts.SymbolFlags.Function
                    | ts.SymbolFlags.GetAccessor
                    | ts.SymbolFlags.SetAccessor
                )
            )) {
                return null;
            }

            const declarations = aliased.getDeclarations() ?? [];
            const methodDecl = declarations
                .find(decl => ts.isMethodDeclaration(decl));

            if (!methodDecl?.parent || !ts.isClassLike(methodDecl.parent)) {
                return null;
            }

            if (ts.isIdentifier(methodDecl.name) && methodDecl.name.text === 'constructor') {
                return null;
            }

            const flags = ts.getCombinedModifierFlags(methodDecl);
            // eslint-disable-next-line no-bitwise
            const isStatic = Boolean(flags & ts.ModifierFlags.Static);
            const decorators = ts.canHaveDecorators(methodDecl) ? ts.getDecorators(methodDecl) : undefined;
            const hasDecorator = Boolean(decorators?.some(decorator => {
                const name = getDecoratorName(decorator);

                return Boolean(name && decoratorNames.has(name));
            }));

            const info: MethodInfo = {
                autoBind: hasAutoBindInConstructor(methodDecl.parent),
                hasDecorator,
                isStatic,
                usesThis: methodUsesThis(methodDecl)
            };

            methodCache.set(aliased, info);

            return info;
        };

        /**
         * Determines whether a symbol should be reported as an unbound method.
         * It resolves aliases and consults cached results to avoid repeated analysis.
         * It evaluates method metadata to ensure only non-static methods that use `this` and lack decorators are flagged.
         *
         * @param symbol The symbol to evaluate for reporting eligibility.
         * @returns True when the symbol represents an unbound method that should be reported.
         *
         * @example
         * ```tsx
         * const shouldReport = shouldReportSymbol(methodSymbol);
         * ```
         */
        const shouldReportSymbol = (symbol: ts.Symbol): boolean => {
            const aliased = resolveSymbol(symbol);
            const cached = reportCache.get(aliased);

            if (cached !== undefined) {
                return cached;
            }

            const info = getMethodInfo(aliased);

            if (!info) {
                reportCache.set(aliased, false);

                return false;
            }

            const shouldReport = !info.autoBind && !info.isStatic && info.usesThis && !info.hasDecorator;

            reportCache.set(aliased, shouldReport);

            return shouldReport;
        };

        /**
         * Resolves the TypeScript symbol associated with a member expression node.
         * It caches the resolved symbol to minimize repeated checker lookups.
         * It supports both property access and string-literal element access expressions.
         *
         * @param node The member expression node to resolve into a symbol.
         * @returns The resolved symbol, or null when no symbol can be determined.
         *
         * @example
         * ```tsx
         * const symbol = getSymbolForMember(memberExpression);
         * ```
         */
        const getSymbolForMember = (node: TSESTree.MemberExpression): ts.Symbol | null => {
            const cached = memberSymbolCache.get(node);

            if (cached !== undefined) {
                return cached;
            }

            const tsNode = services.esTreeNodeToTSNodeMap.get(node);

            if (ts.isPropertyAccessExpression(tsNode)) {
                const symbol = checker.getSymbolAtLocation(tsNode.name) ?? null;

                memberSymbolCache.set(node, symbol);

                return symbol;
            }

            if (ts.isElementAccessExpression(tsNode)) {
                const arg = tsNode.argumentExpression;

                if (ts.isStringLiteralLike(arg)) {
                    const symbol = checker.getSymbolAtLocation(arg) ?? null;

                    memberSymbolCache.set(node, symbol);

                    return symbol;
                }
            }

            memberSymbolCache.set(node, null);

            return null;
        };

        /**
         * Reports a constructor binding assignment for a method name.
         * It formats the report data with the decorator label and method name.
         * It delegates to the ESLint context to surface the diagnostic at the provided node.
         *
         * @param methodName The name of the method that was bound in the constructor.
         * @param node       The AST node that represents the binding expression.
         *
         * @example
         * ```tsx
         * reportConstructorBinding('handleClick', expressionNode);
         * ```
         */
        const reportConstructorBinding = (methodName: string, node: TSESTree.Node) => {
            context.report({
                data: {
                    decoratorName: decoratorLabel,
                    methodName
                },
                messageId: 'constructorBind',
                node
            });
        };

        const listeners: TSESLint.RuleListener = {
            /**
             * Processes a member expression node to determine whether it represents an unbound method usage that
             * should be reported. It performs multiple early returns based on node shape, parent usage, callback context,
             * binding checks, and symbol eligibility. It ultimately reports a linting issue when all conditions
             * indicate a problematic unbound method reference.
             *
             * @param node The member expression node to analyze for unbound method usage.
             *
             * @example
             * ```tsx
             * MemberExpression(node);
             * ```
             */
            MemberExpression(node: TSESTree.MemberExpression) {
                if (node.property.type !== AST_NODE_TYPES.Identifier) {
                    return;
                }

                const {parent} = node;

                if (
                    (parent.type === AST_NODE_TYPES.CallExpression || parent.type === AST_NODE_TYPES.NewExpression)
                    && parent.callee === node
                ) {
                    return;
                }

                if (!isCallbackUsage(node)) {
                    return;
                }

                if (isThisBindCall(node)) {
                    return;
                }

                const symbol = getSymbolForMember(node);

                if (!symbol) {
                    return;
                }

                if (!shouldReportSymbol(symbol)) {
                    return;
                }

                context.report({
                    data: {
                        decoratorName: decoratorLabel,
                        methodName: node.property.name
                    },
                    messageId: 'unboundMethod',
                    node
                });
            },
            /**
             * Inspects constructor method definitions to detect assignments where a class method
             * is bound to `this` via `.bind(this)`, and reports such bindings for further handling.
             *
             * @param node The method definition node to analyze.
             */
            MethodDefinition(node: TSESTree.MethodDefinition) {
                if (node.kind !== 'constructor' || !node.value.body) {
                    return;
                }

                const constructorBody = node.value.body;

                for (const statement of constructorBody.body) {
                    if (statement.type !== AST_NODE_TYPES.ExpressionStatement) {
                        continue;
                    }

                    const {expression} = statement;

                    if (expression.type !== AST_NODE_TYPES.AssignmentExpression || expression.operator !== '=') {
                        continue;
                    }

                    const {left, right} = expression;

                    if (
                        left.type !== AST_NODE_TYPES.MemberExpression
                        || left.property.type !== AST_NODE_TYPES.Identifier
                    ) {
                        continue;
                    }

                    if (left.object.type !== AST_NODE_TYPES.ThisExpression) {
                        continue;
                    }

                    if (right.type !== AST_NODE_TYPES.CallExpression) {
                        continue;
                    }

                    const {callee} = right;

                    if (callee.type !== AST_NODE_TYPES.MemberExpression) {
                        continue;
                    }

                    if (
                        callee.object.type !== AST_NODE_TYPES.MemberExpression
                        || callee.object.object.type !== AST_NODE_TYPES.ThisExpression
                        || callee.object.property.type !== AST_NODE_TYPES.Identifier
                        || callee.object.property.name !== left.property.name
                    ) {
                        continue;
                    }

                    if (
                        callee.property.type !== AST_NODE_TYPES.Identifier
                        || callee.property.name !== 'bind'
                    ) {
                        continue;
                    }

                    if (right.arguments.length === 0) {
                        continue;
                    }

                    const firstArg = unwrapExpression(right.arguments[0] as TSESTree.Expression);

                    if (firstArg.type !== AST_NODE_TYPES.ThisExpression) {
                        continue;
                    }

                    reportConstructorBinding(left.property.name, expression);
                }
            }
        };

        return listeners;
    }
});