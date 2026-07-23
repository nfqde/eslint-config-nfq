import type {TSESTree} from '@typescript-eslint/utils';

/**
 * Unwraps nested wrapper expressions to reach the underlying expression node. It handles common TypeScript and
 * chain wrappers that can obscure the real expression. The function returns the first non-wrapper expression encountered.
 *
 * @param expression The expression that may be wrapped by TypeScript or chain nodes.
 * @returns The unwrapped expression node.
 *
 * @example
 * ```tsx
 * const base = unwrapExpression(expr);
 * ```
 */
export const unwrapExpression = (expression: TSESTree.Expression): TSESTree.Expression => {
    let current = expression;

    while (
        current.type === 'ChainExpression'
        || current.type === 'TSAsExpression'
        || current.type === 'TSNonNullExpression'
        || current.type === 'TSInstantiationExpression'
    ) {
        current = current.expression as TSESTree.Expression;
    }

    return current;
};