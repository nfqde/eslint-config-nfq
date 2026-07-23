import * as astUtils from './ast-utils';

import type {TSESTree} from '@typescript-eslint/utils';

/**
 * Retrieves the property name from a property node when it can be determined statically.
 * It first checks for a static name using the AST utilities and returns it when available.
 * It falls back to reading the identifier name from the key and returns null when no name can be resolved.
 *
 * @param node The property node to inspect for a name.
 * @returns The resolved property name or null if it cannot be determined.
 *
 * @example
 * ```tsx
 * const name = getPropertyName(propertyNode);
 * ```
 */
export const getPropertyName = (node: TSESTree.Property): string | null => {
    const staticName = astUtils.getStaticPropertyName(node);

    if (staticName !== null) {
        return staticName;
    }

    if (typeof node.key === 'undefined') {
        return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return (node.key as TSESTree.Identifier).name ?? null;
};