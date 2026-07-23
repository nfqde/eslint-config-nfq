import {ASTUtils} from '@typescript-eslint/utils';

import {getFunctionFromExpression, isUppercaseName} from './component-utils';
import {isHookCallee} from './hook-utils';

import type {TSESTree} from '@typescript-eslint/utils';

export type ComponentInfo = {
    functionNode: TSESTree.ArrowFunctionExpression | TSESTree.FunctionDeclaration | TSESTree.FunctionExpression;
    name: string;
};

/**
 * Collects component function information from the program body. It scans top-level statements to find uppercase-named
 * component declarations and assignments. It returns metadata for each component that matches these criteria.
 *
 * @param body The program body statements to analyze.
 * @returns A list of discovered component info objects.
 *
 * @example
 * ```tsx
 * const components = getComponentInfos(program.body);
 * ```
 */
export const getComponentInfos = (body: TSESTree.Program['body']): ComponentInfo[] => {
    const components: ComponentInfo[] = [];

    for (const statement of body) {
        if (statement.type === 'FunctionDeclaration' && isUppercaseName(statement.id.name)) {
            components.push({
                functionNode: statement,
                name: statement.id.name
            });

            continue;
        }

        if (statement.type !== 'VariableDeclaration') {
            continue;
        }

        for (const declarator of statement.declarations) {
            if (!ASTUtils.isIdentifier(declarator.id) || !declarator.init) {
                continue;
            }

            if (!isUppercaseName(declarator.id.name)) {
                continue;
            }

            const functionNode = getFunctionFromExpression(declarator.init);

            if (functionNode) {
                components.push({
                    functionNode,
                    name: declarator.id.name
                });
            }
        }
    }

    return components;
};

/**
 * Determines whether a statement contains a React hook call expression. It inspects expression statements and
 * single-variable declarations to detect calls whose callee matches hook naming rules. It returns the hook call
 * node when found and otherwise returns null.
 *
 * @param statement The statement to analyze for a hook call.
 * @returns The hook call node when present, or null when no hook call is found.
 *
 * @example
 * ```tsx
 * const hookCall = getHookCallFromStatement(statement);
 * ```
 */
export const getHookCallFromStatement = (statement: TSESTree.Statement): TSESTree.Node | null => {
    if (statement.type === 'ExpressionStatement') {
        if (statement.expression.type === 'CallExpression' && isHookCallee(statement.expression.callee)) {
            return statement.expression;
        }

        return null;
    }

    if (statement.type === 'VariableDeclaration') {
        if (statement.declarations.length !== 1) {
            return null;
        }

        const declarator = statement.declarations[0];

        if (declarator.init?.type !== 'CallExpression') {
            return null;
        }

        return isHookCallee(declarator.init.callee) ? declarator.init : null;
    }

    return null;
};

/**
 * Determines whether the provided statement represents a guard clause in a control flow.
 * It only considers `if` statements without an `else` branch and treats immediate returns as guard clauses.
 * It also supports a single-statement block that returns as a guard clause.
 *
 * @param statement The statement node to evaluate for guard clause structure.
 * @returns A boolean indicating whether the statement is a guard clause.
 *
 * @example
 * ```tsx
 * const isGuard = isGuardClause(statement);
 * ```
 */
export const isGuardClause = (statement: TSESTree.Statement) => {
    if (statement.type !== 'IfStatement' || statement.alternate) {
        return false;
    }

    if (statement.consequent.type === 'ReturnStatement') {
        return true;
    }

    if (statement.consequent.type === 'BlockStatement') {
        return statement.consequent.body.length === 1 && statement.consequent.body[0].type === 'ReturnStatement';
    }

    return false;
};

/**
 * Determines whether a statement or its immediate branches include a return statement.
 * It checks direct return statements and inspects simple if statements for returns in their consequent.
 * It does not traverse deeper nested structures beyond the immediate consequent block. This keeps the check focused
 * on top-level guard-like returns.
 *
 * @param statement The statement node to inspect for a return statement.
 * @returns True when a return statement is found in the inspected statement, otherwise false.
 *
 * @example
 * ```tsx
 * const hasReturn = hasReturnStatement(statement);
 * ```
 */
export const hasReturnStatement = (statement: TSESTree.Statement): boolean => {
    if (statement.type === 'ReturnStatement') {
        return true;
    }

    if (statement.type === 'IfStatement') {
        if (statement.consequent.type === 'ReturnStatement') {
            return true;
        }

        if (statement.consequent.type === 'BlockStatement') {
            return statement.consequent.body.some(item => item.type === 'ReturnStatement');
        }

        return false;
    }

    return false;
};