import path from 'path';

import {ASTUtils} from '@typescript-eslint/utils';

import type {TSESTree} from '@typescript-eslint/utils';

export type LayerType = 'api' | 'client-application-configs' | 'client-application-services'
    | 'client-application-usecases' | 'client-application-utils' | 'client-application' | 'client-domain'
    | 'client-shared' | 'client-ui' | 'server-configs' | 'server-controllers' | 'server-domain' | 'server-errors'
    | 'server-middleware' | 'server-services' | 'server-utils' | 'unknown';

/**
 * Converts Windows-style backslashes to POSIX forward slashes in a path string. It ensures the returned path is
 * consistent for later normalization routines. It does not attempt to resolve or validate the path contents.
 *
 * @param   value The path string that may contain backslashes.
 * @returns The path string with backslashes replaced by forward slashes.
 *
 * @remarks This is a simple string transformation helper.
 *
 * @example
 * ```tsx
 * const posixPath = toPosix('C:\\temp\\file.txt');
 * ```
 */
export const toPosix = (value: string) => value.replace(/\\/gu, '/');

/**
 * Removes a Windows drive letter prefix from a path string. It is useful when normalizing paths across platforms.
 * It leaves non-drive paths unchanged.
 *
 * @param   value The path string that may include a drive letter.
 * @returns The path string without a drive letter prefix.
 *
 * @remarks This keeps the remaining path intact.
 *
 * @example
 * ```tsx
 * const pathWithoutDrive = stripDrive('C:/temp/file.txt');
 * ```
 */
export const stripDrive = (value: string) => value.replace(/^[A-Za-z]:/u, '');

/**
 * Normalizes a path to POSIX format and strips drive letters for consistency.
 * It also handles virtual path segments produced by certain tooling. It returns a stable, comparable path
 * string for layer detection.
 *
 * @param   value The path string to normalize.
 * @returns The normalized path without drive letters and virtual prefixes.
 *
 * @remarks This function is intended for cross-platform path comparisons.
 *
 * @example
 * ```tsx
 * const normalized = normalizePath('C:\\proj\\__virtual__\\src\\index.ts');
 * ```
 */
export const normalizePath = (value: string) => {
    const normalized = path.posix.normalize(toPosix(value));
    const withoutDrive = stripDrive(normalized);

    if (withoutDrive.startsWith('/__virtual__/')) {
        return withoutDrive.replace('/__virtual__/', '/');
    }

    return withoutDrive;
};

/**
 * Ensures a path string ends with a trailing slash. It is used to simplify prefix comparisons.
 * It does not modify already-suffixed paths.
 *
 * @param   value The path string that may need a trailing slash.
 * @returns The path string guaranteed to end with a trailing slash.
 *
 * @remarks This is a pure helper without side effects.
 *
 * @example
 * ```tsx
 * const withSlash = ensureTrailingSlash('/src/client');
 * ```
 */
export const ensureTrailingSlash = (value: string) => (
    value.endsWith('/') ? value : `${value}/`
);

/**
 * Builds a map of alias strings to normalized target paths. It skips invalid entries and ensures stored paths end
 * with a trailing slash. It returns a Map that can be used for import resolution.
 *
 * @param   aliases The alias tuples to include in the map.
 * @returns A map of alias keys to normalized, trailing-slashed paths.
 *
 * @remarks Invalid alias pairs are ignored.
 *
 * @example
 * ```tsx
 * const aliasMap = buildAliasMap([['@app', './src']]);
 * ```
 */
export const buildAliasMap = (aliases: ([string, string])[]): Map<string, string> => {
    const map = new Map<string, string>();

    for (const [alias, aliasPath] of aliases) {
        if (!alias || !aliasPath) {
            continue;
        }

        map.set(alias, ensureTrailingSlash(normalizePath(aliasPath)));
    }

    return map;
};

/**
 * Reads alias mappings from the ESLint settings object. It safely navigates optional resolver settings and returns a
 * normalized list of alias tuples. It always returns an array, even when settings are missing.
 *
 * @param   settings The ESLint settings object that may include import resolver configuration.
 * @returns The alias tuple list extracted from the resolver settings or an empty array.
 *
 * @remarks This helper only inspects the alias resolver configuration.
 *
 * @example
 * ```tsx
 * const aliases = readAliasesFromSettings({ 'import/resolver': { alias: { map: [['@app', './src']] } } });
 * ```
 */
export const readAliasesFromSettings = (settings: Record<string, unknown> | undefined): ([string, string])[] => {
    const resolver = settings?.['import/resolver'] as {alias?: {map?: ([string, string])[]}} | undefined;

    return resolver?.alias?.map ?? [];
};

/**
 * Resolves an import source using a prebuilt alias map. It checks for exact alias matches as well as alias-prefixed
 * paths. It returns the resolved path string or null when no alias applies.
 *
 * @param   source   The import source string to resolve.
 * @param   aliasMap The map of alias keys to normalized target paths.
 * @returns The resolved path string if an alias matches, or null when no match is found.
 *
 * @remarks The alias map is expected to store trailing-slashed paths.
 *
 * @example
 * ```tsx
 * const resolved = resolveAliasImport('@app/utils', new Map([['@app', '/src/']]));
 * ```
 */
export const resolveAliasImport = (source: string, aliasMap: Map<string, string>) => {
    for (const [alias, aliasPath] of aliasMap.entries()) {
        if (source === alias) {
            return aliasPath;
        }

        if (source.startsWith(`${alias}/`)) {
            return aliasPath + source.slice(alias.length + 1);
        }
    }

    return null;
};

/**
 * Resolves a relative import to an absolute, normalized path. It only handles sources that start with a dot and
 * returns null for non-relative sources. It normalizes the file and joined path for consistent comparisons.
 *
 * @param   source   The import source string to resolve.
 * @param   filename The file path that contains the import statement.
 * @returns The normalized resolved path or null when the source is not relative.
 *
 * @remarks This helper uses POSIX joins to keep results stable across platforms.
 *
 * @example
 * ```tsx
 * const resolved = resolveRelativeImport('./utils', '/src/client/index.ts');
 * ```
 */
export const resolveRelativeImport = (source: string, filename: string) => {
    if (!source.startsWith('.')) {
        return null;
    }

    const normalizedFile = normalizePath(filename);
    const dir = normalizedFile.split('/').slice(0, -1).join('/');

    return normalizePath(path.posix.join(dir, source));
};

/**
 * Determines the logical layer for a resolved file path based on known hexagonal folder patterns. It normalizes the
 * input path and performs ordered checks to match specific client, server, or API directories. It returns a stable
 * layer identifier so callers can apply dependency direction rules consistently.
 *
 * @param   resolvedPath The resolved file path to analyze.
 * @returns The detected layer identifier or `unknown` when no match is found.
 *
 * @remarks The checks are order-dependent, so more specific paths are evaluated first.
 *
 * @example
 * ```tsx
 * const layer = getLayer('/src/server/services/user.ts');
 * ```
 */
export const getLayer = (resolvedPath: string): LayerType => {
    const pathValue = ensureTrailingSlash(normalizePath(resolvedPath));
    const pathWithSlash = pathValue.startsWith('/') ? pathValue : `/${pathValue}`;

    /**
     * Determines whether a given value is contained in either the raw path or the
     * normalized path with a trailing slash.
     *
     * @param value The substring to search for in the path variants.
     * @returns `true` if the value exists in either path representation; otherwise `false`.
     */
    const contains = (value: string) => pathValue.includes(value) || pathWithSlash.includes(value);

    if (contains('/src/pages/api/')) {
        return 'api';
    }

    if (contains('/src/client/application/configs/')) {
        return 'client-application-configs';
    }

    if (contains('/src/client/application/useCases/')) {
        return 'client-application-usecases';
    }

    if (contains('/src/client/application/services/')) {
        return 'client-application-services';
    }

    if (contains('/src/client/application/utils/')) {
        return 'client-application-utils';
    }

    if (contains('/src/client/application/')) {
        return 'client-application';
    }

    if (contains('/src/client/domain/')) {
        return 'client-domain';
    }

    if (contains('/src/client/shared/')) {
        return 'client-shared';
    }

    if (contains('/src/client/ui/')) {
        return 'client-ui';
    }

    if (contains('/src/server/configs/')) {
        return 'server-configs';
    }

    if (contains('/src/server/controllers/')) {
        return 'server-controllers';
    }

    if (contains('/src/server/domain/')) {
        return 'server-domain';
    }

    if (contains('/src/server/errors/')) {
        return 'server-errors';
    }

    if (contains('/src/server/middleware/')) {
        return 'server-middleware';
    }

    if (contains('/src/server/services/')) {
        return 'server-services';
    }

    if (contains('/src/server/utils/')) {
        return 'server-utils';
    }

    return 'unknown';
};

/**
 * Determines whether a layer identifier represents any client-facing layer. It relies on the `client-` prefix
 * convention used across the layer taxonomy. It returns a boolean that can be used to branch dependency rules.
 *
 * @param   layer The layer identifier to evaluate.
 * @returns True when the layer starts with the client prefix; otherwise false.
 *
 * @remarks This helper performs a simple prefix check.
 *
 * @example
 * ```tsx
 * const isClient = isClientLayer('client-ui');
 * ```
 */
export const isClientLayer = (layer: LayerType) => layer.startsWith('client-');

/**
 * Determines whether a layer identifier represents any server-facing layer. It relies on the `server-` prefix
 * convention used across the layer taxonomy. It returns a boolean that can be used to branch dependency rules.
 *
 * @param   layer The layer identifier to evaluate.
 * @returns True when the layer starts with the server prefix; otherwise false.
 *
 * @remarks This helper performs a simple prefix check.
 *
 * @example
 * ```tsx
 * const isServer = isServerLayer('server-services');
 * ```
 */
export const isServerLayer = (layer: LayerType) => layer.startsWith('server-');

/**
 * Determines whether a layer identifier represents a domain layer on either client or server. It checks for the
 * exact domain layer names defined in the layer taxonomy. It returns a boolean that can be used to enforce
 * domain-centric dependency rules.
 *
 * @param   layer The layer identifier to evaluate.
 * @returns True when the layer is a client or server domain layer; otherwise false.
 *
 * @remarks This helper uses exact equality checks.
 *
 * @example
 * ```tsx
 * const isDomain = isDomainLayer('server-domain');
 * ```
 */
export const isDomainLayer = (layer: LayerType) => layer === 'client-domain' || layer === 'server-domain';

/**
 * Determines whether a layer identifier represents the client application utilities layer. It compares the input
 * to the exact client utilities layer name. It returns a boolean suitable for applying utility-specific rules.
 *
 * @param   layer The layer identifier to evaluate.
 * @returns True when the layer is the client application utilities layer; otherwise false.
 *
 * @remarks This helper uses an exact match.
 *
 * @example
 * ```tsx
 * const isUtils = isClientUtils('client-application-utils');
 * ```
 */
export const isClientUtils = (layer: LayerType) => layer === 'client-application-utils';

/**
 * Determines whether a layer identifier represents the server utilities layer. It compares the input to the exact
 * server utilities layer name. It returns a boolean suitable for applying utility-specific rules.
 *
 * @param   layer The layer identifier to evaluate.
 * @returns True when the layer is the server utilities layer; otherwise false.
 *
 * @remarks This helper uses an exact match.
 *
 * @example
 * ```tsx
 * const isUtils = isServerUtils('server-utils');
 * ```
 */
export const isServerUtils = (layer: LayerType) => layer === 'server-utils';

/**
 * Determines whether a layer identifier represents a configuration layer. It checks for both client application
 * configs and server configs as defined by the layer taxonomy. It returns a boolean useful for config-specific
 * dependency direction checks.
 *
 * @param   layer The layer identifier to evaluate.
 * @returns True when the layer is a client application configs or server configs layer; otherwise false.
 *
 * @remarks This helper uses exact equality checks.
 *
 * @example
 * ```tsx
 * const isConfig = isConfigLayer('server-configs');
 * ```
 */
export const isConfigLayer = (layer: LayerType) => layer === 'client-application-configs' || layer === 'server-configs';

/**
 * Determines whether a program uses MobX makeAutoObservable in imports and call sites. It scans for the MobX import
 * specifier and then traverses the AST to detect usages of the identifier. It returns true only when both the import
 * and at least one invocation exist in the same program.
 *
 * @param   program The TypeScript ESTree program to analyze.
 * @returns True when makeAutoObservable is imported from MobX and invoked in the program.
 *
 * @remarks This helper performs a shallow import scan and a full AST traversal.
 *
 * @example
 * ```tsx
 * const usesMobx = isMobxStoreFile(program);
 * ```
 */
// eslint-disable-next-line complexity
export const isMobxStoreFile = (program: TSESTree.Program) => {
    let hasMakeAutoObservable = false;
    let usesMakeAutoObservable = false;

    for (const statement of program.body) {
        if (statement.type === 'ImportDeclaration' && statement.source.value === 'mobx') {
            for (const specifier of statement.specifiers) {
                if (
                    specifier.type === 'ImportSpecifier'
                    && specifier.imported.type === 'Identifier'
                    && specifier.imported.name === 'makeAutoObservable'
                ) {
                    hasMakeAutoObservable = true;
                }
            }
        }
    }

    const stack: TSESTree.Node[] = Array.from(program.body);

    while (stack.length) {
        const node = stack.pop()!;

        if (node.type === 'CallExpression' && ASTUtils.isIdentifier(node.callee)) {
            if (node.callee.name === 'makeAutoObservable') {
                usesMakeAutoObservable = true;
            }
        }

        for (const key of Object.keys(node) as (keyof TSESTree.Node)[]) {
            if (key === 'parent') {
                continue;
            }

            const value = node[key];

            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if (!value || typeof value !== 'object') {
                continue;
            }

            if (Array.isArray(value)) {
                for (const child of value) {
                    if (child && typeof child === 'object' && 'type' in child) {
                        stack.push(child as TSESTree.Node);
                    }
                }
            } else if ('type' in value) {
                stack.push(value as unknown as TSESTree.Node);
            }
        }
    }

    return hasMakeAutoObservable && usesMakeAutoObservable;
};