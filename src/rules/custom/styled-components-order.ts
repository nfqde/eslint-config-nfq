import {ESLintUtils} from '@typescript-eslint/utils';

import {
    compareBy,
    getDependencyNames,
    getTagDependencies,
    isStyledBase,
    unwrapExpression,
    unwrapTypeStatement
} from './utils/styled-components-order-utils';

import type {TSESLint, TSESTree} from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
    name => `https://github.com/nfqde/eslint-config-nfq/blob/master/docs/rules/${name}.md`
);

type MessageIds = 'dependencyOrder' | 'renderOrder';

type DefinitionInfo = {
    canFix: boolean;
    dependencies: {name: string; node: TSESTree.Identifier}[];
    groupFirst: TSESTree.Node;
    groupLast: TSESTree.Node;
    id: TSESTree.Identifier;
    index: number;
    name: string;
};

export const styledComponentsOrder = createRule<[], MessageIds>({
    defaultOptions: [],
    meta: {
        docs: {description: 'Ensure styled component definitions follow their JSX render order.'},
        fixable: 'code',
        messages: {
            dependencyOrder: 'Define {{dependency}} before {{component}} because it is used in its styles.',
            renderOrder: 'Define {{name}} after {{previous}} to match JSX render order.'
        },
        schema: [],
        type: 'suggestion'
    },
    name: 'styled-components-order',
    /**
     * Creates the rule visitor set and initializes all tracking state.
     * This function wires together definition collection and render-order analysis.
     * It returns the listener map that ESLint uses to walk the AST.
     *
     * @param context The rule context provided by ESLint.
     * @returns The rule listener map for this rule.
     *
     * @example
     * ```tsx
     * const listeners = create(context);
     * ```
     */
    // eslint-disable-next-line max-lines-per-function
    create(context) {
        const {sourceCode} = context;
        const definitions = new Map<string, DefinitionInfo>();
        const renderOrder: string[] = [];
        const renderSet = new Set<string>();
        /**
         * Computes statement grouping and placement information for a variable declarator.
         * This helps keep related statements together when producing fixes.
         * It returns null when the node cannot be safely handled.
         *
         * @param node The variable declarator to analyze.
         * @returns The statement info or null if unavailable.
         *
         * @example
         * ```tsx
         * const info = getStatementInfo(node);
         * ```
         */
        const getStatementInfo = (node: TSESTree.VariableDeclarator) => {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if (node.parent?.type !== 'VariableDeclaration') {
                return null;
            }

            const declaration = node.parent;
            const statement = declaration.parent.type === 'ExportNamedDeclaration'
                ? declaration.parent
                : declaration;

            const parentNode = statement.parent;
            const body = 'body' in parentNode && Array.isArray(parentNode.body)
                ? parentNode.body
                : null;

            if (!body) {
                return null;
            }

            // @ts-expect-error
            const statementIndex = body.indexOf(statement);

            if (statementIndex === -1) {
                return null;
            }

            let groupFirst: TSESTree.Node = statement as TSESTree.Node;

            for (let i = statementIndex - 1; i >= 0; i -= 1) {
                const candidate = unwrapTypeStatement(body[i] as TSESTree.Node);

                if (!candidate) {
                    break;
                }

                const gapText = sourceCode.text.slice(candidate.range[1], groupFirst.range[0]);

                if (gapText.trim()) {
                    break;
                }

                groupFirst = candidate;
            }

            return {
                canFix: declaration.declarations.length === 1,
                groupFirst,
                groupLast: statement as TSESTree.Node,
                index: groupFirst.range[0]
            };
        };
        /**
         * Builds a single fix function that reorders definitions to a desired sequence.
         * This function validates that a safe, contiguous replacement can be made.
         * It returns null when the fix would be unsafe or unnecessary.
         *
         * @param current The current ordered definitions.
         * @param desired The desired ordered definitions.
         * @returns A fixer callback or null if no fix is possible.
         *
         * @example
         * ```tsx
         * const fix = buildReorderFix(current, desired);
         * ```
         */
        const buildReorderFix = (current: DefinitionInfo[], desired: DefinitionInfo[]) => {
            if (current.length !== desired.length) {
                return null;
            }

            if (current.every((definition, index) => definition === desired[index])) {
                return null;
            }

            if (current.some(definition => !definition.canFix)) {
                return null;
            }

            if (current.some(definition => sourceCode.getCommentsBefore(definition.groupFirst).length > 0)) {
                return null;
            }

            const parent = current[0]?.groupFirst.parent;

            if (!parent || current.some(definition => definition.groupFirst.parent !== parent)) {
                return null;
            }

            if (!('body' in parent) || !Array.isArray(parent.body)) {
                return null;
            }

            const body = parent.body as TSESTree.Node[];
            const groupEntries = current.map(definition => {
                const startIndex = body.indexOf(definition.groupFirst);
                const endIndex = body.indexOf(definition.groupLast);

                if (startIndex === -1 || endIndex === -1 || startIndex > endIndex) {
                    return null;
                }

                return {
                    definition,
                    endIndex,
                    startIndex
                };
            });

            if (groupEntries.some(entry => !entry)) {
                return null;
            }

            const ranges = groupEntries;
            const minIndex = Math.min(...ranges.map(entry => entry!.startIndex));
            const maxIndex = Math.max(...ranges.map(entry => entry!.endIndex));
            const covered = new Set<number>();

            ranges.forEach(entry => {
                for (let i = entry!.startIndex; i <= entry!.endIndex; i += 1) {
                    covered.add(i);
                }
            });

            for (let i = minIndex; i <= maxIndex; i += 1) {
                if (!covered.has(i)) {
                    return null;
                }
            }

            const minRange = Math.min(...current.map(definition => definition.groupFirst.range[0]));
            const maxRange = Math.max(...current.map(definition => definition.groupLast.range[1]));
            const desiredText = desired
                .map(definition => sourceCode.text.slice(definition.groupFirst.range[0], definition.groupLast.range[1]))
                .join('\n\n');

            return (fixer: TSESLint.RuleFixer) => [
                fixer.replaceTextRange([minRange, maxRange], desiredText)
            ];
        };

        /**
         * Records a styled component definition and its dependencies for later validation.
         * This function ignores non-styled or duplicate definitions.
         * It stores grouping and index data required for reporting and fixes.
         *
         * @param node The variable declarator to inspect.
         *
         * @example
         * ```tsx
         * recordDefinition(node);
         * ```
         */
        const recordDefinition = (node: TSESTree.VariableDeclarator) => {
            if (node.id.type !== 'Identifier') {
                return;
            }

            if (node.init?.type !== 'TaggedTemplateExpression') {
                return;
            }

            const tag = unwrapExpression(node.init.tag);

            if (!isStyledBase(tag)) {
                return;
            }

            const {name} = node.id;
            const statementInfo = getStatementInfo(node);

            if (!statementInfo) {
                return;
            }

            if (definitions.has(name)) {
                return;
            }

            definitions.set(name, {
                canFix: statementInfo.canFix,
                dependencies: [...getTagDependencies(node.init.tag), ...getDependencyNames(node.init.quasi)],
                groupFirst: statementInfo.groupFirst,
                groupLast: statementInfo.groupLast,
                id: node.id,
                index: statementInfo.index,
                name
            });
        };

        const listeners: TSESLint.RuleListener = {
            'Program:exit': () => {
                const orderedDefinitions = Array.from(definitions.values()).sort((a, b) => a.index - b.index);
                const definitionIndex = new Map<string, number>();

                orderedDefinitions.forEach((definition, index) => {
                    definitionIndex.set(definition.name, index);
                });

                const dependencyMap = new Map<string, Set<string>>();

                const renderIndex = new Map(renderOrder.map((name, index) => [name, index] as const));
                const graph = new Map<string, Set<string>>();
                const inDegree = new Map<string, number>();

                orderedDefinitions.forEach(definition => {
                    graph.set(definition.name, new Set());
                    inDegree.set(definition.name, 0);
                });

                orderedDefinitions.forEach(definition => {
                    const deps = new Set(
                        definition.dependencies
                            .map(dep => dep.name)
                            .filter(dep => definitionIndex.has(dep))
                    );

                    if (deps.size > 0) {
                        dependencyMap.set(definition.name, deps);
                    }

                    deps.forEach(dep => {
                        if (!graph.has(dep)) {
                            graph.set(dep, new Set());
                        }

                        graph.get(dep)!.add(definition.name);
                        inDegree.set(definition.name, (inDegree.get(definition.name) ?? 0) + 1);
                    });
                });

                /**
                 * Computes a tuple used to prioritize definitions during sorting.
                 * This combines render order position with source order.
                 * It returns a tuple that is stable and deterministic.
                 *
                 * @param definition The definition to prioritize.
                 * @returns The priority tuple.
                 *
                 * @example
                 * ```tsx
                 * const priority = priorityFor(definition);
                 * ```
                 */
                const priorityFor = (definition: DefinitionInfo) => {
                    const renderPos = renderIndex.get(definition.name);

                    return [renderPos ?? Number.POSITIVE_INFINITY, definition.index] as const;
                };

                /**
                 * Compares two definitions using their computed priority. This ensures render order wins over source order when available. It returns a standard sort comparator value.
                 *
                 * @param left  The first definition to compare.
                 * @param right The second definition to compare.
                 * @returns A comparator number for sorting.
                 *
                 * @example
                 * ```tsx
                 * const result = byPriority(a, b);
                 * ```
                 */
                const byPriority = (left: DefinitionInfo, right: DefinitionInfo) => {
                    const [leftRender, leftIndex] = priorityFor(left);
                    const [rightRender, rightIndex] = priorityFor(right);

                    if (leftRender !== rightRender) {
                        return leftRender - rightRender;
                    }

                    return leftIndex - rightIndex;
                };

                const pending = orderedDefinitions.filter(definition => (inDegree.get(definition.name) ?? 0) === 0);
                const desiredOrder: DefinitionInfo[] = [];

                while (pending.length > 0) {
                    compareBy(pending, byPriority);
                    const next = pending.shift()!;

                    desiredOrder.push(next);

                    graph.get(next.name)?.forEach(dependent => {
                        const nextDegree = (inDegree.get(dependent) ?? 0) - 1;

                        inDegree.set(dependent, nextDegree);

                        if (nextDegree === 0) {
                            const dependentDefinition = definitions.get(dependent);

                            if (dependentDefinition) {
                                pending.push(dependentDefinition);
                            }
                        }
                    });
                }

                const renderNames = renderOrder.filter(name => definitionIndex.has(name));
                const needsRenderOrder = renderNames.length > 0;
                const reorderFix = desiredOrder.length === orderedDefinitions.length
                    ? buildReorderFix(orderedDefinitions, desiredOrder)
                    : null;
                let fixUsed = false;

                /**
                 * Attaches a fix only once, ensuring deterministic and safe fixes.
                 * This function prevents multiple reports from emitting the same fixer.
                 * It returns undefined when a fix cannot be attached.
                 *
                 * @param fix The candidate fix to attach.
                 * @returns The fix or undefined.
                 *
                 * @example
                 * ```tsx
                 * const fix = attachFix(reorderFix);
                 * ```
                 */
                const attachFix = (fix: ReturnType<typeof buildReorderFix>) => {
                    if (!fix || fixUsed) {
                        return undefined;
                    }

                    fixUsed = true;

                    return fix;
                };

                orderedDefinitions.forEach(definition => {
                    const currentIndex = definitionIndex.get(definition.name);

                    if (currentIndex === undefined) {
                        return;
                    }

                    definition.dependencies.forEach(dep => {
                        const depIndex = definitionIndex.get(dep.name);

                        if (depIndex !== undefined && depIndex > currentIndex) {
                            context.report({
                                data: {
                                    component: definition.name,
                                    dependency: dep.name
                                },
                                fix: attachFix(reorderFix),
                                messageId: 'dependencyOrder',
                                node: dep.node
                            });
                        }
                    });
                });

                const transitiveDeps = new Map<string, Set<string>>();

                /**
                 * Computes the full set of transitive dependencies for a component. It recursively
                 * follows direct dependencies, caching results to avoid redundant work. It returns
                 * a set containing all direct and indirect dependency names.
                 *
                 * @param name The component name to resolve transitive deps for.
                 * @returns The set of all transitive dependency names.
                 */
                const getTransitiveDeps = (name: string): Set<string> => {
                    if (transitiveDeps.has(name)) {
                        return transitiveDeps.get(name)!;
                    }

                    const result = new Set<string>();

                    transitiveDeps.set(name, result);

                    const direct = dependencyMap.get(name);

                    if (direct) {
                        for (const dep of direct) {
                            result.add(dep);

                            for (const transitive of getTransitiveDeps(dep)) {
                                result.add(transitive);
                            }
                        }
                    }

                    return result;
                };

                const earlierRendered: string[] = [];
                let maxDefIndex = -1;
                let maxDefName = '';

                renderNames.forEach(name => {
                    const currentIndex = definitionIndex.get(name);

                    if (currentIndex === undefined) {
                        return;
                    }

                    if (currentIndex < maxDefIndex) {
                        const isDependencyForEarlier = earlierRendered
                            .some(earlier => getTransitiveDeps(earlier).has(name));

                        if (!isDependencyForEarlier) {
                            const definition = definitions.get(name);

                            if (definition) {
                                context.report({
                                    data: {
                                        name,
                                        previous: maxDefName
                                    },
                                    fix: needsRenderOrder ? attachFix(reorderFix) : undefined,
                                    messageId: 'renderOrder',
                                    node: definition.id
                                });
                            }
                        }
                    }

                    if (currentIndex > maxDefIndex) {
                        maxDefIndex = currentIndex;
                        maxDefName = name;
                    }

                    earlierRendered.push(name);
                });
            },
            VariableDeclarator: recordDefinition,
            /**
             * Tracks JSX opening elements to derive render order.
             * This function records each component name once in first-seen order.
             * It ignores non-identifier element names.
             *
             * @param node The JSX opening element node.
             *
             * @example
             * ```tsx
             * listeners.JSXOpeningElement(node);
             * ```
             */
            JSXOpeningElement(node) {
                if (node.name.type !== 'JSXIdentifier') {
                    return;
                }

                const {name} = node.name;

                if (!renderSet.has(name)) {
                    renderSet.add(name);
                    renderOrder.push(name);
                }
            }
        };

        return listeners;
    }
});