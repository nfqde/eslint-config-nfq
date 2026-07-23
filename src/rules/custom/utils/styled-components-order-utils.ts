import {ASTUtils} from '@typescript-eslint/utils';

import type {TSESTree} from '@typescript-eslint/utils';

/**
 * Unwraps nested TypeScript expression wrappers until the underlying expression is reached.
 * It repeatedly removes chain, type assertion, and non-null wrapper nodes so downstream logic can analyze the actual
 * target. This helps ensure consistent behavior when expressions are wrapped by optional chaining or type-related syntax.
 *
 * @param expression The expression to unwrap.
 * @returns The innermost unwrapped expression.
 *
 * @example
 * ```tsx
 * const base = unwrapExpression(someExpression);
 * ```
 */
export const unwrapExpression = (expression: TSESTree.Expression): TSESTree.Expression => {
    let current = expression;

    while (
        current.type === 'ChainExpression'
        || current.type === 'TSAsExpression'
        || current.type === 'TSNonNullExpression'
    ) {
        current = current.expression;
    }

    return current;
};

/**
 * Determines whether an expression ultimately resolves to the styled base identifier.
 * It walks through member access and call expressions to reach the root value. This allows the rule logic to
 * treat chained or called styled usages as coming from the same base.
 *
 * @param expression The expression to inspect.
 * @returns True when the expression resolves to the styled base.
 *
 * @example
 * ```tsx
 * const isBase = isStyledBase(styled.div);
 * ```
 */
export const isStyledBase = (expression: TSESTree.Expression): boolean => {
    const node = unwrapExpression(expression);

    if (ASTUtils.isIdentifier(node)) {
        return node.name === 'styled';
    }

    if (node.type === 'MemberExpression') {
        return isStyledBase(node.object);
    }

    if (node.type === 'CallExpression') {
        return isStyledBase(node.callee);
    }

    return false;
};

/**
 * Collects identifier dependencies used inside a template literal. It unwraps each expression
 * to its base and keeps only identifiers for easier analysis. This provides both the name and the
 * identifier node for each dependency.
 *
 * @param template The template literal to analyze.
 * @returns A list of dependency names with their identifier nodes.
 *
 * @example
 * ```tsx
 * const deps = getDependencyNames(templateLiteral);
 * ```
 */
export const getDependencyNames = (
    template: TSESTree.TemplateLiteral
): {name: string; node: TSESTree.Identifier}[] => (
    template.expressions
        .map(expression => unwrapExpression(expression))
        .filter(ASTUtils.isIdentifier)
        .map(identifier => ({
            name: identifier.name,
            node: identifier
        }))
);

/**
 * Extracts component identifier dependencies from a styled tag expression. It walks call
 * expressions in the tag chain and collects identifier arguments that represent base
 * components. This captures dependencies like `styled(TableCell)` that are not inside
 * the template literal.
 *
 * @param tag The tag expression from a TaggedTemplateExpression.
 * @returns A list of dependency names with their identifier nodes.
 *
 * @example
 * ```tsx
 * const deps = getTagDependencies(node.init.tag);
 * ```
 */
export const getTagDependencies = (
    tag: TSESTree.Expression
): {name: string; node: TSESTree.Identifier}[] => {
    const deps: {name: string; node: TSESTree.Identifier}[] = [];
    let current: TSESTree.Expression = unwrapExpression(tag);

    while (current.type === 'MemberExpression') {
        current = unwrapExpression(current.object);
    }

    while (current.type === 'CallExpression') {
        for (const arg of current.arguments) {
            if (arg.type !== 'SpreadElement') {
                const unwrapped = unwrapExpression(arg);

                if (ASTUtils.isIdentifier(unwrapped)) {
                    deps.push({name: unwrapped.name, node: unwrapped});
                }
            }
        }

        current = unwrapExpression(current.callee);

        if (current.type === 'MemberExpression') {
            current = unwrapExpression(current.object);
        }
    }

    return deps;
};

/**
 * Returns a type statement node when the given node represents a type declaration. It supports direct type
 * declarations and named export declarations that contain them. This helps callers normalize type statement
 * handling in a consistent way.
 *
 * @param node The node to inspect.
 * @returns The type statement node when found, otherwise null.
 *
 * @example
 * ```tsx
 * const typeNode = unwrapTypeStatement(node);
 * ```
 */
export const unwrapTypeStatement = (node: TSESTree.Node): TSESTree.Node | null => {
    if (node.type === 'TSInterfaceDeclaration' || node.type === 'TSTypeAliasDeclaration') {
        return node;
    }

    if (node.type === 'ExportNamedDeclaration' && node.declaration) {
        const {declaration} = node;

        if (declaration.type === 'TSInterfaceDeclaration' || declaration.type === 'TSTypeAliasDeclaration') {
            return node;
        }
    }

    return null;
};

/**
 * Sorts a list of items using a provided comparison function. It delegates to the native sort algorithm to
 * produce the ordering. This utility keeps comparison logic centralized while returning the sorted array.
 *
 * @param items   The items to sort.
 * @param compare The comparison function used for sorting.
 * @returns The sorted items array.
 *
 * @example
 * ```tsx
 * const sorted = compareBy(items, (a, b) => a.value - b.value);
 * ```
 */
export const compareBy = <T,>(items: T[], compare: (left: T, right: T) => number) => (
    items.sort(compare)
);