export const codeQuality = {
    'accessor-pairs': [
        'error',
        {
            getWithoutSet: false,
            setWithoutGet: true
        }
    ],
    'array-callback-return': ['error', {allowImplicit: true}],
    'block-scoped-var': 'error',
    camelcase: [
        'error',
        {
            ignoreDestructuring: false,
            properties: 'always'
        }
    ],
    'consistent-return': 'error',
    'consistent-this': ['error', 'self'],
    curly: ['error', 'multi-line', 'consistent'],
    'default-case': ['warn', {commentPattern: '^no default$'}],
    'default-param-last': 'error',
    'dot-notation': ['error', {allowKeywords: true}],
    'func-name-matching': [
        'off',
        'always',
        {
            considerPropertyDescriptor: true,
            includeCommonJSModuleExports: false
        }
    ],
    'func-names': ['warn', 'as-needed'],
    'func-style': ['off', 'expression'],
    'guard-for-in': 'warn',
    'id-denylist': 'off',
    'id-length': 'off',
    'id-match': 'off',
    'max-depth': ['error', {max: 5}],
    'max-lines': [
        'error',
        {
            max: 500,
            skipBlankLines: true,
            skipComments: true
        }
    ],
    'max-lines-per-function': [
        'warn',
        {
            IIFEs: true,
            max: 200,
            skipBlankLines: true,
            skipComments: true
        }
    ],
    'max-nested-callbacks': 'off',
    'max-statements': ['off', {max: 10}],
    'multiline-comment-style': ['off', 'starred-block'],
    'new-cap': [
        'error',
        {
            capIsNew: false,
            capIsNewExceptions: ['Immutable.Map', 'Immutable.Set', 'Immutable.List'],
            newIsCap: true,
            newIsCapExceptions: []
        }
    ],
    'no-alert': 'error',
    'no-array-constructor': 'error',
    'no-bitwise': 'error',
    'no-caller': 'error',
    'no-case-declarations': 'error',
    'no-console': 'warn',
    'no-constructor-return': 'off',
    'no-continue': 'off',
    'no-div-regex': 'error',
    'no-else-return': ['error', {allowElseIf: true}],
    'no-empty-function': ['error', {allow: ['arrowFunctions', 'methods', 'asyncMethods']}],
    'no-empty-pattern': 'error',
    'no-eq-null': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-extra-label': 'error',
    'no-fallthrough': 'error',
    'no-implicit-coercion': 'error',
    'no-implicit-globals': 'error',
    'no-inline-comments': [
        'error',
        {ignorePattern: '(@type|css) .+'}
    ],
    'no-invalid-this': 'error',
    'no-iterator': 'error',
    'no-labels': 'error',
    'no-lone-blocks': 'error',
    'no-lonely-if': 'error',
    'no-loop-func': 'error',
    'no-multi-assign': 'error',
    'no-multi-str': 'error',
    'no-negated-condition': 'error',
    'no-nested-ternary': 'error',
    'no-new': 'error',
    'no-new-func': 'error',
    'no-new-object': 'error',
    'no-new-wrappers': 'error',
    'no-octal': 'error',
    'no-octal-escape': 'error',
    'no-plusplus': 'off',
    'no-proto': 'error',
    'no-restricted-properties': [
        'error',
        {
            message: 'arguments.callee is deprecated',
            object: 'arguments',
            property: 'callee'
        },
        {
            message: 'Please use Number.isFinite instead',
            object: 'global',
            property: 'isFinite'
        },
        {
            message: 'Please use Number.isFinite instead',
            object: 'self',
            property: 'isFinite'
        },
        {
            message: 'Please use Number.isFinite instead',
            object: 'window',
            property: 'isFinite'
        },
        {
            message: 'Please use Number.isNaN instead',
            object: 'global',
            property: 'isNaN'
        },
        {
            message: 'Please use Number.isNaN instead',
            object: 'self',
            property: 'isNaN'
        },
        {
            message: 'Please use Number.isNaN instead',
            object: 'window',
            property: 'isNaN'
        },
        {
            message: 'Please use Object.defineProperty instead.',
            property: '__defineGetter__'
        },
        {
            message: 'Please use Object.defineProperty instead.',
            property: '__defineSetter__'
        },
        {
            message: 'Use the exponentiation operator (**) instead.',
            object: 'Math',
            property: 'pow'
        }
    ],
    'no-restricted-syntax': [
        'error',
        {
            message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain'
                + ' and understand.',
            selector: 'LabeledStatement'
        },
        {
            message: '`with` is disallowed in strict mode because it makes code'
                + ' impossible to predict and optimize.',
            selector: 'WithStatement'
        }
    ],
    'no-return-assign': ['error', 'except-parens'],
    'no-return-await': 'error',
    'no-script-url': 'error',
    'no-sequences': 'error',
    'no-ternary': 'off',
    'no-unneeded-ternary': [
        'error',
        {defaultAssignment: false}
    ],
    'no-unused-expressions': [
        'error',
        {
            allowShortCircuit: true,
            allowTaggedTemplates: false,
            allowTernary: true
        }
    ],
    'no-unused-labels': 'error',
    'no-useless-call': 'error',
    'no-useless-concat': 'error',
    'no-useless-escape': 'error',
    'no-useless-return': 'error',
    'no-void': ['error', {allowAsStatement: true}],
    'no-warning-comments': [
        'off',
        {
            location: 'start',
            terms: [
                'todo',
                'fixme',
                'xxx'
            ]
        }
    ],
    'no-with': 'error',
    'one-var': ['off', 'never'],
    'operator-assignment': ['error', 'always'],
    'prefer-exponentiation-operator': 'error',
    'prefer-named-capture-group': 'off',
    'prefer-object-spread': 'error',
    'prefer-promise-reject-errors': ['error', {allowEmptyReject: true}],
    'prefer-regex-literals': 'error',
    'require-await': 'off',
    'require-unicode-regexp': 'error',
    'sort-destructure-keys/sort-destructure-keys': ['error', {caseSensitive: false}],
    'sort-vars': 'error',
    'unicode-bom': ['error', 'never'],
    yoda: 'error'
};