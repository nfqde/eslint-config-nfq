import {ASTUtils} from '@typescript-eslint/utils';

import {unwrapExpression} from './expression-utils';

import type {TSESTree} from '@typescript-eslint/utils';

/**
 * Determines whether the provided node represents the `Cypress.Commands` member expression.
 * This function inspects the node shape and validates the object and property identifiers.
 * It returns a boolean result suitable for guard conditions in rule logic.
 *
 * @param node The AST node to inspect for a Cypress.Commands member expression.
 * @returns True when the node matches `Cypress.Commands`, otherwise false.
 *
 * @remarks
 * This helper assumes the node has already been parsed by the TypeScript ESLint parser.
 *
 * @example
 * ```tsx
 * const isCommands = isCypressCommandsObject(node);
 * ```
 */
export const isCypressCommandsObject = (node: TSESTree.Node): boolean => (
    node.type === 'MemberExpression'
    && ASTUtils.isIdentifier(node.object)
    && node.object.name === 'Cypress'
    && ASTUtils.isIdentifier(node.property)
    && node.property.name === 'Commands'
);

/**
 * Checks whether a node represents a registration call for the `getCy` command.
 * The function validates call expression structure, target object, and method name.
 * It returns a boolean that signals if the call is an add or overwrite for `getCy`.
 *
 * @param node The AST node to inspect for a Cypress.Commands registration call.
 * @returns True when the call registers `getCy`, otherwise false.
 *
 * @remarks
 * This utility expects the first argument to be a literal command name.
 *
 * @example
 * ```tsx
 * const isRegistration = isGetCyRegistration(node);
 * ```
 */
export const isGetCyRegistration = (node: TSESTree.Node): boolean => {
    if (node.type !== 'CallExpression') {
        return false;
    }

    if (node.arguments.length === 0) {
        return false;
    }

    const callee = unwrapExpression(node.callee);

    if (callee.type !== 'MemberExpression' || !ASTUtils.isIdentifier(callee.property)) {
        return false;
    }

    if (!isCypressCommandsObject(callee.object)) {
        return false;
    }

    const methodName = callee.property.name;

    if (methodName !== 'add' && methodName !== 'overwrite') {
        return false;
    }

    const nameArg = node.arguments[0];

    return nameArg.type === 'Literal' && nameArg.value === 'getCy';
};

/**
 * Determines whether the provided call expression represents a `cy.get` invocation.
 * The logic unwraps the callee to inspect the member expression shape and confirm the object identifier.
 * It returns a boolean that can be used as a guard for command-specific rules.
 *
 * @param node The call expression node to evaluate.
 * @returns True when the node is a `cy.get` call, otherwise false.
 *
 * @remarks
 * This helper assumes the call expression has already been parsed and type-checked by the parser.
 *
 * @example
 * ```tsx
 * const isGet = isCyGetCall(node);
 * ```
 */
export const isCyGetCall = (node: TSESTree.CallExpression): boolean => {
    const callee = unwrapExpression(node.callee);

    if (callee.type !== 'MemberExpression') {
        return false;
    }

    const object = unwrapExpression(callee.object);

    return ASTUtils.isIdentifier(object)
        && object.name === 'cy'
        && ASTUtils.isIdentifier(callee.property)
        && callee.property.name === 'get';
};

/**
 * Determines whether the provided call expression uses an alias string as its first argument.
 * The function checks for at least one argument and verifies it is a string literal starting with `@`.
 * It returns a boolean that indicates whether the call is an alias lookup.
 *
 * @param node The call expression node to inspect.
 * @returns True when the first argument is an alias string, otherwise false.
 *
 * @remarks
 * This utility only inspects the first argument and ignores additional arguments.
 *
 * @example
 * ```tsx
 * const isAlias = isAliasGetCall(node);
 * ```
 */
export const isAliasGetCall = (node: TSESTree.CallExpression): boolean => {
    if (node.arguments.length === 0) {
        return false;
    }

    const [arg] = node.arguments;

    return arg.type === 'Literal'
        && typeof arg.value === 'string'
        && arg.value.startsWith('@');
};