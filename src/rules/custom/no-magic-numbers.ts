import {AST_NODE_TYPES, ASTUtils, ESLintUtils} from '@typescript-eslint/utils';

import {isNumericLiteral, isSpecificId, isSpecificMemberAccess} from './utils/ast-utils';
import {normalizeIgnoreValue} from './utils/no-magic-numbers-utils';

import type {TSESLint, TSESTree} from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
    name => `https://github.com/nfqde/eslint-config-nfq/blob/master/docs/rules/${name}.md`
);

// Maximum array length by the ECMAScript Specification.
// eslint-disable-next-line @nfq/no-magic-numbers
const MAX_ARRAY_LENGTH = 2 ** 32 - 1;

type RuleOptions = [
    {
        detectObjects?: boolean;
        enforceConst?: boolean;
        ignore?: (number | string)[];
        ignoreArrayIndexes?: boolean;
        ignoreArrays?: boolean;
        ignoreClassFieldInitialValues?: boolean;
        ignoreConstDeclarations?: boolean;
        ignoreDefaultValues?: boolean;
        ignoreFunctions?: string[];
    }
];

type MessageIds = 'noMagic' | 'useConst';

export const noMagicNumbers = createRule<RuleOptions, MessageIds>({
    defaultOptions: [{}],
    meta: {
        docs: {description: 'Disallow magic numbers, allows for ignoring functions'},
        messages: {
            noMagic: 'No magic number: {{raw}}.',
            useConst: "Number constants declarations must use 'const'."
        },
        schema: [
            {
                additionalProperties: false,
                properties: {
                    detectObjects: {
                        default: false,
                        type: 'boolean'
                    },
                    enforceConst: {
                        default: false,
                        type: 'boolean'
                    },
                    ignore: {
                        items: {
                            anyOf: [
                                {type: 'number'},
                                {
                                    pattern: '^[+-]?(?:0|[1-9][0-9]*)n$',
                                    type: 'string'
                                }
                            ]
                        },
                        type: 'array',
                        uniqueItems: true
                    },
                    ignoreArrayIndexes: {
                        default: false,
                        type: 'boolean'
                    },
                    ignoreArrays: {
                        default: false,
                        type: 'boolean'
                    },
                    ignoreClassFieldInitialValues: {
                        default: false,
                        type: 'boolean'
                    },
                    ignoreConstDeclarations: {
                        default: false,
                        type: 'boolean'
                    },
                    ignoreDefaultValues: {
                        default: false,
                        type: 'boolean'
                    },
                    ignoreFunctions: {
                        items: {type: 'string'},
                        type: 'array',
                        uniqueItems: true
                    }
                },
                type: 'object'
            }
        ],
        type: 'suggestion'
    },
    name: 'no-magic-numbers',
    /**
     * Creates the rule listener set used to report magic numbers based on configured options.
     * It initializes configuration flags and helper predicates that keep the rule logic readable and consistent.
     * It returns the listener object that ESLint invokes for each relevant node in the AST.
     *
     * @param context The rule context providing options, reporting utilities, and source information.
     * @returns The listener map that ESLint uses to traverse and validate nodes.
     *
     * @example
     * ```tsx
     * const listeners = create(context);
     * ```
     */
    create(context) {
        const config = context.options[0];
        const detectObjects = Boolean(config.detectObjects);
        const enforceConst = Boolean(config.enforceConst);
        const ignore = new Set((config.ignore ?? []).map(normalizeIgnoreValue));
        const ignoreArrays = Boolean(config.ignoreArrays);
        const ignoreArrayIndexes = Boolean(config.ignoreArrayIndexes);
        const ignoreDefaultValues = Boolean(config.ignoreDefaultValues);
        const ignoreClassFieldInitialValues = Boolean(config.ignoreClassFieldInitialValues);
        const ignoreConstDeclarations = Boolean(config.ignoreConstDeclarations);
        const ignoreFunctions = config.ignoreFunctions ?? [];

        const okTypes = detectObjects
            ? []
            : [AST_NODE_TYPES.ObjectExpression, AST_NODE_TYPES.Property, AST_NODE_TYPES.AssignmentExpression];

        /**
         * Determines whether a numeric literal value should be ignored based on the configured ignore set.
         * This helper keeps the rule logic concise by centralizing the ignore lookup.
         * It returns a boolean that directly maps to whether reporting should be skipped.
         *
         * @param value The numeric or bigint value to check against the ignore set.
         * @returns True when the value is present in the ignore set and should be skipped.
         *
         * @example
         * ```tsx
         * const ignored = isIgnoredValue(10);
         * ```
         */
        const isIgnoredValue = (value: bigint | number) => ignore.has(value);

        /**
         * Checks whether a numeric literal is used as a default value in an assignment pattern.
         * This supports the rule option to ignore default parameter values.
         * It returns true only when the literal is the right-hand side of an assignment pattern.
         *
         * @param fullNumberNode The literal node that may be part of an assignment pattern.
         * @returns True when the node is a default value in an assignment pattern.
         *
         * @example
         * ```tsx
         * const ignored = isDefaultValue(node);
         * ```
         */
        const isDefaultValue = (fullNumberNode: TSESTree.Node) => {
            const {parent} = fullNumberNode;

            return Boolean(parent?.type === AST_NODE_TYPES.AssignmentPattern && parent.right === fullNumberNode);
        };

        /**
         * Determines whether a numeric literal is the initializer of a class field.
         * This supports the rule option to ignore class field initial values.
         * It returns true only when the literal is the value of a PropertyDefinition node.
         *
         * @param fullNumberNode The literal node that may be used as a class field initializer.
         * @returns True when the node is the initial value of a class field definition.
         *
         * @example
         * ```tsx
         * const ignored = isClassFieldInitialValue(node);
         * ```
         */
        const isClassFieldInitialValue = (fullNumberNode: TSESTree.Node) => {
            const {parent} = fullNumberNode;

            return Boolean(
                parent?.type === AST_NODE_TYPES.PropertyDefinition
                && parent.value === fullNumberNode
            );
        };

        /**
         * Determines whether a numeric literal represents the radix argument of a parseInt call.
         * It inspects the parent call expression and verifies the second argument position.
         * It only matches parseInt or Number.parseInt usage to keep the rule focused.
         *
         * @param fullNumberNode The numeric literal node to inspect within the call expression.
         * @returns True when the node is used as the radix argument in a parseInt call.
         *
         * @example
         * ```tsx
         * const ignored = isParseIntRadix(node);
         * ```
         */
        const isParseIntRadix = (fullNumberNode: TSESTree.Node) => {
            const {parent} = fullNumberNode;

            return Boolean(
                parent?.type === AST_NODE_TYPES.CallExpression
                && fullNumberNode === parent.arguments[1]
                && (
                    isSpecificId(parent.callee, 'parseInt')
                    || isSpecificMemberAccess(parent.callee, 'Number', 'parseInt')
                )
            );
        };

        /**
         * Checks whether a numeric literal appears within JSX syntax.
         * It looks at the parent node type and matches JSX-prefixed node types.
         * It returns a boolean to indicate whether the number should be treated as JSX-related.
         *
         * @param fullNumberNode The numeric literal node to evaluate for JSX context.
         * @returns True when the parent node is a JSX-related AST node.
         *
         * @example
         * ```tsx
         * const ignored = isJSXNumber(node);
         * ```
         */
        const isJSXNumber = (fullNumberNode: TSESTree.Node) => Boolean(fullNumberNode.parent?.type.startsWith('JSX'));

        /**
         * Determines whether a numeric literal is used as an array index.
         * It validates member expression usage and ensures the value is a non-negative integer or bigint.
         * It also enforces the ECMAScript maximum array length constraint.
         *
         * @param fullNumberNode The numeric literal node that may be used as an index.
         * @param value          The numeric or bigint value extracted from the literal.
         * @returns True when the node is a valid array index access.
         *
         * @example
         * ```tsx
         * const ignored = isArrayIndex(node, 0);
         * ```
         */
        const isArrayIndex = (fullNumberNode: TSESTree.Node, value: bigint | number) => {
            const {parent} = fullNumberNode;

            return Boolean(
                parent?.type === AST_NODE_TYPES.MemberExpression
                && parent.property === fullNumberNode
                && (Number.isInteger(value) || typeof value === 'bigint')
                && value >= 0
                && value < MAX_ARRAY_LENGTH
            );
        };

        /**
         * Determines whether a numeric literal is declared within a const variable declaration.
         * It walks up the AST from the provided node until it finds a VariableDeclarator, then inspects
         * the corresponding declaration. It only reports true when the declaration exists and is explicitly a
         * const declaration, keeping the rule logic consistent with configuration. This helps the rule skip numbers
         * that are already in const contexts when configured. It returns false when the feature is disabled
         * or no const declaration is found.
         *
         * @param node The AST node to inspect for an enclosing const declaration.
         * @returns True when the node is part of a const variable declarator, otherwise false.
         *
         * @example
         * ```tsx
         * const ignored = isConstValue(node);
         * ```
         */
        const isConstValue = (node: TSESTree.Node | null | undefined) => {
            if (!ignoreConstDeclarations) {
                return false;
            }

            let current: TSESTree.Node | null | undefined = node;

            while (current) {
                if (current.type === AST_NODE_TYPES.VariableDeclarator) {
                    const declaration = current.parent;

                    return Boolean(
                        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                        declaration?.type === AST_NODE_TYPES.VariableDeclaration
                        && declaration.kind === 'const'
                    );
                }

                current = current.parent;
            }

            return false;
        };

        /**
         * Determines whether a numeric literal appears within a call to an ignored function.
         * It inspects identifier and member expression callees to match configured names.
         * It returns false when the parent is not a call expression.
         *
         * @param parent The parent node to examine for a call expression context.
         * @returns True when the call matches a configured ignored function name.
         *
         * @example
         * ```tsx
         * const ignored = shouldIgnoreFunctions(node.parent);
         * ```
         */
        const shouldIgnoreFunctions = (parent: TSESTree.Node | null | undefined) => {
            if (parent?.type !== AST_NODE_TYPES.CallExpression) {
                return false;
            }

            if (ASTUtils.isIdentifier(parent.callee)) {
                return ignoreFunctions.includes(parent.callee.name);
            }

            if (
                parent.callee.type === AST_NODE_TYPES.MemberExpression
                && ASTUtils.isIdentifier(parent.callee.property)
            ) {
                return ignoreFunctions.includes(parent.callee.property.name);
            }

            return false;
        };

        /**
         * Determines whether a numeric literal appears within an array literal when arrays are ignored.
         * It checks the parent node for an array expression and consults the ignoreArrays flag.
         * It returns a boolean that directly informs the rule logic.
         *
         * @param parent The parent node to inspect for an array literal context.
         * @returns True when the parent is an array expression and arrays are configured to be ignored.
         *
         * @example
         * ```tsx
         * const ignored = shouldIgnoreArrays(node.parent);
         * ```
         */
        const shouldIgnoreArrays = (parent: TSESTree.Node | null | undefined) => Boolean(
            parent?.type === AST_NODE_TYPES.ArrayExpression && ignoreArrays
        );

        const listeners: TSESLint.RuleListener = {
            /**
             * Reports numeric literals that are considered magic numbers based on the configured options.
             * It handles negative literals, ignored contexts, and enforces const declarations when enabled.
             *
             * @param node The literal node encountered by the rule listener.
             */
            // eslint-disable-next-line complexity
            Literal(node: TSESTree.Literal) {
                if (!isNumericLiteral(node)) {
                    return;
                }

                const numericValue = node.value;

                if (typeof numericValue !== 'number' && typeof numericValue !== 'bigint') {
                    return;
                }

                let fullNumberNode: TSESTree.Node;
                let parent: TSESTree.Node | null | undefined;
                let value: bigint | number;
                let raw: string | null | undefined;

                // For negative magic numbers: update the value and parent node
                if (node.parent.type === AST_NODE_TYPES.UnaryExpression && node.parent.operator === '-') {
                    fullNumberNode = node.parent;
                    parent = fullNumberNode.parent;
                    value = -numericValue;
                    raw = `-${node.raw}`;
                } else {
                    fullNumberNode = node;
                    parent = node.parent;
                    value = numericValue;
                    raw = node.raw;
                }

                if (
                    isIgnoredValue(value)
                    || (ignoreDefaultValues && isDefaultValue(fullNumberNode))
                    || (ignoreClassFieldInitialValues && isClassFieldInitialValue(fullNumberNode))
                    || isParseIntRadix(fullNumberNode)
                    || isJSXNumber(fullNumberNode)
                    || (ignoreArrayIndexes && isArrayIndex(fullNumberNode, value))
                    || shouldIgnoreFunctions(parent)
                    || shouldIgnoreArrays(parent)
                    || (ignoreConstDeclarations && isConstValue(fullNumberNode))
                ) {
                    return;
                }

                if (parent.type === AST_NODE_TYPES.VariableDeclarator) {
                    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                    if (enforceConst && parent.parent.type === AST_NODE_TYPES.VariableDeclaration) {
                        if (parent.parent.kind !== 'const') {
                            context.report({
                                messageId: 'useConst',
                                node: fullNumberNode
                            });
                        }
                    }
                } else if (
                    !okTypes.includes(parent.type)
                    || (
                        parent.type === AST_NODE_TYPES.AssignmentExpression
                        && parent.left.type === AST_NODE_TYPES.Identifier
                    )
                ) {
                    context.report({
                        data: {raw},
                        messageId: 'noMagic',
                        node: fullNumberNode
                    });
                }
            }
        };

        return listeners;
    }
});