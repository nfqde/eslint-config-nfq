/* eslint-disable no-inline-comments */
module.exports = {
    rules: {
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/array-type': ['error', {default: 'array'}],
        '@typescript-eslint/brace-style': ['error', '1tbs', {allowSingleLine: false}],
        '@typescript-eslint/class-literal-property-style': 'error',
        '@typescript-eslint/comma-dangle': ['error', 'never'],
        '@typescript-eslint/comma-spacing': [
            'error',
            {
                after: true,
                before: false
            }
        ],
        '@typescript-eslint/consistent-generic-constructors': ['error', 'constructor'],
        '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
        '@typescript-eslint/consistent-type-assertions': ['error', {assertionStyle: 'as'}],
        '@typescript-eslint/consistent-type-definitions': 'off',
        '@typescript-eslint/consistent-type-exports': 'error',
        '@typescript-eslint/consistent-type-imports': [
            'error',
            {
                disallowTypeAnnotations: true,
                prefer: 'type-imports'
            }
        ],
        '@typescript-eslint/default-param-last': 'error',
        '@typescript-eslint/dot-notation': ['error', {allowKeywords: true}],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-member-accessibility': ['error', {accessibility: 'no-public'}],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/func-call-spacing': ['error', 'never'],
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/init-declarations': 'off',
        '@typescript-eslint/keyword-spacing': [
            'error',
            {
                after: true,
                before: true
            }
        ],
        '@typescript-eslint/lines-between-class-members': [
            'error',
            'always',
            {exceptAfterSingleLine: false}
        ],
        '@typescript-eslint/member-delimiter-style': [
            'error',
            {
                multiline: {
                    delimiter: 'semi',
                    requireLast: true
                },
                multilineDetection: 'brackets',
                singleline: {
                    delimiter: 'semi',
                    requireLast: false
                }
            }
        ],
        '@typescript-eslint/member-ordering': [
            'error',
            {
                default: {order: 'as-written'},
                interfaces: {order: 'alphabetically-case-insensitive'},
                typeLiterals: {order: 'alphabetically-case-insensitive'}
            }
        ],
        '@typescript-eslint/method-signature-style': ['error', 'method'],
        '@typescript-eslint/no-array-constructor': 'error',
        '@typescript-eslint/no-base-to-string': 'error',
        '@typescript-eslint/no-confusing-non-null-assertion': 'warn',
        '@typescript-eslint/no-confusing-void-expression': 'off',
        '@typescript-eslint/no-dupe-class-members': 'error',
        '@typescript-eslint/no-duplicate-enum-values': 'warn',
        '@typescript-eslint/no-dynamic-delete': 'off',
        '@typescript-eslint/no-empty-function': ['error', {allow: ['arrowFunctions', 'methods', 'asyncMethods']}],
        '@typescript-eslint/no-empty-interface': 'error',
        '@typescript-eslint/no-empty-object-type': 'error',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-extra-non-null-assertion': 'error',
        '@typescript-eslint/no-extra-semi': 'error',
        '@typescript-eslint/no-extraneous-class': 'off',
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/no-for-in-array': 'error',
        '@typescript-eslint/no-implied-eval': 'error',
        '@typescript-eslint/no-inferrable-types': 'error',
        '@typescript-eslint/no-invalid-this': 'error',
        '@typescript-eslint/no-invalid-void-type': 'off',
        '@typescript-eslint/no-loop-func': 'error',
        '@typescript-eslint/no-loss-of-precision': 'error',
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-misused-promises': ['error', {checksVoidReturn: false}],
        '@typescript-eslint/no-namespace': [
            'error',
            {
                allowDeclarations: true,
                allowDefinitionFiles: true
            }
        ],
        '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-redeclare': 'error',
        '@typescript-eslint/no-redundant-type-constituents': 'warn',
        '@typescript-eslint/no-require-imports': 'warn',
        '@typescript-eslint/no-shadow': 'error',
        '@typescript-eslint/no-this-alias': ['error', {allowedNames: ['self']}],
        '@typescript-eslint/no-throw-literal': 'error',
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
        '@typescript-eslint/no-unnecessary-condition': 'error',
        '@typescript-eslint/no-unnecessary-qualifier': 'error',
        '@typescript-eslint/no-unnecessary-type-arguments': 'warn',
        '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
        '@typescript-eslint/no-unnecessary-type-constraint': 'error',
        '@typescript-eslint/no-unsafe-argument': 'error',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'error',
        '@typescript-eslint/no-unsafe-function-type': 'error',
        '@typescript-eslint/no-unsafe-member-access': 'error',
        '@typescript-eslint/no-unsafe-return': 'error',
        '@typescript-eslint/no-unused-expressions': [
            'error',
            {
                allowShortCircuit: true,
                allowTaggedTemplates: false,
                allowTernary: true
            }
        ],
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                args: 'after-used',
                argsIgnorePattern: '^e$',
                caughtErrors: 'none',
                ignoreRestSiblings: true,
                vars: 'all'
            }
        ],
        '@typescript-eslint/no-use-before-define': [
            'error',
            {
                classes: false,
                functions: false,
                variables: false
            }
        ],
        '@typescript-eslint/no-useless-constructor': 'error',
        '@typescript-eslint/no-useless-empty-export': 'error',
        '@typescript-eslint/no-var-requires': 'error',
        '@typescript-eslint/no-wrapper-object-types': 'error',
        '@typescript-eslint/non-nullable-type-assertion-style': 'error',
        '@typescript-eslint/object-curly-spacing': ['error', 'never'],
        '@typescript-eslint/padding-line-between-statements': [
            'error',
            {
                blankLine: 'always',
                next: '*',
                prev: ['const', 'let', 'var']
            },
            {
                blankLine: 'any',
                next: ['const', 'let', 'var'],
                prev: ['const', 'let', 'var']
            }
        ],
        '@typescript-eslint/prefer-as-const': 'error',
        '@typescript-eslint/prefer-enum-initializers': 'off',
        '@typescript-eslint/prefer-for-of': 'error',
        '@typescript-eslint/prefer-function-type': 'off',
        '@typescript-eslint/prefer-includes': 'error',
        '@typescript-eslint/prefer-literal-enum-member': 'error',
        '@typescript-eslint/prefer-namespace-keyword': 'error',
        '@typescript-eslint/prefer-nullish-coalescing': 'error',
        '@typescript-eslint/prefer-optional-chain': 'error',
        '@typescript-eslint/prefer-readonly': 'error',
        '@typescript-eslint/prefer-readonly-parameter-types': 'off',
        '@typescript-eslint/prefer-reduce-type-parameter': 'error',
        '@typescript-eslint/prefer-return-this-type': 'error',
        '@typescript-eslint/prefer-string-starts-ends-with': 'error',
        '@typescript-eslint/prefer-ts-expect-error': 'error',
        '@typescript-eslint/promise-function-async': 'error',
        '@typescript-eslint/quotes': [
            'error',
            'single',
            {avoidEscape: true}
        ],
        '@typescript-eslint/require-array-sort-compare': 'off',
        '@typescript-eslint/require-await': 'error',
        '@typescript-eslint/restrict-plus-operands': 'error',
        '@typescript-eslint/restrict-template-expressions': 'error',
        '@typescript-eslint/return-await': 'error',
        '@typescript-eslint/semi': 'error',
        '@typescript-eslint/sort-type-constituents': ['error', {checkIntersections: false}],
        '@typescript-eslint/space-before-blocks': ['error', 'always'],
        '@typescript-eslint/space-before-function-paren': [
            'error',
            {
                anonymous: 'never',
                asyncArrow: 'always',
                named: 'never'
            }
        ],
        '@typescript-eslint/space-infix-ops': 'error',
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/switch-exhaustiveness-check': 'error',
        '@typescript-eslint/triple-slash-reference': 'error',
        '@typescript-eslint/type-annotation-spacing': 'error',
        '@typescript-eslint/unified-signatures': 'error',
        'brace-style': 'off',
        'comma-dangle': 'off',
        'comma-spacing': 'off',
        'default-param-last': 'off',
        'dot-notation': 'off',
        'func-call-spacing': 'off',
        'jsdoc/require-param-type': 'off',
        'jsdoc/require-returns-type': 'off',
        'keyword-spacing': 'off',
        'lines-between-class-members': 'off',
        'no-array-constructor': 'off',
        'no-dupe-class-members': 'off',
        'no-empty-function': 'off',
        'no-extra-semi': 'off',
        'no-implied-eval': 'off',
        'no-invalid-this': 'off',
        'no-loop-func': 'off',
        'no-loss-of-precision': 'off',
        'no-redeclare': 'off',
        'no-return-await': 'off',
        'no-shadow': 'off',
        'no-throw-literal': 'off',
        'no-undefined': 'off',
        'no-unused-expressions': 'off',
        'no-unused-vars': 'off',
        'no-use-before-define': 'off',
        'no-useless-constructor': 'off',
        'object-curly-spacing': 'off',
        'padding-line-between-statements': 'off',
        quotes: 'off',
        'react/default-props-match-prop-types': 'off',
        'react/require-default-props': 'off',
        semi: 'off',
        'space-before-blocks': 'off',
        'space-before-function-paren': 'off',
        'space-infix-ops': 'off'
    }
};