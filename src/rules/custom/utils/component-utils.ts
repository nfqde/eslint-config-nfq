import {unwrapExpression} from './expression-utils';

import type {TSESTree} from '@typescript-eslint/utils';

/**
 * Checks whether a provided name starts with an uppercase letter. It is used to detect component-like identifiers by
 * convention. The function returns a boolean that reflects the naming rule.
 *
 * @param name The identifier name to validate.
 * @returns True when the name begins with an uppercase character.
 *
 * @example
 * ```tsx
 * const ok = isUppercaseName('Header');
 * ```
 */
export const isUppercaseName = (name: string) => (/^[A-Z]/u).test(name);

const COMPONENT_WRAPPERS = new Set(['observer', 'memo', 'forwardRef']);

const isComponentWrapperCall = (expression: TSESTree.Expression): boolean => {
    const callee = unwrapExpression(expression);

    if (callee.type === 'Identifier') {
        return COMPONENT_WRAPPERS.has(callee.name);
    }

    if (
        callee.type === 'MemberExpression'
        && callee.object.type === 'Identifier'
        && callee.object.name === 'React'
        && callee.property.type === 'Identifier'
    ) {
        return COMPONENT_WRAPPERS.has(callee.property.name);
    }

    return false;
};

/**
 * Extracts a function expression from a provided expression node by unwrapping common wrappers and scanning call
 * arguments. It supports arrow functions and traditional function expressions, including those nested inside call
 * expressions. It returns the first matching function expression found or null when none is present.
 *
 * @param expression The expression node that may contain a function expression.
 * @returns The discovered function expression or null when none is found.
 *
 * @remarks
 * This helper is used to locate inline component factories in initializer expressions.
 *
 * @example
 * ```tsx
 * const fn = getFunctionFromExpression(factory(() => null));
 * ```
 */
export const getFunctionFromExpression = (
    expression: TSESTree.Expression
): TSESTree.ArrowFunctionExpression | TSESTree.FunctionExpression | null => {
    const node = unwrapExpression(expression);

    if (node.type === 'ArrowFunctionExpression' || node.type === 'FunctionExpression') {
        return node;
    }

    if (node.type === 'CallExpression') {
        if (!isComponentWrapperCall(node.callee)) {
            return null;
        }

        for (const argument of node.arguments) {
            if (argument.type === 'CallExpression') {
                const nested = getFunctionFromExpression(argument);

                if (nested) {
                    return nested;
                }
            }

            if (argument.type === 'ArrowFunctionExpression' || argument.type === 'FunctionExpression') {
                return argument;
            }
        }
    }

    return null;
};