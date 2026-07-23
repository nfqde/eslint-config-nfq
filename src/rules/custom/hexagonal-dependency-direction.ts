import {ESLintUtils} from '@typescript-eslint/utils';

import {
    buildAliasMap,
    getLayer,
    isClientLayer,
    isClientUtils,
    isConfigLayer,
    isDomainLayer,
    isMobxStoreFile,
    isServerLayer,
    isServerUtils,
    normalizePath,
    readAliasesFromSettings,
    resolveAliasImport,
    resolveRelativeImport
} from './utils/hexagonal-dependency-direction-utils';

import type {TSESLint, TSESTree} from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
    name => `https://github.com/nfqde/eslint-config-nfq/blob/master/docs/rules/${name}.md`
);

type RuleOptions = [];

type MessageIds = 'apiImport' | 'clientApiImport' | 'crossBoundary' | 'domainImport' | 'domainUtilsImport'
    | 'missingServiceClass' | 'missingServiceImplements' | 'serverDirection' | 'uiApplicationImport';

const requiredAliases = [
    'Domain',
    'Application',
    'UI',
    'ApiRoutes',
    'Controllers',
    'ServerDomain',
    'Services'
];

export const hexagonalDependencyDirection = createRule<RuleOptions, MessageIds>({
    defaultOptions: [],
    meta: {
        docs: {description: 'Enforce hexagonal dependency direction and boundary imports.'},
        messages: {
            apiImport: 'API routes may only import controllers, middleware, or server utils.',
            clientApiImport: 'Only client application services may import API routes.',
            crossBoundary: 'Client and server layers must not import from each other.',
            domainImport: 'Domain layers must not import from other layers.',
            domainUtilsImport: 'Domain layers must not import from utils.',
            missingServiceClass: 'Client services must export a class implementing an adapter interface.',
            missingServiceImplements: 'Client services classes must implement an adapter interface.',
            serverDirection: 'Server dependency direction is domain → errors → services → controllers.',
            uiApplicationImport: 'UI may only import from UI, shared, domain, or application useCases/configs/utils.'
        },
        schema: [],
        type: 'problem'
    },
    name: 'hexagonal-dependency-direction',
    /**
     * This function creates the ESLint rule listeners for validating hexagonal dependency direction.
     * It initializes alias resolution, determines the current file layer, and wires up import checks.
     * It also validates service class exports and adapter implementations for client services.
     *
     * @param context The rule context used for reporting and settings.
     * @returns A rule listener map for import declarations and program validation.
     *
     * @example
     * ```tsx
     * const rule = hexagonalDependencyDirection.create(context);
     * ```
     */
    // eslint-disable-next-line max-lines-per-function
    create(context) {
        const aliases = readAliasesFromSettings(context.settings);
        const aliasMap = buildAliasMap(aliases);

        const missing = requiredAliases.filter(alias => !aliasMap.has(alias));

        if (missing.length > 0) {
            return {};
        }

        const {filename} = context;
        const normalizedFile = normalizePath(filename);
        const currentLayer = getLayer(normalizedFile);

        if (currentLayer === 'unknown') {
            return {};
        }

        const isClient = isClientLayer(currentLayer);
        const isServer = isServerLayer(currentLayer);

        /**
         * This function validates that client application services export at least one class and that the class
         * implements an adapter interface. It scans the program body for class declarations and named exports
         * containing classes. It reports rule violations when no class is found or when a class lacks implemented
         * interfaces.
         *
         * @param program The program node to analyze for service class exports.
         *
         * @example
         * ```tsx
         * reportInvalidService(program);
         * ```
         */
        const reportInvalidService = (program: TSESTree.Program) => {
            if (currentLayer !== 'client-application-services') {
                return;
            }

            if (isMobxStoreFile(program)) {
                return;
            }

            const classes: (TSESTree.ClassDeclaration | TSESTree.ClassExpression)[] = [];

            for (const node of program.body) {
                // @ts-expect-error
                if (node.type === 'ClassDeclaration' || node.type === 'ClassExpression') {
                    classes.push(node);
                    continue;
                }

                if (node.type === 'ExportNamedDeclaration' && node.declaration) {
                    const {declaration} = node;

                    // @ts-expect-error
                    if (declaration.type === 'ClassDeclaration' || declaration.type === 'ClassExpression') {
                        classes.push(declaration);
                    }
                }
            }

            if (classes.length === 0) {
                context.report({
                    messageId: 'missingServiceClass',
                    node: program
                });

                return;
            }

            for (const classNode of classes) {
                if (classNode.implements.length === 0) {
                    context.report({
                        messageId: 'missingServiceImplements',
                        node: classNode
                    });
                }
            }
        };

        /**
         * Resolves an import source to a normalized path using aliases and relative paths. It first attempts to match
         * the source against configured aliases to ensure project-wide consistency. If no alias applies, it falls back
         * to resolving a relative import against the current file for local references.
         *
         * @param source The raw import source string from the import declaration.
         * @returns The resolved path string when resolution succeeds, or undefined when it cannot be resolved.
         *
         * @example
         * ```tsx
         * const resolved = resolveImport('@app/domain');
         * ```
         */
        const resolveImport = (source: string) => {
            const aliasResolved = resolveAliasImport(source, aliasMap);

            if (aliasResolved) {
                return aliasResolved;
            }

            return resolveRelativeImport(source, filename);
        };

        /**
         * Validates an import declaration against the hexagonal dependency rules for the current file.
         * It resolves the import source into a target layer and checks for forbidden cross-boundary or layer-specific dependencies.
         * It reports violations using the configured ESLint messages when a rule is broken.
         *
         * @param node The import declaration node to validate.
         *
         * @example
         * ```tsx
         * checkImport(node);
         * ```
         */
        // eslint-disable-next-line complexity
        const checkImport = (node: TSESTree.ImportDeclaration) => {
            const source = node.source.value;

            if (typeof source !== 'string') {
                return;
            }

            const resolved = resolveImport(source);

            if (!resolved) {
                return;
            }

            const targetLayer = getLayer(resolved);

            if (targetLayer === 'unknown') {
                return;
            }

            if (isClient && isServerLayer(targetLayer)) {
                context.report({
                    messageId: 'crossBoundary',
                    node
                });

                return;
            }

            if (isServer && isClientLayer(targetLayer)) {
                context.report({
                    messageId: 'crossBoundary',
                    node
                });

                return;
            }

            if (currentLayer === 'api') {
                const allowed = targetLayer === 'server-controllers'
                    || targetLayer === 'server-middleware'
                    || targetLayer === 'server-utils';

                if (!allowed) {
                    context.report({
                        messageId: 'apiImport',
                        node
                    });
                }

                return;
            }

            if (targetLayer === 'api' && currentLayer !== 'client-application-services') {
                context.report({
                    messageId: 'clientApiImport',
                    node
                });

                return;
            }

            if (isDomainLayer(currentLayer)) {
                if (targetLayer === 'client-shared' || targetLayer === 'server-configs') {
                    return;
                }

                if (isConfigLayer(targetLayer)) {
                    return;
                }

                if (isClientUtils(targetLayer) || isServerUtils(targetLayer)) {
                    context.report({
                        messageId: 'domainUtilsImport',
                        node
                    });

                    return;
                }

                if (targetLayer !== currentLayer) {
                    context.report({
                        messageId: 'domainImport',
                        node
                    });
                }

                return;
            }

            if (currentLayer === 'client-application' || currentLayer === 'client-application-configs'
                || currentLayer === 'client-application-services'
                || currentLayer === 'client-application-usecases'
                || currentLayer === 'client-application-utils') {
                if (targetLayer === 'client-shared') {
                    return;
                }

                if (targetLayer === 'client-ui') {
                    if (currentLayer === 'client-application-configs') {
                        return;
                    }

                    context.report({
                        messageId: 'crossBoundary',
                        node
                    });
                }

                return;
            }

            if (currentLayer === 'client-ui') {
                const allowed = targetLayer === 'client-ui'
                    || targetLayer === 'client-shared'
                    || targetLayer === 'client-domain'
                    || targetLayer === 'client-application-configs'
                    || targetLayer === 'client-application-usecases'
                    || targetLayer === 'client-application-utils';

                if (!allowed) {
                    context.report({
                        messageId: 'uiApplicationImport',
                        node
                    });
                }

                return;
            }

            if (currentLayer === 'server-errors') {
                const allowed = targetLayer === 'server-errors'
                    || targetLayer === 'server-domain'
                    || targetLayer === 'server-configs';

                if (!allowed) {
                    context.report({
                        messageId: 'serverDirection',
                        node
                    });
                }

                return;
            }

            if (currentLayer === 'server-services') {
                const allowed = targetLayer === 'server-services'
                    || targetLayer === 'server-domain'
                    || targetLayer === 'server-errors'
                    || targetLayer === 'server-utils'
                    || targetLayer === 'server-configs';

                if (!allowed) {
                    context.report({
                        messageId: 'serverDirection',
                        node
                    });
                }

                return;
            }

            if (currentLayer === 'server-controllers') {
                const allowed = targetLayer === 'server-controllers'
                    || targetLayer === 'server-domain'
                    || targetLayer === 'server-errors'
                    || targetLayer === 'server-services'
                    || targetLayer === 'server-utils'
                    || targetLayer === 'server-middleware'
                    || targetLayer === 'server-configs';

                if (!allowed) {
                    context.report({
                        messageId: 'serverDirection',
                        node
                    });
                }
            }
        };

        return {
            ImportDeclaration: checkImport,
            /**
             * Inspects constructor method definitions to detect assignments where a class method
             * is bound to `this` via `.bind(this)`, and reports such bindings for further handling.
             * This listener is triggered for the entire program to validate service class exports and adapter implementations
             * for client application services. It ensures that the hexagonal architecture rules are enforced at the program level.
             *
             * @param program The program node to analyze for service class export and implementation validation.
             */
            Program(program) {
                reportInvalidService(program);
            }
        } satisfies TSESLint.RuleListener;
    }
});