module.exports = {
    rules: {
        '@stylistic/ts/brace-style': ['error', '1tbs', {allowSingleLine: false}],
        '@stylistic/ts/comma-dangle': ['error', 'never'],
        '@stylistic/ts/comma-spacing': [
            'error',
            {
                after: true,
                before: false
            }
        ],
        '@stylistic/ts/function-call-spacing': ['error', 'never'],
        '@stylistic/ts/keyword-spacing': [
            'error',
            {
                after: true,
                before: true
            }
        ],
        '@stylistic/ts/lines-between-class-members': [
            'error',
            'always',
            {exceptAfterSingleLine: false}
        ],
        '@stylistic/ts/member-delimiter-style': [
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
        '@stylistic/ts/no-extra-semi': 'error',
        '@stylistic/ts/object-curly-spacing': ['error', 'never'],
        '@stylistic/ts/padding-line-between-statements': [
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
        '@stylistic/ts/quotes': [
            'error',
            'single',
            {avoidEscape: true}
        ],
        '@stylistic/ts/semi': 'error',
        '@stylistic/ts/space-before-blocks': ['error', 'always'],
        '@stylistic/ts/space-before-function-paren': [
            'error',
            {
                anonymous: 'never',
                asyncArrow: 'always',
                named: 'never'
            }
        ],
        '@stylistic/ts/space-infix-ops': 'error',
        '@stylistic/ts/type-annotation-spacing': 'error'
    }
};