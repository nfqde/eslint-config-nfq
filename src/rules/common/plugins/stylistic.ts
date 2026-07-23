export const stylistic = {
    '@stylistic/array-bracket-newline': ['error', 'consistent'],
    '@stylistic/array-bracket-spacing': ['error', 'never'],
    '@stylistic/array-element-newline': ['error', 'consistent'],
    '@stylistic/arrow-parens': ['error', 'as-needed'],
    '@stylistic/arrow-spacing': ['error', {
        after: true,
        before: true
    }],
    '@stylistic/block-spacing': ['error', 'never'],
    '@stylistic/brace-style': ['error', '1tbs', {allowSingleLine: false}],
    '@stylistic/comma-dangle': ['error', 'never'],
    '@stylistic/comma-spacing': ['error', {
        after: true,
        before: false
    }],
    '@stylistic/comma-style': [
        'error',
        'last',
        {
            exceptions: {
                ArrayExpression: false,
                ArrayPattern: false,
                ArrowFunctionExpression: false,
                CallExpression: false,
                FunctionDeclaration: false,
                FunctionExpression: false,
                ImportDeclaration: false,
                NewExpression: false,
                ObjectExpression: false,
                ObjectPattern: false,
                VariableDeclaration: false
            }
        }
    ],
    '@stylistic/computed-property-spacing': ['error', 'never'],
    '@stylistic/dot-location': ['error', 'property'],
    '@stylistic/eol-last': ['error', 'never'],
    '@stylistic/function-call-argument-newline': ['error', 'consistent'],
    '@stylistic/function-call-spacing': ['error', 'never'],
    '@stylistic/function-paren-newline': ['error', 'consistent'],
    '@stylistic/generator-star-spacing': ['error', {
        after: true,
        before: false
    }],
    '@stylistic/implicit-arrow-linebreak': ['error', 'beside'],
    '@stylistic/indent': [
        'error',
        4,
        {
            ArrayExpression: 'first',
            CallExpression: {arguments: 'first'},
            flatTernaryExpressions: false,
            FunctionDeclaration: {
                body: 1,
                parameters: 'first'
            },
            FunctionExpression: {
                body: 1,
                parameters: 'first'
            },
            ignoreComments: false,
            ignoredNodes: [
                'JSXElement',
                'JSXElement > *',
                'JSXAttribute',
                'JSXIdentifier',
                'JSXNamespacedName',
                'JSXMemberExpression',
                'JSXSpreadAttribute',
                'JSXExpressionContainer',
                'JSXOpeningElement',
                'JSXClosingElement',
                'JSXFragment',
                'JSXOpeningFragment',
                'JSXClosingFragment',
                'JSXText',
                'JSXEmptyExpression',
                'JSXSpreadChild'
            ],
            ImportDeclaration: 'first',
            ObjectExpression: 'first',
            outerIIFEBody: 1,
            SwitchCase: 1,
            VariableDeclarator: 'first'
        }
    ],
    '@stylistic/indent-binary-ops': ['error', 4],
    '@stylistic/jsx-quotes': ['error', 'prefer-double'],
    '@stylistic/key-spacing': [
        'error',
        {
            afterColon: true,
            beforeColon: false,
            mode: 'minimum'
        }
    ],
    '@stylistic/keyword-spacing': ['error', {
        after: true,
        before: true
    }],
    '@stylistic/line-comment-position': [
        'off',
        {
            applyDefaultPatterns: true,
            ignorePattern: '',
            position: 'above'
        }
    ],
    '@stylistic/linebreak-style': ['error', 'unix'],
    '@stylistic/lines-around-comment': 'off',
    '@stylistic/lines-between-class-members': [
        'error',
        'always',
        {exceptAfterSingleLine: false}
    ],
    '@stylistic/max-len': [
        'error',
        {
            code: 120,
            ignoreComments: true,
            ignoreRegExpLiterals: true,
            ignoreTemplateLiterals: true,
            ignoreUrls: true
        }
    ],
    '@stylistic/max-statements-per-line': ['error', {max: 1}],
    '@stylistic/member-delimiter-style': [
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
    '@stylistic/multiline-ternary': ['off', 'never'],
    '@stylistic/new-parens': ['error', 'always'],
    '@stylistic/newline-per-chained-call': ['error', {ignoreChainWithDepth: 4}],
    '@stylistic/no-confusing-arrow': ['error', {allowParens: true}],
    '@stylistic/no-extra-parens': 'off',
    '@stylistic/no-extra-semi': 'error',
    '@stylistic/no-floating-decimal': 'error',
    '@stylistic/no-mixed-operators': [
        'error',
        {
            allowSamePrecedence: false,
            groups: [
                ['%', '**'],
                ['%', '+'],
                ['%', '-'],
                ['%', '*'],
                ['%', '/'],
                ['/', '*'],
                ['&', '|', '<<', '>>', '>>>'],
                ['==', '!=', '===', '!=='],
                ['&&', '||']
            ]
        }
    ],
    '@stylistic/no-mixed-spaces-and-tabs': 'error',
    '@stylistic/no-multi-spaces': 'error',
    '@stylistic/no-multiple-empty-lines': ['error', {
        max: 1,
        maxBOF: 0,
        maxEOF: 0
    }],
    '@stylistic/no-tabs': 'error',
    '@stylistic/no-trailing-spaces': 'error',
    '@stylistic/no-whitespace-before-property': 'error',
    '@stylistic/nonblock-statement-body-position': ['error', 'beside', {overrides: {}}],
    '@stylistic/object-curly-newline': [
        'error', {
            ExportDeclaration: {consistent: true},
            ImportDeclaration: {consistent: true},
            ObjectExpression: {
                minProperties: 2,
                multiline: true
            },
            ObjectPattern: {consistent: true},
            TSEnumBody: {consistent: true},
            TSInterfaceBody: {consistent: true},
            TSTypeLiteral: {consistent: true}
        }
    ],
    '@stylistic/object-curly-spacing': ['error', 'never'],
    '@stylistic/object-property-newline': 'off',
    '@stylistic/one-var-declaration-per-line': ['error', 'always'],
    '@stylistic/operator-linebreak': ['error', 'before'],
    '@stylistic/padded-blocks': ['error', 'never'],
    '@stylistic/padding-line-between-statements': [
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
        },
        {
            blankLine: 'always',
            next: '*',
            prev: 'directive'
        },
        {
            blankLine: 'any',
            next: 'directive',
            prev: 'directive'
        },
        {
            blankLine: 'always',
            next: 'return',
            prev: '*'
        }
    ],
    '@stylistic/quote-props': [
        'error',
        'as-needed',
        {
            keywords: false,
            numbers: false,
            unnecessary: true
        }
    ],
    '@stylistic/quotes': ['error', 'single', {avoidEscape: true}],
    '@stylistic/rest-spread-spacing': ['error', 'never'],
    '@stylistic/semi': ['error', 'always'],
    '@stylistic/semi-spacing': ['error', {
        after: true,
        before: false
    }],
    '@stylistic/semi-style': ['error', 'last'],
    '@stylistic/space-before-blocks': ['error', 'always'],
    '@stylistic/space-before-function-paren': [
        'error',
        {
            anonymous: 'never',
            asyncArrow: 'always',
            named: 'never'
        }
    ],
    '@stylistic/space-in-parens': ['error', 'never'],
    '@stylistic/space-infix-ops': 'error',
    '@stylistic/space-unary-ops': [
        'error',
        {
            nonwords: false,
            overrides: {},
            words: true
        }
    ],
    '@stylistic/spaced-comment': [
        'error',
        'always',
        {
            block: {
                balanced: true,
                exceptions: ['-', '+'],
                markers: ['=', '!', ':', '::']
            },
            line: {
                exceptions: ['-', '+'],
                markers: ['=', '!', '/']
            }
        }
    ],
    '@stylistic/switch-colon-spacing': ['error', {
        after: true,
        before: false
    }],
    '@stylistic/template-curly-spacing': ['error', 'never'],
    '@stylistic/template-tag-spacing': ['error', 'never'],
    '@stylistic/type-annotation-spacing': 'error',
    '@stylistic/type-generic-spacing': 'error',
    '@stylistic/type-named-tuple-spacing': 'error',
    '@stylistic/wrap-iife': ['error', 'outside', {functionPrototypeMethods: false}],
    '@stylistic/wrap-regex': 'error',
    '@stylistic/yield-star-spacing': ['error', 'after']
};