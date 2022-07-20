/* eslint-disable @nfq/sort-keys */
/* eslint-disable no-inline-comments */

module.exports = {
    rules: {
        'import/default': 2, // ensure default import coupled with default export https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/default.md#when-not-to-use-it
        'import/named': 2, // ensure named imports coupled with named exports https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/named.md#when-not-to-use-it
        'import/namespace': [2, {allowComputed: true}], // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/namespace.md
        'import/no-unresolved': [
            2,
            {
                caseSensitive: true,
                commonjs: true,
                ignore: ['@app/features']
            }
        ], // ensure imports point to files/modules that can be resolved https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-unresolved.md

        // Helpful warnings:
        'import/export': 2, // disallow invalid exports, e.g. multiple defaults https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/export.md
        'import/no-deprecated': 1, // disallow use of jsdoc-marked-deprecated imports https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-deprecated.md
        'import/no-extraneous-dependencies': [
            0,
            {
                devDependencies: [
                    'test/**', // tape, common npm pattern
                    'tests/**', // also common npm pattern
                    'spec/**', // mocha, rspec-like pattern
                    '**/__tests__/**', // jest pattern
                    '**/__mocks__/**', // jest pattern
                    'test.{js,jsx}', // repos with a single test file
                    'test-*.{js,jsx}', // repos with multiple top-level test files
                    '**/*{.,_}{test,spec}.{js,jsx}', // tests where the extension or filename suffix denotes that it is a test
                    '**/jest.config.js', // jest config
                    '**/jest.setup.js', // jest setup
                    '**/vue.config.js', // vue-cli config
                    '**/webpack.config.js', // webpack config
                    '**/webpack.config.*.js', // webpack config
                    '**/rollup.config.js', // rollup config
                    '**/rollup.config.*.js', // rollup config
                    '**/gulpfile.js', // gulp config
                    '**/gulpfile.*.js', // gulp config
                    '**/Gruntfile{,.js}', // grunt config
                    '**/protractor.conf.js', // protractor config
                    '**/protractor.conf.*.js', // protractor config
                    '**/karma.conf.js' // karma config
                ],
                optionalDependencies: false
            }
        ], // Forbid the use of extraneous packages https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md  paths are treated both as absolute paths, and relative to process.cwd()
        'import/no-mutable-exports': 2, // Forbid mutable exports https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-mutable-exports.md
        'import/no-named-as-default': 2, // do not allow a default import name to match a named export https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-as-default.md
        'import/no-named-as-default-member': 2, // warn on accessing default export property names that are also named exports https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-as-default-member.md
        // Module systems:
        'import/no-amd': 2, // disallow AMD require/define https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-amd.md
        'import/no-commonjs': 0, // disallow require() https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-commonjs.md
        'import/no-nodejs-modules': 0, // No Node.js builtin modules https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-nodejs-modules.md
        // Style guide:
        'import/dynamic-import-chunkname': [
            2,
            {
                importFunctions: [],
                webpackChunknameFormat: '[0-9a-zA-Z-_/.]+'
            }
        ], // dynamic imports require a leading comment with a webpackChunkName https://github.com/benmosher/eslint-plugin-import/blob/ebafcbf59ec9f653b2ac2a0156ca3bcba0a7cf57/docs/rules/dynamic-import-chunkname.md
        'import/exports-last': 0, // This rule enforces that all exports are declared at the bottom of the file. https://github.com/benmosher/eslint-plugin-import/blob/98acd6afd04dcb6920b81330114e146dc8532ea4/docs/rules/exports-last.md
        'import/extensions': [
            2,
            'never',
            {
                woff: 'always',
                woff2: 'always',
                ttf: 'always',
                eot: 'always',
                otf: 'always'
            }
        ], // Ensure consistent use of file extension within the import path https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
        'import/first': 2, // disallow non-import statements appearing before import statements https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/first.md
        'import/group-exports': 0, // Reports when named exports are not grouped together in a single export declaration or when multiple assignments to CommonJS module.exports or exports object are present in a single file. https://github.com/benmosher/eslint-plugin-import/blob/44a038c06487964394b1e15b64f3bd34e5d40cde/docs/rules/group-exports.md
        'import/max-dependencies': [1, {max: 20}], // Forbid modules to have too many dependencies https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/max-dependencies.md
        'import/newline-after-import': 2, // Require a newline after the last import/require in a group https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/newline-after-import.md
        'import/no-absolute-path': 2, // Forbid import of modules using absolute paths https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-absolute-path.md
        'import/no-anonymous-default-export': [
            0,
            {
                allowAnonymousClass: false,
                allowAnonymousFunction: false,
                allowArray: false,
                allowArrowFunction: false,
                allowLiteral: false,
                allowObject: false
            }
        ], // Reports if a module's default export is unnamed https://github.com/benmosher/eslint-plugin-import/blob/d9b712ac7fd1fddc391f7b234827925c160d956f/docs/rules/no-anonymous-default-export.md
        'import/no-cycle': [
            0,
            {maxDepth: Infinity}
        ], // Forbid cyclical dependencies between modules https://github.com/benmosher/eslint-plugin-import/blob/d81f48a2506182738409805f5272eff4d77c9348/docs/rules/no-cycle.md
        'import/no-default-export': 0, // forbid default exports. this is a terrible rule, do not use it. https://github.com/benmosher/eslint-plugin-import/blob/44a038c06487964394b1e15b64f3bd34e5d40cde/docs/rules/no-default-export.md
        'import/no-duplicates': ['error', {considerQueryString: true}], // disallow duplicate imports https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-duplicates.md
        'import/no-dynamic-require': 0, // Forbid require() calls with expressions https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-dynamic-require.md
        'import/no-internal-modules': [0, {allow: []}], // prevent importing the submodules of other modules https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-internal-modules.md
        'import/no-named-default': 2, // Prevent importing the default as if it were named https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-default.md
        'import/no-named-export': 0, // Prohibit named exports. this is a terrible rule, do not use it. https://github.com/benmosher/eslint-plugin-import/blob/1ec80fa35fa1819e2d35a70e68fb6a149fb57c5e/docs/rules/no-named-export.md
        'import/no-namespace': 0, // disallow namespace imports https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-namespace.md
        'import/no-relative-parent-imports': 0, // Use this rule to prevent imports to folders in relative parent paths. https://github.com/benmosher/eslint-plugin-import/blob/c34f14f67f077acd5a61b3da9c0b0de298d20059/docs/rules/no-relative-parent-imports.md
        'import/no-restricted-paths': 0, // Restrict which files can be imported in a given folder https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-restricted-paths.md
        'import/no-self-import': 2, // Forbid a module from importing itself https://github.com/benmosher/eslint-plugin-import/blob/44a038c06487964394b1e15b64f3bd34e5d40cde/docs/rules/no-self-import.md
        'import/no-unassigned-import': 0, // Prevent unassigned imports https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-unassigned-import.md importing for side effects is perfectly acceptable, if you need side effects.
        'import/no-unused-modules': [
            0,
            {
                ignoreExports: [],
                missingExports: true,
                unusedExports: true
            }
        ], // Reports modules without any exports, or with unused exports https://github.com/benmosher/eslint-plugin-import/blob/f63dd261809de6883b13b6b5b960e6d7f42a7813/docs/rules/no-unused-modules.md
        'import/no-useless-path-segments': [2, {commonjs: true}], // Ensures that there are no useless path segments https://github.com/benmosher/eslint-plugin-import/blob/ebafcbf59ec9f653b2ac2a0156ca3bcba0a7cf57/docs/rules/no-useless-path-segments.md
        'import/no-webpack-loader-syntax': 2, // Forbid Webpack loader syntax in imports https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-webpack-loader-syntax.md
        'import/order': [
            2,
            {
                alphabetize: {
                    caseInsensitive: true,
                    order: 'asc'
                },
                groups: ['builtin', 'external', 'parent', 'internal', 'sibling', 'type'],
                'newlines-between': 'always',
                pathGroups: [
                    {
                        group: 'external',
                        pattern: 'react',
                        position: 'before'
                    },
                    {
                        group: 'external',
                        pattern: 'react-dom',
                        position: 'before'
                    },
                    {
                        group: 'parent',
                        pattern: '**/classes/**'
                    },
                    {
                        group: 'parent',
                        pattern: 'Classes/**'
                    },
                    {
                        group: 'parent',
                        pattern: '**/screens/**'
                    },
                    {
                        group: 'parent',
                        pattern: 'Screens/**'
                    },
                    {
                        group: 'parent',
                        pattern: '**/containers/**'
                    },
                    {
                        group: 'parent',
                        pattern: 'Containers/**'
                    },
                    {
                        group: 'parent',
                        pattern: '**/components/**'
                    },
                    {
                        group: 'parent',
                        pattern: 'Components/**'
                    },
                    {
                        group: 'parent',
                        pattern: '**/stores/**'
                    },
                    {
                        group: 'parent',
                        pattern: 'Stores/**'
                    },
                    {
                        group: 'sibling',
                        pattern: '**/utils/**'
                    },
                    {
                        group: 'sibling',
                        pattern: 'Utils/**'
                    },
                    {
                        group: 'sibling',
                        pattern: '**/configs/**'
                    },
                    {
                        group: 'sibling',
                        pattern: 'Configs'
                    },
                    {
                        group: 'sibling',
                        pattern: '**/fonts/**'
                    },
                    {
                        group: 'sibling',
                        pattern: 'Fonts/**'
                    },
                    {
                        group: 'sibling',
                        pattern: '**/images/**'
                    },
                    {
                        group: 'sibling',
                        pattern: 'Images/**'
                    }
                ],
                pathGroupsExcludedImportTypes: ['react', 'react-dom']
            }
        ], // ensure absolute imports are above relative imports and that unassigned imports are ignored https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md
        'import/prefer-default-export': 0, // Require modules with a single export to use a default export https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/prefer-default-export.md
        'import/unambiguous': 0 // Warn if a module could be mistakenly parsed as a script by a consumer leveraging Unambiguous JavaScript Grammar https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/unambiguous.md At the moment, it's not a thing.
    }
};