import {ASTUtils} from '@typescript-eslint/utils';

import {unwrapExpression} from './expression-utils';
import {isHookCallee} from './hook-utils';

import type {TSESTree} from '@typescript-eslint/utils';

export type HookArgCheck<MessageId extends string> = {
    allowedHookCalls: Set<TSESTree.CallExpression>;
    errors: {messageId: MessageId; node: TSESTree.Node}[];
};

/**
 * Determines whether a call expression represents a hook call by inspecting its callee.
 * It unwraps the callee expression before checking to ensure nested expressions are handled.
 * This is used to simplify hook detection logic throughout the rule utilities.
 *
 * @param node The call expression to evaluate.
 * @returns Whether the call expression resolves to a hook callee.
 *
 * @example
 * ```tsx
 * const isHook = isHookCall(callExpression);
 * ```
 */
export const isHookCall = (node: TSESTree.CallExpression): boolean => isHookCallee(unwrapExpression(node.callee));

/**
 * Checks whether a call expression matches a Cypress command on the `cy` object.
 * It unwraps the callee to handle nested expressions and verifies both the object and property names.
 * This helps enforce command-specific validations in the rule set.
 *
 * @param node    The call expression to inspect.
 * @param command The Cypress command name to match.
 * @returns Whether the call expression is a `cy.<command>` call.
 *
 * @example
 * ```tsx
 * const isMount = isCyCommandCall(callExpression, 'mount');
 * ```
 */
export const isCyCommandCall = (node: TSESTree.CallExpression, command: string): boolean => {
    const callee = unwrapExpression(node.callee);

    if (callee.type !== 'MemberExpression') {
        return false;
    }

    const object = unwrapExpression(callee.object);

    return ASTUtils.isIdentifier(object)
        && object.name === 'cy'
        && ASTUtils.isIdentifier(callee.property)
        && callee.property.name === command;
};

/**
 * Determines whether a call expression represents a Cypress mount hook invocation.
 * It checks both the singular and plural command names to cover supported API variants.
 * This helper centralizes the logic so other utilities can rely on a consistent predicate.
 *
 * @param node The call expression to inspect.
 * @returns Whether the call expression is a mount hook command call.
 *
 * @example
 * ```tsx
 * const isMountHook = isMountHookCall(callExpression);
 * ```
 */
export const isMountHookCall = (node: TSESTree.CallExpression): boolean => (
    isCyCommandCall(node, 'mountHook') || isCyCommandCall(node, 'mountHooks')
);

/**
 * Verifies that a call expression represents a `then` chain call on a specific target expression.
 * It unwraps the callee to correctly handle nested or parenthesized expressions.
 * This ensures the comparison against the target is precise and consistent.
 *
 * @param node   The call expression to inspect.
 * @param target The target expression that must be the member object.
 * @returns Whether the call expression is a `then` call on the target.
 *
 * @example
 * ```tsx
 * const isThen = isThenCall(callExpression, mountCall);
 * ```
 */
export const isThenCall = (node: TSESTree.CallExpression, target: TSESTree.Expression): boolean => {
    const callee = unwrapExpression(node.callee);

    return callee.type === 'MemberExpression'
        && callee.object === target
        && ASTUtils.isIdentifier(callee.property)
        && callee.property.name === 'then';
};

/**
 * Collects the chained `then` call expressions that follow a Cypress mount call.
 * It walks upward through the parent member expressions to find `then` calls and records each call in order.
 * This helper stops as soon as the chain no longer matches the expected `then` pattern to ensure the result is precise.
 *
 * @param mountCall The initial mount call expression to inspect for chained `then` calls.
 * @returns An array of `then` call expressions chained from the provided mount call.
 *
 * @example
 * ```tsx
 * const thens = getThenChain(mountCall);
 * ```
 */
export const getThenChain = (mountCall: TSESTree.CallExpression): TSESTree.CallExpression[] => {
    const thens: TSESTree.CallExpression[] = [];
    let current: TSESTree.CallExpression | null = mountCall;

    while (current.parent.type === 'MemberExpression') {
        const member: TSESTree.MemberExpressionComputedName | TSESTree.MemberExpressionNonComputedName = current.parent;
        const {parent}: TSESTree.Node = member;

        if (parent.type !== 'CallExpression') {
            break;
        }

        if (isThenCall(parent, current)) {
            thens.push(parent);
            current = parent;
            continue;
        }

        break;
    }

    return thens;
};

/**
 * Extracts a hook call expression from an arrow function body when possible.
 * It supports concise bodies and single return statements within block bodies.
 * This helper ensures only valid hook calls are returned while everything else resolves to null.
 *
 * @param node The arrow function expression to inspect.
 * @returns The hook call expression when found, otherwise null.
 *
 * @remarks
 * This utility only accepts arrow functions and enforces a narrow shape for safe extraction.
 *
 * @example
 * ```tsx
 * const hookCall = getHookCallFromArrow(arrowFunction);
 * ```
 */
export const getHookCallFromArrow = (node: TSESTree.ArrowFunctionExpression) => {
    if (node.expression && node.body.type === 'CallExpression') {
        return isHookCall(node.body) ? node.body : null;
    }

    if (node.body.type !== 'BlockStatement') {
        return null;
    }

    if (node.body.body.length !== 1) {
        return null;
    }

    const [statement] = node.body.body;

    if (statement.type !== 'ReturnStatement' || !statement.argument) {
        return null;
    }

    return statement.argument.type === 'CallExpression' && isHookCall(statement.argument)
        ? statement.argument
        : null;
};

/**
 * Validates Cypress mount hook arguments and reports any rule violations that are detected.
 * It inspects the call signature to ensure the correct argument count and acceptable argument shapes.
 * It also collects valid hook call expressions so downstream checks can reuse the results safely.
 *
 * @param node                           The call expression whose arguments are validated for mount hook usage.
 * @param messageIds                     The message identifiers used for reporting invalid or missing arguments.
 * @param messageIds.invalidHookArgument The message ID for reporting invalid hook arguments.
 * @param messageIds.missingHooksArgs    The message ID for reporting missing arguments when using the plural mount hooks command.
 * @returns The collected allowed hook calls along with any validation errors.
 *
 * @example
 * ```tsx
 * const result = checkHookArguments(callExpression, {
 *   invalidHookArgument: 'invalidHookArgument',
 *   missingHooksArgs: 'missingHooksArgs'
 * });
 * ```
 */
export const checkHookArguments = <MessageId extends string>(
    node: TSESTree.CallExpression,
    messageIds: {invalidHookArgument: MessageId; missingHooksArgs: MessageId}
): HookArgCheck<MessageId> => {
    const allowedHookCalls = new Set<TSESTree.CallExpression>();
    const errors: {messageId: MessageId; node: TSESTree.Node}[] = [];
    const isHooks = isCyCommandCall(node, 'mountHooks');

    // eslint-disable-next-line @nfq/no-magic-numbers
    if (isHooks && node.arguments.length < 2) {
        errors.push({
            messageId: messageIds.missingHooksArgs,
            node
        });
    }

    if (!isHooks && node.arguments.length !== 1) {
        errors.push({
            messageId: messageIds.invalidHookArgument,
            node
        });

        return {
            allowedHookCalls,
            errors
        };
    }

    for (const arg of node.arguments) {
        if (arg.type === 'SpreadElement') {
            errors.push({
                messageId: messageIds.invalidHookArgument,
                node: arg
            });
            continue;
        }

        if (arg.type === 'Identifier') {
            if (!arg.name.startsWith('use')) {
                errors.push({
                    messageId: messageIds.invalidHookArgument,
                    node: arg
                });
            }

            continue;
        }

        if (arg.type === 'ArrowFunctionExpression') {
            const hookCall = getHookCallFromArrow(arg);

            if (hookCall) {
                allowedHookCalls.add(hookCall);
                continue;
            }
        }

        errors.push({
            messageId: messageIds.invalidHookArgument,
            node: arg
        });
    }

    return {
        allowedHookCalls,
        errors
    };
};

/**
 * Determines whether a node represents a Cypress `cy.wrap(values).as('values')` call pattern.
 * It inspects the call expression structure and validates the chained member access and arguments.
 * This helper keeps the rule logic consistent by providing a single predicate for the expected wrap-and-alias sequence.
 *
 * @param node The AST node to inspect for a wrap values call pattern.
 * @returns True when the node matches the expected `cy.wrap(values).as('values')` call chain.
 *
 * @example
 * ```tsx
 * if (hasWrapValues(callExpression)) {
 *   // handle wrap values call
 * }
 * ```
 */
export const hasWrapValues = (node: TSESTree.Node): boolean => {
    if (node.type !== 'CallExpression') {
        return false;
    }

    const callee = unwrapExpression(node.callee);

    if (callee.type !== 'MemberExpression') {
        return false;
    }

    if (!ASTUtils.isIdentifier(callee.property) || callee.property.name !== 'as') {
        return false;
    }

    if (node.arguments.length !== 1) {
        return false;
    }

    const arg = node.arguments[0];

    if (arg.type !== 'Literal' || arg.value !== 'values') {
        return false;
    }

    if (callee.object.type !== 'CallExpression') {
        return false;
    }

    const wrapCall = callee.object;

    return isCyCommandCall(wrapCall, 'wrap')
        && wrapCall.arguments.length === 1
        && wrapCall.arguments[0].type === 'Identifier'
        && wrapCall.arguments[0].name === 'values';
};

/**
 * Determines whether a given AST node contains a JSX element named `MockComponent`.
 * It inspects JSX elements and fragments recursively to locate the target component in nested structures.
 * It returns a boolean so callers can quickly decide if a mount or render includes the mock component.
 *
 * @param node The AST node to inspect for the `MockComponent` JSX element.
 * @returns True when a `MockComponent` JSX element is found, otherwise false.
 *
 * @remarks
 * This utility only traverses JSXElement and JSXFragment nodes and ignores other node types.
 *
 * @example
 * ```tsx
 * const hasMock = containsMockComponent(jsxNode);
 * ```
 */
export const containsMockComponent = (node: TSESTree.Node | null | undefined): boolean => {
    if (!node) {
        return false;
    }

    if (node.type === 'JSXElement') {
        const {name} = node.openingElement;

        if (name.type === 'JSXIdentifier' && name.name === 'MockComponent') {
            return true;
        }

        return node.children.some(child => containsMockComponent(child as TSESTree.Node));
    }

    if (node.type === 'JSXFragment') {
        return node.children.some(child => containsMockComponent(child as TSESTree.Node));
    }

    return false;
};

/**
 * Determines whether a call expression represents a Cypress `cy.mount` call that includes a mock component.
 * It validates that the node is a call expression and that the call targets the `mount` command on `cy`.
 * It then inspects the first argument to confirm the presence of a `MockComponent` JSX element.
 *
 * @param node The AST node to inspect for a mount call containing a mock component.
 * @returns True when the node is a `cy.mount` call with a mock component argument; otherwise false.
 *
 * @example
 * ```tsx
 * const hasMockMount = hasMountWithMock(callExpression);
 * ```
 */
export const hasMountWithMock = (node: TSESTree.Node): boolean => {
    if (node.type !== 'CallExpression') {
        return false;
    }

    if (!isCyCommandCall(node, 'mount')) {
        return false;
    }

    if (node.arguments.length === 0) {
        return false;
    }

    return containsMockComponent(node.arguments[0] as TSESTree.Node);
};

/**
 * Determines whether the provided AST node represents an assertion-style call.
 * It checks for direct `expect(...)` calls as well as chained calls that use `assert` or `should` identifiers.
 * This helper centralizes assertion detection so other utilities can rely on a consistent predicate.
 *
 * @param node The AST node to inspect for an assertion call signature.
 * @returns True when the node matches known assertion call shapes; otherwise false.
 *
 * @remarks
 * This function only inspects call expressions and their immediate callee shapes.
 *
 * @example
 * ```tsx
 * if (hasAssertionCall(node)) {
 *   // handle assertion
 * }
 * ```
 */
export const hasAssertionCall = (node: TSESTree.Node): boolean => {
    if (node.type !== 'CallExpression') {
        return false;
    }

    const callee = unwrapExpression(node.callee);

    if (ASTUtils.isIdentifier(callee) && callee.name === 'expect') {
        return true;
    }

    if (callee.type === 'MemberExpression') {
        if (ASTUtils.isIdentifier(callee.object) && callee.object.name === 'assert') {
            return true;
        }

        if (ASTUtils.isIdentifier(callee.property) && callee.property.name === 'should') {
            return true;
        }
    }

    return false;
};

/**
 * Determines whether a statement is a valid first `then` chain entry for mount-related checks.
 * It only allows expression statements that call either the wrap-values helper or the mount-with-mock helper.
 * This keeps downstream validation focused on the allowed call patterns and avoids unrelated statements.
 *
 * @param statement The statement node to validate against the allowed `then`-body patterns.
 * @returns True when the statement is a call expression to `hasWrapValues` or `hasMountWithMock`.
 *
 * @remarks
 * This helper enforces a strict shape so the rule can reason about the order of mount and wrap calls.
 *
 * @example
 * ```tsx
 * if (isAllowedFirstThenStatement(statement)) {
 *   // process allowed statement
 * }
 * ```
 */
export const isAllowedFirstThenStatement = (statement: TSESTree.Statement): boolean => {
    if (statement.type !== 'ExpressionStatement') {
        return false;
    }

    const {expression} = statement;

    if (expression.type !== 'CallExpression') {
        return false;
    }

    return hasWrapValues(expression) || hasMountWithMock(expression);
};

/**
 * Performs a depth-first traversal of an AST node and all of its descendants.
 * The traversal is iterative and uses a stack to avoid recursion limits while still visiting every reachable child
 * node. The visitor callback is invoked for each node encountered, and the traversal skips parent references to prevent
 * cycles.
 *
 * @param node    The root AST node to start walking from.
 * @param visitor The callback invoked for each visited AST node.
 *
 * @remarks
 * This helper treats any object with a `type` property as a node and walks arrays of nodes as well.
 * It intentionally skips the `parent` property to avoid infinite loops. The traversal order is depth-first but
 * not guaranteed to be stable for sibling ordering.
 *
 * @example
 * ```tsx
 * walk(rootNode, child => {
 *   if (child.type === 'CallExpression') {
 *     // handle call expressions
 *   }
 * });
 * ```
 */
export const walk = (node: TSESTree.Node, visitor: (child: TSESTree.Node) => void) => {
    const stack: TSESTree.Node[] = [node];

    while (stack.length) {
        const current = stack.pop()!;

        visitor(current);

        for (const key of Object.keys(current) as (keyof TSESTree.Node)[]) {
            if (key === 'parent') {
                continue;
            }

            const value = current[key];

            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if (!value || typeof value !== 'object') {
                continue;
            }

            if (Array.isArray(value)) {
                for (const item of value) {
                    if (item && typeof item === 'object' && 'type' in item) {
                        stack.push(item as TSESTree.Node);
                    }
                }
            } else if ('type' in value) {
                stack.push(value as unknown as TSESTree.Node);
            }
        }
    }
};

/**
 * Determines whether a call expression represents a test `it` invocation. This includes direct `it(...)` calls as
 * well as `it.only(...)` and `it.skip(...)` variants. It unwraps the callee to handle nested expressions and returns
 * a boolean predicate for downstream rule logic.
 *
 * @param node The call expression to inspect.
 * @returns True when the call expression targets `it`, `it.only`, or `it.skip`; otherwise false.
 *
 * @remarks
 * This helper only inspects the immediate callee shape and does not validate arguments.
 *
 * @example
 * ```tsx
 * const isTestCall = isItCall(callExpression);
 * ```
 */
export const isItCall = (node: TSESTree.CallExpression): boolean => {
    const callee = unwrapExpression(node.callee);

    if (ASTUtils.isIdentifier(callee)) {
        return callee.name === 'it';
    }

    if (callee.type !== 'MemberExpression' || !ASTUtils.isIdentifier(callee.object)) {
        return false;
    }

    return callee.object.name === 'it'
        && ASTUtils.isIdentifier(callee.property)
        && (callee.property.name === 'only' || callee.property.name === 'skip');
};

/**
 * Determines whether a callback node matches the expected `then` signature for mount hook utilities. It validates that
 * the node is a function expression with an object pattern parameter and that it exposes both `MockComponent` and
 * `values` bindings. It returns the original callback node when the signature is valid, otherwise it returns null.
 *
 * @param callback The AST node to validate as a `then` callback.
 * @returns The callback node when valid; otherwise null.
 *
 * @example
 * ```tsx
 * const validCallback = isThenCallbackValid(node);
 * ```
 */
// eslint-disable-next-line promise/prefer-await-to-callbacks
export const isThenCallbackValid = (callback: TSESTree.Node | null | undefined) => {
    if (!callback) {
        return null;
    }

    if (callback.type !== 'ArrowFunctionExpression' && callback.type !== 'FunctionExpression') {
        return null;
    }

    const param = callback.params[0];

    if (param.type !== 'ObjectPattern') {
        return null;
    }

    const names = new Set(param.properties
        .filter(property => property.type === 'Property' && property.key.type === 'Identifier')
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        .map(property => (property as any).key.name as string));

    if (!names.has('MockComponent') || !names.has('values')) {
        return null;
    }

    return callback;
};

/**
 * Determines whether a call expression represents a Cypress `cy.get('@values')` call.
 * It unwraps the callee and validates that it is a member expression targeting the `get` property.
 * It also verifies that the call is made on `cy` and that the first argument is the literal `@values`.
 *
 * @param node The call expression to inspect for the `cy.get('@values')` pattern.
 * @returns True when the call expression matches the expected `cy.get('@values')` signature; otherwise false.
 *
 * @remarks
 * This helper only checks the first argument and does not validate additional arguments.
 *
 * @example
 * ```tsx
 * const isValuesGet = isValuesGetCall(callExpression);
 * ```
 */
const isValuesGetCall = (node: TSESTree.CallExpression): boolean => {
    const callee = unwrapExpression(node.callee);

    if (callee.type !== 'MemberExpression') {
        return false;
    }

    if (!ASTUtils.isIdentifier(callee.property) || callee.property.name !== 'get') {
        return false;
    }

    const object = unwrapExpression(callee.object);

    if (!ASTUtils.isIdentifier(object) || object.name !== 'cy') {
        return false;
    }

    const arg = node.arguments[0];

    return Boolean(arg.type === 'Literal' && arg.value === '@values');
};

/**
 * Determines whether a call expression represents a chained `cy.get('@values').its(...)` call. It unwraps the callee
 * and validates that the property is `its` before walking back through the call chain. It recurses through nested `its`
 * calls so chained access is handled consistently.
 *
 * @param node The call expression to inspect for a `values` `its` call chain.
 * @returns True when the call expression is an `its` call chained from a `cy.get('@values')` or another valid `its` call.
 *
 * @remarks
 * This helper only accepts call expressions and only evaluates member expression callees.
 *
 * @example
 * ```tsx
 * const isValuesIts = isValuesItsCall(callExpression);
 * ```
 */
const isValuesItsCall = (node: TSESTree.CallExpression): boolean => {
    const callee = unwrapExpression(node.callee);

    if (callee.type !== 'MemberExpression') {
        return false;
    }

    if (!ASTUtils.isIdentifier(callee.property) || callee.property.name !== 'its') {
        return false;
    }

    const object = unwrapExpression(callee.object);

    if (object.type !== 'CallExpression') {
        return false;
    }

    return isValuesGetCall(object) || isValuesItsCall(object);
};

/**
 * Determines whether a call expression chain includes an `its('current')` access tied to values retrieval. It walks
 * through member expression calls recursively to verify that `its('current')` appears on a valid `cy.get('@values')`
 * or chained `its` call. It returns false when the call shape does not match the expected Cypress chain pattern.
 *
 * @param node The call expression to inspect for a values current access chain.
 * @returns True when the chain contains `its('current')` from a valid values get or its call; otherwise false.
 *
 * @remarks
 * This helper only accepts call expressions and only evaluates member expression callees.
 *
 * @example
 * ```tsx
 * const hasCurrent = hasValuesCurrentInChain(callExpression);
 * ```
 */
const hasValuesCurrentInChain = (node: TSESTree.CallExpression): boolean => {
    const callee = unwrapExpression(node.callee);

    if (callee.type !== 'MemberExpression') {
        return false;
    }

    if (!ASTUtils.isIdentifier(callee.property) || callee.property.name !== 'its') {
        return false;
    }

    const arg = node.arguments[0];
    const isCurrent = Boolean(arg.type === 'Literal' && arg.value === 'current');
    const object = unwrapExpression(callee.object);

    if (object.type !== 'CallExpression') {
        return false;
    }

    if (isCurrent && (isValuesGetCall(object) || isValuesItsCall(object))) {
        return true;
    }

    return hasValuesCurrentInChain(object);
};

/**
 * Determines whether a call expression represents a Cypress `invoke` call chained from a values
 * `its('current')` lookup. It unwraps the callee and validates that the property name is `invoke` before checking the
 * call chain. It returns a boolean so callers can quickly detect the expected Cypress pattern without additional traversal.
 *
 * @param node The call expression to inspect for a values `invoke` chain.
 * @returns True when the call expression is an `invoke` call chained from a valid values current access; otherwise false.
 *
 * @remarks
 * This helper only inspects member expression callees and relies on `hasValuesCurrentInChain` for recursive chain validation.
 *
 * @example
 * ```tsx
 * const isInvoke = isValuesInvokeCall(callExpression);
 * ```
 */
export const isValuesInvokeCall = (node: TSESTree.CallExpression): boolean => {
    const callee = unwrapExpression(node.callee);

    if (callee.type !== 'MemberExpression') {
        return false;
    }

    if (!ASTUtils.isIdentifier(callee.property) || callee.property.name !== 'invoke') {
        return false;
    }

    const object = unwrapExpression(callee.object);

    return Boolean(object.type === 'CallExpression' && hasValuesCurrentInChain(object));
};

/**
 * Determines whether a callback body contains a values `invoke` call in its AST subtree. It walks the block statement
 * iteratively to avoid callback-based traversal while still visiting every descendant node. It returns true as soon as
 * a matching `cy.get('@values').its('current').invoke(...)` chain is detected.
 *
 * @param callback The function expression to inspect for a values invoke call chain.
 * @returns True when a values invoke call is found in the callback body; otherwise false.
 *
 * @example
 * ```tsx
 * const hasInvoke = hasValuesInvokeInCallback(callbackNode);
 * ```
 */
export const hasValuesInvokeInCallback = (
    // eslint-disable-next-line promise/prefer-await-to-callbacks
    callback: TSESTree.ArrowFunctionExpression | TSESTree.FunctionExpression
): boolean => {
    if (callback.body.type !== 'BlockStatement') {
        return false;
    }

    let found = false;

    walk(callback.body, node => {
        if (found) {
            return;
        }

        if (node.type === 'CallExpression' && isValuesInvokeCall(node)) {
            found = true;
        }
    });

    return found;
};

/**
 * Analyzes the first `then` callback body for mount/wrap usage, assertions,
 * invalid statements, and invalid ordering between wrap and mount calls.
 *
 * @param callback The `then` callback function expression to inspect.
 * @returns An object describing whether the callback contains assertions, invalid statements, invalid ordering, and the presence of mount/wrap usage.
 */
// eslint-disable-next-line promise/prefer-await-to-callbacks
export const checkFirstThenBody = (callback: TSESTree.ArrowFunctionExpression | TSESTree.FunctionExpression) => {
    const needs = {
        hasAssertion: false,
        hasInvalidOrder: false,
        hasInvalidStatement: false,
        hasMount: false,
        hasWrap: false
    };

    if (callback.body.type !== 'BlockStatement') {
        return needs;
    }

    const statements = callback.body.body;
    let wrapIndex = -1;
    let mountIndex = -1;

    for (let index = 0; index < statements.length; index += 1) {
        const statement = statements[index];

        if (!isAllowedFirstThenStatement(statement)) {
            needs.hasInvalidStatement = true;
            continue;
        }

        const expression = statement.type === 'ExpressionStatement' ? statement.expression : null;

        if (expression && hasWrapValues(expression)) {
            wrapIndex = index;
        }

        if (expression && hasMountWithMock(expression)) {
            mountIndex = index;
        }
    }

    if (wrapIndex !== -1 && mountIndex !== -1 && wrapIndex > mountIndex) {
        needs.hasInvalidOrder = true;
    }

    walk(callback.body, node => {
        if (hasMountWithMock(node)) {
            needs.hasMount = true;
        }

        if (hasWrapValues(node)) {
            needs.hasWrap = true;
        }

        if (hasAssertionCall(node)) {
            needs.hasAssertion = true;
        }
    });

    return needs;
};