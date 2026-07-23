import {ASTUtils} from '@typescript-eslint/utils';

import type {TSESTree} from '@typescript-eslint/utils';

/**
 * Determines whether the provided callee expression represents a React-style hook call.
 * A callee is considered a hook if it is an identifier or a member expression whose
 * property name starts with `"use"`.
 *
 * @param callee The callee expression to inspect.
 * @returns `true` if the callee matches hook naming conventions; otherwise, `false`.
 */
export const isHookCallee = (callee: TSESTree.Expression): boolean => {
    if (ASTUtils.isIdentifier(callee)) {
        return callee.name.startsWith('use');
    }

    if (callee.type === 'MemberExpression' && ASTUtils.isIdentifier(callee.property)) {
        return callee.property.name.startsWith('use');
    }

    return false;
};