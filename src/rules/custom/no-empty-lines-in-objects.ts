import {ESLintUtils} from '@typescript-eslint/utils';

import type {TSESLint, TSESTree} from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
    name => `https://github.com/nfqde/eslint-config-nfq/blob/master/docs/rules/${name}.md`
);

export const noEmptyLinesInObjects = createRule({
    defaultOptions: [],
    meta: {
        docs: {description: 'Disallow empty lines inside object literals'},
        fixable: 'whitespace',
        messages: {noEmptyLine: 'Empty lines inside object literals are not allowed.'},
        schema: [],
        type: 'layout'
    },
    name: 'no-empty-lines-in-objects',
    /**
     * Creates the ESLint rule implementation that checks for empty lines in object literals.
     * This function sets up the rule's core logic by defining helper functions for gap detection
     * and block member validation, then returns listener functions that process AST nodes.
     *
     * @param context The ESLint rule context containing source code and reporting utilities.
     * @returns An object containing AST node listeners for rule enforcement.
     *
     * @example
     * ```tsx
     * const rule = createRule({
     *   create(context) {
     *     // Rule implementation
     *   }
     * });
     * ```
     */
    create(context) {
        const {sourceCode} = context;

        type TokenLike = TSESTree.Comment | TSESTree.Node | TSESTree.Token;
        type ListenerNode = TSESTree.Node;

        /**
         * Reports gaps containing empty lines between two tokens in an object structure.
         * This function analyzes the whitespace between tokens and reports violations when
         * multiple consecutive newlines are found, providing automatic fixes when possible.
         *
         * @param node       The AST node associated with the gap being checked.
         * @param startToken The starting token of the gap to check.
         * @param endToken   The ending token of the gap to check.
         *
         * @example
         * ```tsx
         * reportGap(objectNode, leftBrace, firstProperty);
         * ```
         */
        const reportGap = (node: TSESTree.Node, startToken: TokenLike, endToken: TokenLike): void => {
            const startIndex = startToken.range[1];
            const endLineStartIndex = sourceCode.getIndexFromLoc({
                column: 0,
                line: endToken.loc.start.line
            });
            const gapText = sourceCode.text.slice(startIndex, endLineStartIndex);

            if (gapText.includes('\n\n')) {
                const indent = sourceCode.text.slice(endLineStartIndex, endToken.range[0]);
                const sourceText = sourceCode.text;
                let scanIndex = endLineStartIndex - 1;

                while (scanIndex >= startIndex && (/\s/u).test(sourceText[scanIndex])) {
                    scanIndex -= 1;
                }

                const fixStartIndex = Math.max(startIndex, scanIndex + 1);

                context.report({
                    fix: fixer => fixer.replaceTextRange([fixStartIndex, endToken.range[0]], `\n${indent}`),
                    loc: endToken.loc,
                    messageId: 'noEmptyLine',
                    node
                });
            }
        };

        /**
         * Checks block-style structures for empty lines between their opening brace, members, and closing brace.
         * This function iterates through all members of a block structure and validates spacing
         * between the opening brace and first member, between consecutive members, and between the last member and closing brace.
         *
         * @param node    The parent AST node containing the block structure.
         * @param members An array of member nodes within the block structure.
         *
         * @example
         * ```tsx
         * checkBlockMembers(objectNode, objectNode.properties);
         * ```
         */
        const checkBlockMembers = (node: TSESTree.Node, members: TSESTree.Node[] | undefined): void => {
            const leftBrace = sourceCode.getFirstToken(node);
            const rightBrace = sourceCode.getLastToken(node);

            if (!leftBrace || !rightBrace) {
                return;
            }

            const memberItems: {end: TSESTree.Token; start: TSESTree.Token}[] = [];

            for (const member of members ?? []) {
                const memberTokens = sourceCode.getTokens(member);

                if (memberTokens.length === 0) {
                    continue;
                }

                memberItems.push({
                    end: memberTokens[memberTokens.length - 1],
                    start: memberTokens[0]
                });
            }
            const memberRanges = memberItems.map(item => ({
                end: item.end.range[1],
                start: item.start.range[0]
            }));
            const commentItems = sourceCode
                .getTokensBetween(leftBrace, rightBrace, {includeComments: true})
                .filter(token => token.type === 'Block' || token.type === 'Line')
                .filter(comment => !memberRanges
                    .some(range => comment.range[0] >= range.start && comment.range[1] <= range.end))
                .map(comment => ({
                    end: comment,
                    start: comment
                }));
            const items = [...memberItems, ...commentItems]
                .sort((a, b) => a.start.range[0] - b.start.range[0]);

            if (items.length === 0) {
                return;
            }

            reportGap(node, leftBrace, items[0].start);

            for (let i = 1; i < items.length; i += 1) {
                reportGap(node, items[i - 1].end, items[i].start);
            }

            reportGap(node, items[items.length - 1].end, rightBrace);
        };

        const listeners: TSESLint.RuleListener = {
            /**
             * Handles ObjectExpression nodes to check for empty lines within object literals.
             * This listener function validates that object expressions follow the no-empty-lines rule
             * by examining spacing between properties and braces within the object structure.
             *
             * @param node The ObjectExpression AST node to validate.
             *
             * @example
             * ```tsx
             * // This would trigger the rule:
             * const obj = {
             *   prop1: 'value',
             *
             *   prop2: 'value'
             * };
             * ```
             */
            ObjectExpression(node: ListenerNode) {
                if (node.type !== 'ObjectExpression') {
                    return;
                }
                const objectNode = node;

                checkBlockMembers(objectNode, objectNode.properties as TSESTree.Node[]);
            }
        };

        return listeners;
    }
});