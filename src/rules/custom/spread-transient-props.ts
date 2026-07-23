import {ESLintUtils} from '@typescript-eslint/utils';

import type {TSESLint} from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
    name => `https://github.com/nfqde/eslint-config-nfq/blob/master/docs/rules/${name}.md`
);

type MessageIds = 'spreadTransient';

export const spreadTransientProps = createRule<[], MessageIds>({
    defaultOptions: [],
    meta: {
        // eslint-disable-next-line @stylistic/max-len
        docs: {description: 'Require spreading the shared `transient` options object into an object literal when passed to emotion styled().'},
        fixable: 'code',
        // eslint-disable-next-line @stylistic/max-len
        messages: {spreadTransient: 'Spread `transient` into an object literal: styled(tag, {...transient}). The SWC emotion plugin can only inject the component target into an object literal at the call site. Passing the identifier directly skips the transform and breaks component selectors at runtime.'},
        schema: [],
        type: 'problem'
    },
    name: 'spread-transient-props',
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
        return {
            /**
             * Handles CallExpression nodes and reports styled() calls that pass the bare `transient` identifier.
             * It only inspects calls to `styled` with exactly two arguments where the second one is the
             * `transient` identifier. It reports the violation and provides an autofix that spreads the
             * identifier into a fresh object literal.
             *
             * @param node The call expression node being visited.
             *
             * @example
             * ```tsx
             * CallExpression(node);
             * ```
             */
            CallExpression(node) {
                if (
                    node.callee.type !== 'Identifier'
                    || node.callee.name !== 'styled'
                    // eslint-disable-next-line @nfq/no-magic-numbers
                    || node.arguments.length !== 2
                ) {
                    return;
                }

                const [, options] = node.arguments;

                if (options.type === 'Identifier' && options.name === 'transient') {
                    context.report({
                        messageId: 'spreadTransient',
                        node: options,
                        /**
                         * Replaces the bare `transient` identifier with a spread object literal.
                         * This makes the options argument an object expression the SWC emotion plugin
                         * can extend with the component target.
                         *
                         * @param fixer The fixer used to create the text replacement.
                         * @returns The fix that rewrites the identifier to `{...transient}`.
                         *
                         * @example
                         * ```tsx
                         * fix(fixer);
                         * ```
                         */
                        fix(fixer) {
                            return fixer.replaceText(options, '{...transient}');
                        }
                    });
                }
            }
        } satisfies TSESLint.RuleListener;
    }
});