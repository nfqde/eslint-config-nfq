import {ESLintUtils} from '@typescript-eslint/utils';

import {
    checkFirstThenBody,
    checkHookArguments,
    getThenChain,
    hasValuesInvokeInCallback,
    isHookCall,
    isItCall,
    isMountHookCall,
    isThenCallbackValid,
    walk
} from './utils/cypress-mount-hook-utils';

import type {TSESLint, TSESTree} from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
    name => `https://github.com/nfqde/eslint-config-nfq/blob/master/docs/rules/${name}.md`
);

type MessageIds = 'assertionInFirstThen' | 'invalidFirstThenStatement' | 'invalidHookArgument' | 'invalidThenOrder'
    | 'missingFirstThen' | 'missingHooksArgs' | 'missingMount' | 'missingSecondThen' | 'missingThenAfterInvoke'
    | 'missingThenDestructure' | 'missingThenWrap' | 'unwrappedHook';

export const cypressMountHook = createRule<[], MessageIds>({
    defaultOptions: [],
    meta: {
        docs: {description: 'Enforce mountHook/mountHooks usage and chaining patterns.'},
        messages: {
            assertionInFirstThen: 'Do not assert in the first then; mount and alias values there instead.',
            // eslint-disable-next-line @stylistic/max-len
            invalidFirstThenStatement: 'Only cy.wrap(values).as("values") and cy.mount(<MockComponent />) are allowed in the first then.',
            invalidHookArgument: 'mountHook(s) must receive a hook function or an arrow that only calls a hook.',
            invalidThenOrder: 'Call cy.wrap(values).as("values") before cy.mount(<MockComponent />).',
            // eslint-disable-next-line @stylistic/max-len
            missingFirstThen: 'mountHook(s) must be chained with a first then that destructures {MockComponent, values}.',
            missingHooksArgs: 'mountHooks must receive at least two hook arguments.',
            missingMount: 'First then must call cy.mount with <MockComponent />.',
            missingSecondThen: 'mountHook(s) must be chained with a second then for assertions.',
            missingThenAfterInvoke: 'Add another then after invoke to assert updated values.',
            missingThenDestructure: 'First then must destructure {MockComponent, values}.',
            missingThenWrap: 'First then must call cy.wrap(values).as("values").',
            unwrappedHook: 'Hook invocations must be wrapped by mountHook(s).'
        },
        schema: [],
        type: 'suggestion'
    },
    name: 'cypress-mount-hook',
    /**
     * Creates the ESLint rule listener configuration for this rule. It inspects `it` blocks to find hook and mount
     * usage and reports violations of the rule’s chaining and argument requirements. It returns a listener map that
     * ESLint will invoke during traversal to perform these checks.
     *
     * @param context The ESLint rule context used for reporting and source inspection.
     * @returns The rule listener object that handles AST traversal.
     *
     * @example
     * ```tsx
     * const listeners = rule.create(context);
     * ```
     */
    create(context) {
        return {
            /**
             * Handles `CallExpression` nodes by validating `it` blocks for correct hook wrapping, mount usage, and then
             * chaining patterns. It walks the callback body to collect hook and mount calls, checks argument validity,
             * and reports rule violations with precise message identifiers. It also enforces the expected ordering and
             * presence of `then` callbacks to keep the mount flow consistent and safe.
             *
             * @param node The call expression node currently being visited by the ESLint traversal.
             *
             * @example
             * ```tsx
             * it('mounts hooks', () => {
             *     mountHook(useMyHook).then(({MockComponent, values}) => {
             *         cy.wrap(values).as('values');
             *         cy.mount(<MockComponent />);
             *     }).then(() => {
             *         cy.get('@values').should('exist');
             *     });
             * });
             * ```
             */
            // eslint-disable-next-line complexity
            CallExpression(node) {
                if (!isItCall(node)) {
                    return;
                }

                const callback = node.arguments[1];

                if (callback.type !== 'ArrowFunctionExpression' && callback.type !== 'FunctionExpression') {
                    return;
                }

                const {body} = callback;

                if (body.type !== 'BlockStatement') {
                    return;
                }

                const hookCalls: TSESTree.CallExpression[] = [];
                const mountCalls: TSESTree.CallExpression[] = [];
                const allowedHookCalls = new Set<TSESTree.CallExpression>();

                walk(body, child => {
                    if (child.type === 'CallExpression' && isHookCall(child)) {
                        hookCalls.push(child);
                    }

                    if (child.type === 'CallExpression' && isMountHookCall(child)) {
                        mountCalls.push(child);
                    }
                });

                for (const mountCall of mountCalls) {
                    const result = checkHookArguments(mountCall, {
                        invalidHookArgument: 'invalidHookArgument',
                        missingHooksArgs: 'missingHooksArgs'
                    });
                    const hasHookArgErrors = result.errors.length > 0;

                    for (const error of result.errors) {
                        context.report({
                            messageId: error.messageId,
                            node: error.node
                        });
                    }

                    for (const hookCall of result.allowedHookCalls) {
                        allowedHookCalls.add(hookCall);
                    }

                    const thens = getThenChain(mountCall);
                    const firstThen = thens[0];

                    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                    if (!firstThen) {
                        context.report({
                            messageId: 'missingFirstThen',
                            node: mountCall
                        });
                        continue;
                    }

                    const validCallback = isThenCallbackValid(firstThen.arguments[0] as TSESTree.Node | undefined);

                    if (!validCallback) {
                        context.report({
                            messageId: 'missingThenDestructure',
                            node: firstThen
                        });
                        continue;
                    }

                    const {
                        hasAssertion,
                        hasInvalidOrder,
                        hasInvalidStatement,
                        hasMount,
                        hasWrap
                    } = checkFirstThenBody(validCallback);

                    if (!hasWrap) {
                        context.report({
                            messageId: 'missingThenWrap',
                            node: validCallback
                        });
                    }

                    if (!hasMount) {
                        context.report({
                            messageId: 'missingMount',
                            node: validCallback
                        });
                    }

                    if (hasAssertion) {
                        context.report({
                            messageId: 'assertionInFirstThen',
                            node: validCallback
                        });
                    }

                    if (hasInvalidStatement) {
                        context.report({
                            messageId: 'invalidFirstThenStatement',
                            node: validCallback
                        });
                    }

                    if (hasInvalidOrder) {
                        context.report({
                            messageId: 'invalidThenOrder',
                            node: validCallback
                        });
                    }

                    const firstThenValid = hasWrap
                        && hasMount
                        && !hasAssertion
                        && !hasInvalidStatement
                        && !hasInvalidOrder;

                    if (hasHookArgErrors || !firstThenValid) {
                        continue;
                    }

                    const secondThen = thens[1];

                    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                    if (!secondThen) {
                        context.report({
                            messageId: 'missingSecondThen',
                            node: mountCall
                        });
                        continue;
                    }

                    const secondCallback = secondThen.arguments[0];

                    if (
                        secondCallback.type === 'ArrowFunctionExpression'
                        || secondCallback.type === 'FunctionExpression'
                    ) {
                        if (hasValuesInvokeInCallback(secondCallback) && !thens[2]) {
                            context.report({
                                messageId: 'missingThenAfterInvoke',
                                node: secondThen
                            });
                        }
                    }
                }

                for (const hookCall of hookCalls) {
                    if (!allowedHookCalls.has(hookCall)) {
                        context.report({
                            messageId: 'unwrappedHook',
                            node: hookCall
                        });
                    }
                }
            }
        } satisfies TSESLint.RuleListener;
    }
});