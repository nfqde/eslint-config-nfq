import {ASTUtils, ESLintUtils} from '@typescript-eslint/utils';

import type {TSESLint, TSESTree} from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
    name => `https://github.com/nfqde/eslint-config-nfq/blob/master/docs/rules/${name}.md`
);

const DEFAULT_SCREEN_SIZES = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

type RuleOptions = [
    {
        allowAllPropertiesOnSameLine?: boolean;
        allowMultiplePropertiesPerLine?: boolean;
        ignoredProperties?: string[];
    }
];

type MessageIds = 'propertiesOnNewline' | 'propertiesOnNewlineAll';

export const objectPropertyNewline = createRule<RuleOptions, MessageIds>({
    defaultOptions: [{
        allowAllPropertiesOnSameLine: false,
        allowMultiplePropertiesPerLine: false,
        ignoredProperties: DEFAULT_SCREEN_SIZES
    }],
    meta: {
        docs: {description: 'Enforce placing object properties on separate lines except screensize object properties.'},
        fixable: 'whitespace',
        messages: {
            propertiesOnNewline: 'Object properties must go on a new line.',
            propertiesOnNewlineAll: "Object properties must go on a new line if they aren't all on the same line."
        },
        schema: [
            {
                additionalProperties: false,
                properties: {
                    allowAllPropertiesOnSameLine: {
                        default: false,
                        type: 'boolean'
                    },
                    allowMultiplePropertiesPerLine: {
                        default: false,
                        // Deprecated
                        type: 'boolean'
                    },
                    ignoredProperties: {
                        default: DEFAULT_SCREEN_SIZES,
                        items: {type: 'string'},
                        type: 'array'
                    }
                },
                type: 'object'
            }
        ],
        type: 'layout'
    },
    name: 'object-property-newline',
    /**
     * Creates the rule listener set for enforcing object property newlines. It reads configuration from rule options
     * and shared settings. It returns listeners that validate object expressions and optionally fix formatting.
     *
     * @param context The rule context provided by ESLint.
     * @returns The rule listener map for this rule.
     *
     * @example
     * ```tsx
     * const listeners = objectPropertyNewline.create(context);
     * ```
     */
    create(context) {
        const options = context.options[0];
        const shared = (
            context.settings as {'@nfq'?: {ignoredProperties?: string[]}} | undefined
        )?.['@nfq']?.ignoredProperties ?? [];
        const allowSameLine = Boolean(
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            options?.allowAllPropertiesOnSameLine
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            ?? options?.allowMultiplePropertiesPerLine
        );
        const ignoredProperties = new Set(
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            options?.ignoredProperties ?? shared ?? DEFAULT_SCREEN_SIZES
        );
        const messageId: MessageIds = allowSameLine ? 'propertiesOnNewlineAll' : 'propertiesOnNewline';
        const {sourceCode} = context;

        /**
         * Checks whether a property key matches an ignored screen size. It supports identifier and string literal keys.
         * It returns false for any other key type.
         *
         * @param prop The object property to test.
         * @returns True when the property should be ignored.
         *
         * @example
         * ```tsx
         * const ignored = isScreenSizeProperty(prop);
         * ```
         */
        const isScreenSizeProperty = (prop: TSESTree.Property) => {
            const {key} = prop;

            if (ASTUtils.isIdentifier(key)) {
                return ignoredProperties.has(key.name);
            }

            if (key.type === 'Literal' && typeof key.value === 'string') {
                return ignoredProperties.has(key.value);
            }

            return false;
        };

        const listeners: TSESLint.RuleListener = {
            /**
             * Validates object expressions for property newline rules. It skips allowed single-line objects and
             * ignored screen size-only objects. It reports and fixes properties that share a line.
             *
             * @param node The object expression node being visited.
             *
             * @example
             * ```tsx
             * ObjectExpression(node);
             * ```
             */
            ObjectExpression(node: TSESTree.ObjectExpression) {
                if (allowSameLine && node.properties.length > 1) {
                    const firstToken = sourceCode.getFirstToken(node.properties[0]);
                    const lastToken = sourceCode.getLastToken(node.properties[node.properties.length - 1]);

                    if (firstToken?.loc.end.line === lastToken?.loc.start.line) {
                        return;
                    }
                }

                if (
                    node.properties.length > 0
                    && node.properties.every(prop => prop.type === 'Property' && isScreenSizeProperty(prop))
                ) {
                    return;
                }

                for (let i = 1; i < node.properties.length; i++) {
                    const prev = node.properties[i - 1];
                    const curr = node.properties[i];
                    const lastTokenOfPrevious = sourceCode.getLastToken(prev);
                    const firstTokenOfCurrent = sourceCode.getFirstToken(curr);

                    if (lastTokenOfPrevious?.loc.end.line === firstTokenOfCurrent?.loc.start.line) {
                        context.report({
                            loc: firstTokenOfCurrent?.loc,
                            messageId,
                            node,
                            /**
                             * Fixes the newline between properties when only whitespace exists. It replaces the
                             * whitespace after the comma with a newline. It returns null when a safe fix is not
                             * possible.
                             *
                             * @param fixer The ESLint fixer utility.
                             * @returns The fix or null when no safe fix is available.
                             *
                             * @example
                             * ```tsx
                             * fix(fixer);
                             * ```
                             */
                            fix(fixer) {
                                const comma = sourceCode.getTokenBefore(firstTokenOfCurrent!);
                                const rangeAfterComma = [comma!.range[1], firstTokenOfCurrent!.range[0]] as const;

                                if (sourceCode.text.slice(rangeAfterComma[0], rangeAfterComma[1]).trim()) {
                                    return null;
                                }

                                return fixer.replaceTextRange(rangeAfterComma, '\n');
                            }
                        });
                    }
                }
            }
        };

        return listeners;
    }
});