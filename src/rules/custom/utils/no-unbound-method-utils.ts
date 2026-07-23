import {AST_NODE_TYPES} from '@typescript-eslint/utils';
import ts from 'typescript';

import type {TSESTree} from '@typescript-eslint/utils';

export const DEFAULT_DECORATORS = ['autobind'];

/**
 * Normalizes decorator names into a set of clean, consistent identifiers. It trims whitespace,
 * removes empty entries, and strips a leading '@' from each name. It also falls back to the default decorators when
 * no list is provided.
 *
 * @param names The optional list of decorator names to normalize.
 * @returns A set containing the normalized decorator names.
 *
 * @example
 * ```tsx
 * const names = normalizeDecoratorNames([' @autobind ', 'custom']);
 * ```
 */
export const normalizeDecoratorNames = (names?: string[]) => new Set(
    (names ?? DEFAULT_DECORATORS)
        .map(name => name.trim())
        .filter(Boolean)
        .map(name => (name.startsWith('@') ? name.slice(1) : name))
);

/**
 * Extracts the decorator name from a TypeScript decorator node. It supports identifiers, call expressions,
 * and property access expressions. It returns null when no recognizable name can be derived from the decorator syntax.
 *
 * @param decorator The decorator node to inspect for a name.
 * @returns The resolved decorator name or null when it cannot be determined.
 *
 * @example
 * ```tsx
 * const name = getDecoratorName(node.decorators[0]);
 * ```
 */
export const getDecoratorName = (decorator: ts.Decorator): string | null => {
    const {expression} = decorator;

    if (ts.isIdentifier(expression)) {
        return expression.text;
    }

    if (ts.isCallExpression(expression)) {
        const callee = expression.expression;

        if (ts.isIdentifier(callee)) {
            return callee.text;
        }

        if (ts.isPropertyAccessExpression(callee)) {
            return callee.name.text;
        }
    }

    if (ts.isPropertyAccessExpression(expression)) {
        return expression.name.text;
    }

    return null;
};

/**
 * Determines whether a TypeScript method declaration references the `this` keyword in its body.
 * It walks the method body nodes and stops early once a `this` keyword is found. It returns false when the method
 * has no body or when no `this` usage is detected.
 *
 * @param node The method declaration to inspect.
 * @returns True when the method body references `this`, otherwise false.
 *
 * @example
 * ```tsx
 * const usesThis = methodUsesThis(methodNode);
 * ```
 */
export const methodUsesThis = (node: ts.MethodDeclaration): boolean => {
    if (!node.body) {
        return false;
    }

    let found = false;

    /**
     * Visits a TypeScript AST node and checks if it is a `this` keyword. It updates the outer `found` flag when a
     * `this` keyword is discovered so the traversal can short-circuit. It also recurses into child nodes only while
     * no `this` keyword has been found to avoid unnecessary work.
     *
     * @param child The AST node to inspect for a `this` keyword.
     *
     * @example
     * ```tsx
     * node.body && ts.forEachChild(node.body, visit);
     * ```
     */
    const visit = (child: ts.Node) => {
        if (child.kind === ts.SyntaxKind.ThisKeyword) {
            found = true;

            return;
        }

        if (!found) {
            ts.forEachChild(child, visit);
        }
    };

    ts.forEachChild(node.body, visit);

    return found;
};

/**
 * Unwraps nested TypeScript or optional chaining wrapper expressions until a concrete inner expression is reached.
 * It repeatedly peels off chain, non-null, and type assertion nodes while tracking the current expression.
 * It returns the first expression that is not one of the supported wrapper types.
 *
 * @param node The expression node to unwrap.
 * @returns The innermost expression after removing supported wrapper nodes.
 *
 * @example
 * ```tsx
 * const unwrapped = unwrapExpression(node);
 * ```
 */
export const unwrapExpression = (node: TSESTree.Expression): TSESTree.Expression => {
    let current = node;

    while (
        current.type === AST_NODE_TYPES.ChainExpression
        || current.type === AST_NODE_TYPES.TSNonNullExpression
        || current.type === AST_NODE_TYPES.TSAsExpression
        || current.type === AST_NODE_TYPES.TSTypeAssertion
    ) {
        current = current.expression as TSESTree.Expression;
    }

    return current;
};

interface unWrapReturn {
    current: TSESTree.Expression;
    parent: TSESTree.Node | null;
}

/**
 * Unwraps a usage expression by walking up through supported wrapper nodes to find the effective parent. It tracks the
 * current expression as it traverses chain, non-null, and type assertion wrappers. It returns both the unwrapped
 * expression and the first parent that is not a supported wrapper.
 *
 * @param node The expression node to unwrap within its usage context.
 * @returns An object containing the unwrapped current expression and its first non-wrapper parent.
 *
 * @example
 * ```tsx
 * const {current, parent} = unwrapUsage(memberExpression);
 * ```
 */
export const unwrapUsage = (node: TSESTree.Expression): unWrapReturn => {
    let current = node;
    let {parent} = node;

    while (
        parent.type === AST_NODE_TYPES.ChainExpression
        || parent.type === AST_NODE_TYPES.TSNonNullExpression
        || parent.type === AST_NODE_TYPES.TSAsExpression
        || parent.type === AST_NODE_TYPES.TSTypeAssertion
    ) {
        current = parent as TSESTree.Expression;
        parent = parent.parent;
    }

    return {
        current,
        parent
    };
};

/**
 * Determines whether a member expression is used as a `this`-binding call on `bind`, `call`, or `apply`.
 * It checks the parent nodes to ensure the expression is part of a call expression and that the callee is the
 * binding method. It then verifies the first argument resolves to a `this` expression after unwrapping any
 * supported wrapper nodes.
 *
 * @param node The member expression to inspect for a `this` bind/call/apply usage.
 * @returns True when the member expression is a `bind`, `call`, or `apply` invocation whose first argument is `this`.
 *
 * @example
 * ```tsx
 * const isBind = isThisBindCall(memberExpression);
 * ```
 */
export const isThisBindCall = (node: TSESTree.MemberExpression): boolean => {
    const {parent} = node;

    if (parent.type !== AST_NODE_TYPES.MemberExpression) {
        return false;
    }

    const name = parent.property.type === AST_NODE_TYPES.Identifier ? parent.property.name : null;

    if (!name || !['bind', 'call', 'apply'].includes(name)) {
        return false;
    }

    const grandParent = parent.parent;

    if (grandParent.type !== AST_NODE_TYPES.CallExpression) {
        return false;
    }

    if (grandParent.callee !== parent) {
        return false;
    }

    if (grandParent.arguments.length === 0) {
        return false;
    }

    const firstArg = unwrapExpression(grandParent.arguments[0] as TSESTree.Expression);

    return firstArg.type === AST_NODE_TYPES.ThisExpression;
};

/**
 * Determines whether a member expression is used as a callback value in common usage contexts. It walks up through
 * wrapper nodes to find the effective parent and then checks a variety of parent node types to decide if the
 * expression is passed, assigned, or returned as a callback. It returns false when the expression is not used in a
 * supported callback position.
 *
 * @param node The member expression to inspect for callback usage contexts.
 * @returns True when the expression appears in a callback position, otherwise false.
 *
 * @example
 * ```tsx
 * const isCallback = isCallbackUsage(memberExpression);
 * ```
 */
export const isCallbackUsage = (node: TSESTree.MemberExpression): boolean => {
    const {current, parent} = unwrapUsage(node);

    if (!parent) {
        return false;
    }

    if (parent.type === AST_NODE_TYPES.CallExpression || parent.type === AST_NODE_TYPES.NewExpression) {
        return parent.arguments.includes(current);
    }

    if (
        parent.type === AST_NODE_TYPES.JSXExpressionContainer
        && parent.parent.type === AST_NODE_TYPES.JSXAttribute
    ) {
        return true;
    }

    if (parent.type === AST_NODE_TYPES.VariableDeclarator) {
        return parent.init === current;
    }

    if (parent.type === AST_NODE_TYPES.AssignmentExpression) {
        return parent.right === current;
    }

    if (parent.type === AST_NODE_TYPES.Property) {
        return parent.value === current;
    }

    if (parent.type === AST_NODE_TYPES.ArrayExpression) {
        return parent.elements.includes(current);
    }

    if (parent.type === AST_NODE_TYPES.ReturnStatement) {
        return parent.argument === current;
    }

    return false;
};