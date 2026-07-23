import {ESLintUtils} from '@typescript-eslint/utils';

import {
    getComponentInfos,
    getHookCallFromStatement,
    hasReturnStatement,
    isGuardClause
} from './utils/component-single-hook-utils';

import type {TSESLint} from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
    name => `https://github.com/nfqde/eslint-config-nfq/blob/master/docs/rules/${name}.md`
);

type MessageIds = 'invalidStatement' | 'tooManyHooks';

export const componentSingleHook = createRule<[], MessageIds>({
    defaultOptions: [],
    meta: {
        docs: {description: 'Enforce a single hook call and minimal component bodies.'},
        messages: {
            invalidStatement: 'Only a single hook call, guard clauses, and return statements are allowed.',
            tooManyHooks: 'Only a single hook call is allowed in the component body.'
        },
        schema: [],
        type: 'suggestion'
    },
    name: 'component-single-hook',
    /**
     * Creates the rule listener for validating component bodies that should contain only one hook call.
     * It inspects component bodies, counts hook calls, and reports invalid statements or excessive hooks.
     * It also skips components without return statements and non-block bodies to avoid false positives.
     *
     * @param context The ESLint rule context providing source code and reporting utilities.
     * @returns A rule listener that validates component statement structure.
     *
     * @example
     * ```tsx
     * create(context);
     * ```
     */
    create(context) {
        const filename = context.getFilename();
        const filenameLower = filename.toLowerCase();

        if (!filenameLower.endsWith('.tsx') && !filenameLower.endsWith('.jsx')) {
            return {};
        }

        const {sourceCode} = context;
        const componentInfos = getComponentInfos(sourceCode.ast.body);

        if (componentInfos.length === 0) {
            return {};
        }

        return {
            /**
             * Iterates over discovered component infos and validates each component body. It skips components without
             * block bodies or without return statements to reduce false positives. It enforces a single hook call
             * while allowing guard clauses and return statements.
             *
             * @example
             * ```tsx
             * Program();
             * ```
             */
            Program() {
                for (const component of componentInfos) {
                    const {functionNode} = component;

                    if (functionNode.body.type !== 'BlockStatement') {
                        continue;
                    }

                    const statements = functionNode.body.body;
                    const hasReturn = statements.some(hasReturnStatement);

                    if (!hasReturn) {
                        continue;
                    }

                    let hookCount = 0;

                    for (const statement of statements) {
                        if (statement.type === 'ReturnStatement') {
                            continue;
                        }

                        if (isGuardClause(statement)) {
                            continue;
                        }

                        const hookCall = getHookCallFromStatement(statement);

                        if (hookCall) {
                            hookCount += 1;

                            if (hookCount > 1) {
                                context.report({
                                    messageId: 'tooManyHooks',
                                    node: statement
                                });
                            }

                            continue;
                        }

                        context.report({
                            messageId: 'invalidStatement',
                            node: statement
                        });
                    }
                }
            }
        } as TSESLint.RuleListener;
    }
});