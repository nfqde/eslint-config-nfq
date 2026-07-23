/* eslint-disable no-inline-comments */
export const importRules = {
    'import/default': 2,
    'import/dynamic-import-chunkname': [
        2,
        {
            importFunctions: [],
            webpackChunknameFormat: '[0-9a-zA-Z-_/.]+'
        }
    ],
    'import/export': 2,
    'import/exports-last': 0,
    'import/extensions': [
        2,
        'never',
        {
            eot: 'always',
            otf: 'always',
            ttf: 'always',
            woff: 'always',
            woff2: 'always'
        }
    ],
    'import/first': 2,
    'import/group-exports': 0,
    'import/max-dependencies': [
        1,
        {
            ignoreTypeImports: true,
            max: 20
        }
    ],
    'import/named': 2,
    'import/namespace': [2, {allowComputed: true}],
    'import/newline-after-import': 2,
    'import/no-absolute-path': 2,
    'import/no-amd': 2,
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
    ],
    'import/no-commonjs': 0,
    'import/no-cycle': [
        0,
        {maxDepth: Infinity}
    ],
    'import/no-default-export': 0,
    'import/no-deprecated': 1,
    'import/no-duplicates': ['error', {considerQueryString: true}],
    'import/no-dynamic-require': 0,
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
    ],
    'import/no-internal-modules': [0, {allow: []}],
    'import/no-mutable-exports': 2,
    'import/no-named-as-default': 2,
    'import/no-named-as-default-member': 2,
    'import/no-named-default': 2,
    'import/no-named-export': 0,
    'import/no-namespace': 0,
    'import/no-nodejs-modules': 0,
    'import/no-relative-parent-imports': 0,
    'import/no-restricted-paths': 0,
    'import/no-self-import': 2,
    'import/no-unassigned-import': 0,
    'import/no-unresolved': [
        2,
        {
            caseSensitive: true,
            caseSensitiveStrict: false,
            commonjs: true,
            ignore: ['@app/features'],
        }
    ],
    'import/no-unused-modules': [
        0,
        {
            ignoreExports: [],
            missingExports: true,
            unusedExports: true
        }
    ],
    'import/no-useless-path-segments': [2, {commonjs: true}],
    'import/no-webpack-loader-syntax': 2,
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
    ],
    'import/prefer-default-export': 0,
    'import/unambiguous': 0
};