import {ESLintUtils} from '@typescript-eslint/utils';

import type {TSESLint, TSESTree} from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
    name => `https://github.com/nfqde/eslint-config-nfq/blob/master/docs/rules/${name}.md`
);

export const noEmptyLinesInTypes = createRule({
    defaultOptions: [],
    meta: {
        docs: {description: 'Disallow empty lines inside TypeScript interface and type literal bodies'},
        fixable: 'whitespace',
        messages: {noEmptyLine: 'Empty lines inside type bodies are not allowed.'},
        schema: [],
        type: 'layout'
    },
    name: 'no-empty-lines-in-types',
    /**
     * Creates an ESLint rule implementation that checks for empty lines in TypeScript type definitions.
     * This function returns a rule listener object that validates TypeScript interface bodies and type literals to ensure they don't contain unnecessary empty lines.
     * The rule helps maintain consistent formatting by preventing blank lines after opening braces, between members, and before closing braces.
     *
     * @param context The ESLint rule context containing source code and reporting utilities.
     * @returns An object containing event listeners for AST node types that need to be checked.
     *
     * @example
     * ```tsx
     * // This would trigger the rule (has empty line):
     * interface User {
     *
     *   name: string;
     * }
     *
     * // This is correct (no empty lines):
     * interface User {
     *   name: string;
     * }
     * ```
     */
    create(context) {
        const {sourceCode} = context;

        type TokenLike = TSESTree.Comment | TSESTree.Node | TSESTree.Token;
        type ListenerNode = TSESTree.Node;

        /**
         * Reports and fixes empty line gaps between tokens in TypeScript type definitions.
         * This function analyzes the text between two tokens to detect multiple consecutive newlines and reports them as violations.
         * It also provides an automatic fix by removing the extra empty lines while preserving proper indentation.
         *
         * @param node       The AST node where the violation occurs.
         * @param startToken The token that marks the beginning of the gap to check.
         * @param endToken   The token that marks the end of the gap to check.
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
         * Checks all members within a TypeScript interface or type literal block for empty line violations.
         * This function iterates through the members of a type definition and validates that there are no empty lines after the opening brace, between members, or before the closing brace.
         * It uses the reportGap function to identify and report any violations found in the spacing between type members.
         *
         * @param node    The AST node representing the interface or type literal.
         * @param members An array of type elements (properties, methods, etc.) within the type definition.
         */
        const checkBlockMembers = (node: TSESTree.Node, members: TSESTree.TypeElement[]): void => {
            const leftBrace = sourceCode.getFirstToken(node);
            const rightBrace = sourceCode.getLastToken(node);

            if (!leftBrace || !rightBrace) {
                return;
            }

            const memberItems: {end: TSESTree.Token; start: TSESTree.Token}[] = [];

            for (const member of members) {
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
             * Handles TypeScript interface body nodes to check for empty line violations.
             * This listener function is called whenever the ESLint parser encounters a TSInterfaceBody node during traversal.
             * It validates that the node type is correct and then delegates to checkBlockMembers to perform the actual empty line checking.
             *
             * @param node The AST node representing a TypeScript interface body.
             */
            TSInterfaceBody(node: ListenerNode) {
                if ((node).type !== 'TSInterfaceBody') {
                    return;
                }
                const interfaceNode = node;

                checkBlockMembers(interfaceNode, interfaceNode.body);
            },
            /**
             * Handles TypeScript type literal nodes to check for empty line violations.
             * This listener function is called whenever the ESLint parser encounters a TSTypeLiteral node during traversal.
             * It validates that the node type is correct and then delegates to checkBlockMembers to perform the actual empty line checking.
             *
             * @param node The AST node representing a TypeScript type literal.
             */
            TSTypeLiteral(node: ListenerNode) {
                if ((node).type !== 'TSTypeLiteral') {
                    return;
                }
                const typeLiteralNode = node;

                checkBlockMembers(typeLiteralNode, typeLiteralNode.members);
            }
        };

        return listeners;
    }
});