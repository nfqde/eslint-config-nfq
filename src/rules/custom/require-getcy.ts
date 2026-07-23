import {ESLintUtils} from '@typescript-eslint/utils';

import {
    isAliasGetCall,
    isCyGetCall,
    isGetCyRegistration
} from './utils/require-getcy-utils';

import type {TSESLint, TSESTree} from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
    name => `https://github.com/nfqde/eslint-config-nfq/blob/master/docs/rules/${name}.md`
);

type MessageIds = 'useGetCy';

export const requireGetCy = createRule<[], MessageIds>({
    defaultOptions: [],
    meta: {
        docs: {description: 'Require using cy.getCy instead of cy.get.'},
        messages: {useGetCy: 'Use cy.getCy() instead of cy.get().'},
        schema: [],
        type: 'suggestion'
    },
    name: 'require-getcy',
    /**
     * Creates the rule listener set for this ESLint rule.
     * It wires the context to the callbacks that will analyze nodes and report violations.
     * It returns an object that satisfies the rule listener contract expected by ESLint.
     *
     * @param context The rule context used to report violations and access options.
     * @returns A rule listener object that contains callbacks for traversed nodes.
     *
     * @example
     * ```tsx
     * const listeners = create(context);
     * ```
     */
    create(context) {
        /**
         * Determines whether a node is located within a getCy registration call.
         * It walks up the AST parent chain to detect any registration node.
         * It returns true when a registration is found, otherwise false.
         *
         * @param node The node to start walking from.
         * @returns Whether the node is inside a getCy registration.
         *
         * @example
         * ```tsx
         * const inside = isInsideGetCyRegistration(node);
         * ```
         */
        const isInsideGetCyRegistration = (node: TSESTree.Node) => {
            let current: TSESTree.Node | undefined = node;

            while (current) {
                if (isGetCyRegistration(current)) {
                    return true;
                }

                current = current.parent ?? undefined;
            }

            return false;
        };

        return {
            /**
             * Handles CallExpression nodes and reports invalid cy.get usage.
             * It skips nodes that are not cy.get calls or are allowed aliases.
             * It reports a suggestion when a disallowed call is found.
             *
             * @param node The call expression node being visited.
             *
             * @example
             * ```tsx
             * CallExpression(node);
             * ```
             */
            CallExpression(node) {
                if (!isCyGetCall(node)) {
                    return;
                }

                if (isInsideGetCyRegistration(node)) {
                    return;
                }

                if (isAliasGetCall(node)) {
                    return;
                }

                context.report({
                    messageId: 'useGetCy',
                    node
                });
            }
        } satisfies TSESLint.RuleListener;
    }
});