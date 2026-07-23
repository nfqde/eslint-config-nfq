import {AST_NODE_TYPES, ESLintUtils} from '@typescript-eslint/utils';

import {isValidOrders} from './utils/isValidOrders';
import {getPropertyName} from './utils/sort-keys-utils';

import type {TSESLint, TSESTree} from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
    name => `https://github.com/nfqde/eslint-config-nfq/blob/master/docs/rules/${name}.md`
);

type SortOrder = 'asc' | 'desc';

type RuleOptions = [
    SortOrder?,
    {
        caseSensitive?: boolean;
        ignorePropTypes?: boolean;
        methodsExtra?: boolean;
        natural?: boolean;
    }?
];

type Stack = {
    ignoreSort?: boolean;
    prevName: string | null;
    prevNode: TSESTree.Property | null;
    upper: Stack | null;
};

type MessageIds = 'ignoredPropertiesOrder' | 'outOfOrder';

export const sortKeys = createRule<RuleOptions, MessageIds>({
    defaultOptions: [],
    meta: {
        docs: {description: 'require object keys to be sorted'},
        fixable: 'code',
        messages: {
            ignoredPropertiesOrder: 'Object keys must follow the configured order: {{order}}.',
            // eslint-disable-next-line @stylistic/max-len
            outOfOrder: "Expected object keys to be in {{natual}}{{insensitive}}{{order}}ending order{{methods}}. '{{thisName}}' should be before '{{prevName}}'."
        },
        schema: [
            {
                enum: ['asc', 'desc'],
                type: 'string'
            },
            {
                additionalProperties: false,
                properties: {
                    caseSensitive: {type: 'boolean'},
                    ignorePropTypes: {type: 'boolean'},
                    methodsExtra: {type: 'boolean'},
                    natural: {type: 'boolean'}
                },
                type: 'object'
            }
        ],
        type: 'suggestion'
    },
    name: 'sort-keys',
    /**
     * Creates the rule listeners and shared state for the sort-keys rule. It initializes
     * configuration options from context and wires up the AST visitors used for sorting.
     * The function returns a listener map that ESLint executes while traversing the AST.
     *
     * @param context The rule context provided by ESLint.
     * @returns The listener map for the rule.
     *
     * @example
     * ```tsx
     * const listeners = create(context);
     * ```
     */
    create(context) {
        const ignoredProperties = (
            context.settings as {'@nfq'?: {ignoredProperties?: string[]}} | undefined
        )?.['@nfq']?.ignoredProperties ?? [];
        const ignoredPropertySet = new Set(ignoredProperties);
        const ignoredOrderIndex = new Map(ignoredProperties.map((name, index) => [name, index]));

        const order = (context.options[0] ?? 'asc');
        const options = context.options[1];
        const insensitive = (options?.caseSensitive) === false;
        const natual = Boolean(options?.natural);
        const ignorePropTypes = Boolean(options?.ignorePropTypes);
        const methodsExtra = Boolean(options?.methodsExtra);
        const orderFuncKey = `${order}${(insensitive ? 'I' : '')}${(natual ? 'N' : '')}${(methodsExtra ? 'F' : '')}` as const;
        const isValidOrder = isValidOrders[orderFuncKey];

        /**
         * Determines whether an object expression consists only of ignored properties. It
         * checks the configured ignored property names and validates each property node.
         * The function is used to skip sorting for objects that contain only ignored keys.
         *
         * @param node The object expression to inspect.
         * @returns Whether the object should be ignored for sorting.
         *
         * @example
         * ```tsx
         * const ignored = isIgnoredOnlyObject(objectExpression);
         * ```
         */
        const isIgnoredOnlyObject = (node: TSESTree.ObjectExpression) => (
            ignoredProperties.length > 0
            && node.properties.length > 0
            && node.properties.every(
                prop => prop.type === AST_NODE_TYPES.Property
                    && Boolean(getPropertyName(prop))
                    && ignoredPropertySet.has(getPropertyName(prop)!)
            )
        );

        let stack: Stack | null = null;

        /**
         * Handles spread elements inside object expressions by resetting the previous name. It
         * ensures the sort comparison restarts after a spread. This avoids false positives
         * when ordering keys around spreads.
         *
         * @param node The spread element node to process.
         *
         * @example
         * ```tsx
         * SpreadElement(spreadNode);
         * ```
         */
        const SpreadElement = (node: TSESTree.SpreadElement) => {
            if (node.parent.type === AST_NODE_TYPES.ObjectExpression && stack) {
                stack.prevName = null;
            }
        };

        const listeners: TSESLint.RuleListener = {
            ExperimentalSpreadProperty: SpreadElement,
            /**
             * Pops the stack frame when leaving an object expression. It restores the previous
             * frame so outer objects continue tracking property order correctly. The function
             * performs a null check before restoring.
             *
             * @example
             * ```tsx
             * listeners['ObjectExpression:exit']();
             * ```
             */
            'ObjectExpression:exit': function() {
                if (stack) {
                    stack = stack.upper;
                }
            },
            SpreadElement,
            /**
             * Pushes a new stack frame when entering an object expression. It tracks previous
             * property state for ordering checks within that object. The frame is configured
             * to ignore sorting when the object contains only ignored properties.
             *
             * @param node The object expression node.
             *
             * @example
             * ```tsx
             * listeners.ObjectExpression(objectExpression);
             * ```
             */
            ObjectExpression(node: TSESTree.ObjectExpression) {
                stack = {
                    ignoreSort: isIgnoredOnlyObject(node),
                    prevName: null,
                    prevNode: null,
                    upper: stack
                };
            },
            /**
             * Validates property ordering and reports if keys are out of order. It respects
             * configuration options such as ignored properties and method sorting. The handler
             * may report and fix key ordering by swapping property text.
             *
             * @param node The property node to validate.
             *
             * @example
             * ```tsx
             * listeners.Property(propertyNode);
             * ```
             */
            // eslint-disable-next-line complexity
            Property(node: TSESTree.Property) {
                if (!stack) {
                    return;
                }

                if (node.parent.type === AST_NODE_TYPES.ObjectPattern) {
                    return;
                }

                if (ignorePropTypes) {
                    if (
                        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                        node.parent.type === AST_NODE_TYPES.ObjectExpression
                        && getPropertyName(node.parent.parent as TSESTree.Property) === 'propTypes'
                    ) {
                        return;
                    }
                    if (
                        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                        node.parent.type === AST_NODE_TYPES.ObjectExpression
                        && getPropertyName(node.parent.parent as TSESTree.Property) === 'defaultProps'
                    ) {
                        return;
                    }
                }

                const {prevName} = stack;
                const {prevNode} = stack;
                const thisName = getPropertyName(node);

                if (thisName !== null) {
                    stack.prevName = thisName;
                    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                    stack.prevNode = node || prevNode;
                }

                if (prevName === null || thisName === null || !prevNode) {
                    return;
                }

                if (stack.ignoreSort) {
                    const prevIndex = ignoredOrderIndex.get(prevName);
                    const thisIndex = ignoredOrderIndex.get(thisName);

                    if (prevIndex !== undefined && thisIndex !== undefined && thisIndex < prevIndex) {
                        context.report({
                            data: {order: ignoredProperties.join(', ')},
                            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                            loc: node.key.loc ?? undefined,
                            messageId: 'ignoredPropertiesOrder',
                            node,
                            /**
                             * Creates fixes that swap the text and leading comments between two properties.
                             * It builds a list of ESLint fixes and preserves comment placement during the swap.
                             * It returns the collection of fixes that ESLint applies to reorder the properties.
                             *
                             * @param fixer The fixer used to generate the text edits.
                             * @returns The list of fixes that swap the property positions.
                             *
                             * @example
                             * ```tsx
                             * const fixes = fix(fixer);
                             * ```
                             */
                            fix(fixer) {
                                const fixes: TSESLint.RuleFix[] = [];
                                const {sourceCode} = context;
                                /**
                                 * Moves property text and associated comments between nodes. It
                                 * copies the text from one node to another and preserves leading
                                 * comments by re-inserting them before the target node.
                                 *
                                 * @param fromNode The property to move from.
                                 * @param toNode   The property to move to.
                                 *
                                 * @example
                                 * ```tsx
                                 * moveProperty(fromNode, toNode);
                                 * ```
                                 */
                                const moveProperty = (fromNode: TSESTree.Property, toNode: TSESTree.Property) => {
                                    const prevText = sourceCode.getText(fromNode);
                                    const thisComments = sourceCode.getCommentsBefore(fromNode);

                                    for (const thisComment of thisComments) {
                                        fixes.push(fixer.insertTextBefore(toNode, `${sourceCode.getText(thisComment)}\n`));
                                        fixes.push(fixer.remove(thisComment));
                                    }
                                    fixes.push(fixer.replaceText(toNode, prevText));
                                };

                                moveProperty(node, prevNode);
                                moveProperty(prevNode, node);

                                return fixes;
                            }
                        });
                    }

                    return;
                }

                if (!isValidOrder({
                    method: prevNode.method,
                    name: prevName
                }, {
                    method: node.method,
                    name: thisName
                })) {
                    context.report({
                        data: {
                            insensitive: insensitive ? 'insensitive ' : '',
                            methods: methodsExtra ? ' (methods seperate)' : '',
                            natual: natual ? 'natural ' : '',
                            order,
                            prevName,
                            thisName
                        },
                        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                        loc: node.key.loc ?? undefined,
                        messageId: 'outOfOrder',
                        node,
                        /**
                         * Creates the list of fixes that swap the out-of-order properties.
                         * It gathers the text edits required to move both properties and any leading comments to
                         * their new locations. It returns the fixes so ESLint can apply them as a single operation.
                         *
                         * @param fixer The fixer used to construct text edits for the swap.
                         * @returns The collection of fixes that reorder the two properties.
                         *
                         * @example
                         * ```tsx
                         * const edits = fix(fixer);
                         * ```
                         */
                        fix(fixer) {
                            const fixes: TSESLint.RuleFix[] = [];
                            const {sourceCode} = context;
                            /**
                             * Moves property text and associated comments between nodes. It
                             * copies the text from one node to another and preserves leading
                             * comments by re-inserting them before the target node.
                             *
                             * @param fromNode The property to move from.
                             * @param toNode   The property to move to.
                             *
                             * @example
                             * ```tsx
                             * moveProperty(fromNode, toNode);
                             * ```
                             */
                            const moveProperty = (fromNode: TSESTree.Property, toNode: TSESTree.Property) => {
                                const prevText = sourceCode.getText(fromNode);
                                const thisComments = sourceCode.getCommentsBefore(fromNode);

                                for (const thisComment of thisComments) {
                                    fixes.push(fixer.insertTextBefore(toNode, `${sourceCode.getText(thisComment)}\n`));
                                    fixes.push(fixer.remove(thisComment));
                                }
                                fixes.push(fixer.replaceText(toNode, prevText));
                            };

                            moveProperty(node, prevNode);
                            moveProperty(prevNode, node);

                            return fixes;
                        }
                    });
                }
            }
        };

        return listeners;
    }
});