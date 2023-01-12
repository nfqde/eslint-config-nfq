/* eslint-disable max-lines */
/* eslint-disable @nfq/sort-keys */
/* eslint-disable no-inline-comments */
const SPACE_INDENT = 4;

module.exports = {
    rules: {
        'array-bracket-newline': ['error', 'consistent'], // object option alternative: { multiline: true, minItems: 3 } enforce line breaks after opening and before closing array brackets https://eslint.org/docs/rules/array-bracket-newline
        'array-bracket-spacing': ['error', 'never'], // enforce spacing inside array brackets https://eslint.org/docs/rules/array-bracket-spacing
        'array-element-newline': ['error', 'consistent'], // enforce line breaks between array elements https://eslint.org/docs/rules/array-element-newline
        'block-spacing': ['error', 'never'], // enforce spacing inside single-line blocks https://eslint.org/docs/rules/block-spacing
        'brace-style': [
            'error',
            '1tbs',
            {allowSingleLine: false}
        ], // enforce one true brace style https://eslint.org/docs/rules/brace-style
        camelcase: [
            'error',
            {
                ignoreDestructuring: false,
                properties: 'always'
            }
        ], // require camel case names
        'capitalized-comments': [
            'off',
            'never',
            {
                block: {
                    ignoreConsecutiveComments: true,
                    ignoreInlineComments: true,
                    ignorePattern: '.*'
                },
                line: {
                    ignoreConsecutiveComments: true,
                    ignoreInlineComments: true,
                    ignorePattern: '.*'
                }
            }
        ], // enforce or disallow capitalization of the first letter of a comment https://eslint.org/docs/rules/capitalized-comments
        'comma-dangle': ['error', 'never'], // require trailing commas in multiline object literals https://eslint.org/docs/rules/comma-dangle
        'comma-spacing': [
            'error',
            {
                after: true,
                before: false
            }
        ], // enforce spacing before and after comma https://eslint.org/docs/rules/comma-spacing
        'comma-style': [
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
        ], // enforce one true comma style https://eslint.org/docs/rules/comma-style
        'computed-property-spacing': ['error', 'never'], // disallow padding inside computed properties https://eslint.org/docs/rules/computed-property-spacing
        'consistent-this': ['error', 'self'], // enforces consistent naming when capturing the current execution context https://eslint.org/docs/rules/consistent-this
        'eol-last': ['error', 'never'], // enforce newline at the end of file, with no multiple empty lines https://eslint.org/docs/rules/eol-last
        'func-call-spacing': ['error', 'never'], // enforce spacing between functions and their invocations https://eslint.org/docs/rules/func-call-spacing
        'func-name-matching': [
            'off',
            'always',
            {
                considerPropertyDescriptor: true,
                includeCommonJSModuleExports: false
            }
        ], // requires function names to match the name of the variable or property to which they are assigned https://eslint.org/docs/rules/func-name-matching
        'func-names': ['warn', 'as-needed'], // require function expressions to have a name https://eslint.org/docs/rules/func-names
        'func-style': ['off', 'expression'], // enforces use of function declarations or expressions https://eslint.org/docs/rules/func-style
        'function-call-argument-newline': ['error', 'consistent'], // https://eslint.org/docs/rules/function-call-argument-newline
        'function-paren-newline': ['error', 'consistent'], // enforce consistent line breaks inside function parentheses https://eslint.org/docs/rules/function-paren-newline
        'id-denylist': 'off', // Blacklist certain identifiers to prevent them being used https://eslint.org/docs/rules/id-denylist
        'id-length': 'off', // this option enforces minimum and maximum identifier lengths (variable names, property names etc.) https://eslint.org/docs/rules/id-length
        'id-match': 'off', // require identifiers to match the provided regular expression https://eslint.org/docs/rules/id-match
        'implicit-arrow-linebreak': ['error', 'beside'], // Enforce the location of arrow function bodies with implicit returns https://eslint.org/docs/rules/implicit-arrow-linebreak
        indent: [
            'error',
            SPACE_INDENT,
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
                // list derived from https://github.com/benjamn/ast-types/blob/HEAD/def/jsx.js
                ImportDeclaration: 'first',
                ObjectExpression: 'first',
                outerIIFEBody: 1,
                SwitchCase: 1,
                VariableDeclarator: 'first'
            }
        ], // this option sets a specific tab width for your code https://eslint.org/docs/rules/indent
        'jsx-quotes': ['off', 'prefer-double'], // specify whether double or single quotes should be used in JSX attributes https://eslint.org/docs/rules/jsx-quotes
        'key-spacing': [
            'error',
            {
                afterColon: true,
                beforeColon: false,
                mode: 'minimum'
            }
        ], // enforces spacing between keys and values in object literal properties https://eslint.org/docs/rules/key-spacing
        'keyword-spacing': [
            'error',
            {
                after: true,
                before: true
            }
        ], // require a space before & after certain keywords https://eslint.org/docs/rules/keyword-spacing
        'line-comment-position': [
            'off',
            {
                applyDefaultPatterns: true,
                ignorePattern: '',
                position: 'above'
            }
        ], // enforce position of line comments https://eslint.org/docs/rules/line-comment-position
        'linebreak-style': ['error', 'unix'], // disallow mixed 'LF' and 'CRLF' as linebreaks https://eslint.org/docs/rules/linebreak-style
        'lines-around-comment': 'off', // enforces empty lines around comments https://eslint.org/docs/rules/lines-around-comment
        'lines-between-class-members': [
            'error',
            'always',
            {exceptAfterSingleLine: false}
        ], // require or disallow an empty line between class members https://eslint.org/docs/rules/lines-between-class-members
        'max-depth': ['error', {max: 5}], // specify the maximum depth that blocks can be nested https://eslint.org/docs/rules/max-depth
        'max-len': [
            'error',
            {
                code: 120,
                ignoreComments: true,
                ignoreRegExpLiterals: true,
                ignoreTemplateLiterals: true,
                ignoreUrls: true
            }
        ], // specify the maximum length of a line in your program https://eslint.org/docs/rules/max-len
        'max-lines': [
            'error',
            {
                max: 300,
                skipBlankLines: true,
                skipComments: true
            }
        ], // specify the max number of lines in a file https://eslint.org/docs/rules/max-lines
        'max-lines-per-function': [
            'warn',
            {
                IIFEs: true,
                max: 100,
                skipBlankLines: true,
                skipComments: true
            }
        ], // enforce a maximum function length https://eslint.org/docs/rules/max-lines-per-function
        'max-nested-callbacks': 'off', // specify the maximum depth callbacks can be nested https://eslint.org/docs/rules/max-nested-callbacks
        'max-params': ['off', {max: 3}], // limits the number of parameters that can be used in the function declaration. https://eslint.org/docs/rules/max-params
        'max-statements': ['off', {max: 10}], // specify the maximum number of statement allowed in a function https://eslint.org/docs/rules/max-statements
        'max-statements-per-line': ['error', {max: 1}], // restrict the number of statements per line https://eslint.org/docs/rules/max-statements-per-line
        'multiline-comment-style': ['off', 'starred-block'], // enforce a particular style for multiline comments https://eslint.org/docs/rules/multiline-comment-style
        'multiline-ternary': ['off', 'never'], // require multiline ternary https://eslint.org/docs/rules/multiline-ternary
        'new-cap': [
            'error',
            {
                capIsNew: false,
                capIsNewExceptions: ['Immutable.Map', 'Immutable.Set', 'Immutable.List'],
                newIsCap: true,
                newIsCapExceptions: []
            }
        ], // require a capital letter for constructors https://eslint.org/docs/rules/new-cap
        'new-parens': ['error', 'always'], // disallow the omission of parentheses when invoking a constructor with no arguments https://eslint.org/docs/rules/new-parens
        'newline-per-chained-call': [
            'error',
            {ignoreChainWithDepth: 4}
        ], // enforces new line after each method call in the chain to make it more readable and easy to maintain https://eslint.org/docs/rules/newline-per-chained-call
        'no-array-constructor': 'error', // disallow use of the Array constructor https://eslint.org/docs/rules/no-array-constructor
        'no-bitwise': 'error', // disallow use of bitwise operators https://eslint.org/docs/rules/no-bitwise
        'no-continue': 'error', // disallow use of the continue statement https://eslint.org/docs/rules/no-continue
        'no-inline-comments': [
            'error',
            {ignorePattern: '(@type|css) .+'}
        ], // disallow comments inline after code https://eslint.org/docs/rules/no-inline-comments
        'no-lonely-if': 'error', // disallow if as the only statement in an else block https://eslint.org/docs/rules/no-lonely-if
        'no-mixed-operators': [
            'error',
            {
                allowSamePrecedence: false,
                // the list of arthmetic groups disallows mixing `%` and `**`
                // with other arithmetic operators.
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
        ], // disallow un-paren'd mixes of different operators https://eslint.org/docs/rules/no-mixed-operators
        'no-mixed-spaces-and-tabs': 'error', // disallow mixed spaces and tabs for indentation https://eslint.org/docs/rules/no-mixed-spaces-and-tabs
        'no-multi-assign': 'error', // disallow use of chained assignment expressions https://eslint.org/docs/rules/no-multi-assign
        'no-multiple-empty-lines': 'error', // disallow multiple empty lines, only one newline at the end, and no new lines at the beginning https://eslint.org/docs/rules/no-multiple-empty-lineshttps://eslint.org/docs/rules/no-multiple-empty-lines
        'no-negated-condition': 'error', // disallow negated conditions https://eslint.org/docs/rules/no-negated-condition
        'no-nested-ternary': 'error', // disallow nested ternary expressions https://eslint.org/docs/rules/no-nested-ternary
        'no-new-object': 'error', // disallow use of the Object constructor https://eslint.org/docs/rules/no-new-object
        'no-plusplus': 'off', // disallow use of unary operators, ++ and -- https://eslint.org/docs/rules/no-plusplus
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
        ], // disallow certain syntax forms https://eslint.org/docs/rules/no-restricted-syntax
        'no-tabs': 'error', // disallow tab characters entirely https://eslint.org/docs/rules/no-tabs
        'no-ternary': 'off', // disallow the use of ternary operators https://eslint.org/docs/rules/no-ternary
        'no-trailing-spaces': 'error', // disallow trailing whitespace at the end of lines https://eslint.org/docs/rules/no-trailing-spaces
        'no-underscore-dangle': [
            'error',
            {
                allow: ['_id'],
                allowAfterSuper: false,
                allowAfterThis: false,
                enforceInMethodNames: true
            }
        ], // disallow dangling underscores in identifiers https://eslint.org/docs/rules/no-underscore-dangle
        'no-unneeded-ternary': [
            'error',
            {defaultAssignment: false}
        ], // disallow the use of Boolean literals in conditional expressions also, prefer `a || b` over `a ? a : b` https://eslint.org/docs/rules/no-unneeded-ternary
        'no-whitespace-before-property': 'error', // disallow whitespace before properties https://eslint.org/docs/rules/no-whitespace-before-property
        'nonblock-statement-body-position': [
            'error',
            'beside',
            {overrides: {}}
        ], // enforce the location of single-line statements https://eslint.org/docs/rules/nonblock-statement-body-position
        'object-curly-newline': [
            'error',
            {multiline: true}
        ], // enforce line breaks between braces https://eslint.org/docs/rules/object-curly-newline
        'object-curly-spacing': ['error', 'never'], // require padding inside curly braces https://eslint.org/docs/rules/object-curly-spacing
        'object-property-newline': 'error', // enforce "same line" or "multiple line" on object properties. https://eslint.org/docs/rules/object-property-newline
        'one-var': ['off', 'never'], // allow just one var statement per function https://eslint.org/docs/rules/one-var
        'one-var-declaration-per-line': ['error', 'always'], // require a newline around variable declaration https://eslint.org/docs/rules/one-var-declaration-per-line
        'operator-assignment': ['error', 'always'], // require assignment operator shorthand where possible or prohibit it entirely https://eslint.org/docs/rules/operator-assignment
        'operator-linebreak': [
            'error',
            'before'
        ], // Requires operator at the beginning of the line in multiline statements https://eslint.org/docs/rules/operator-linebreak
        'padded-blocks': ['error', 'never'], // disallow padding within blocks
        'padding-line-between-statements': [
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
                blankLine: "always",
                prev: "directive",
                next: "*"
            },
            {
                blankLine: "any",
                prev: "directive",
                next: "directive"
            },
            {
                blankLine: "always",
                prev: "*",
                next: "return"
            }
        ], // Require or disallow padding lines between statements https://eslint.org/docs/rules/padding-line-between-statements
        'prefer-exponentiation-operator': 'error', // Disallow the use of Math.pow in favor of the ** operator https://eslint.org/docs/rules/prefer-exponentiation-operator
        'prefer-object-spread': 'error', // Prefer use of an object spread over Object.assign https://eslint.org/docs/rules/prefer-object-spread
        'quote-props': [
            'error',
            'as-needed',
            {
                keywords: false,
                numbers: false,
                unnecessary: true
            }
        ], // require quotes around object literal property names https://eslint.org/docs/rules/quote-props.html
        quotes: [
            'error',
            'single',
            {avoidEscape: true}
        ], // specify whether double or single quotes should be used
        semi: ['error', 'always'], // require or disallow use of semicolons instead of ASI https://eslint.org/docs/rules/semi
        'semi-spacing': [
            'error',
            {
                after: true,
                before: false
            }
        ], // enforce spacing before and after semicolons https://eslint.org/docs/rules/semi-spacing
        'semi-style': ['error', 'last'], // Enforce location of semicolons https://eslint.org/docs/rules/semi-style
        '@nfq/sort-keys': [
            'error',
            'asc',
            {
                caseSensitive: false,
                natural: true,
                ignorePropTypes: true,
                methodsExtra: true
            }
        ], // requires object keys to be sorted https://github.com/leo-buneev/eslint-plugin-sort-keys-fix
        'sort-vars': 'error', // sort variables within the same declaration block https://eslint.org/docs/rules/sort-vars
        'sort-destructure-keys/sort-destructure-keys': ['error', {caseSensitive: false}],
        'space-before-blocks': ['error', 'always'], // require or disallow space before blocks
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'never',
                asyncArrow: 'always',
                named: 'never'
            }
        ], // require or disallow space before function opening parenthesis https://eslint.org/docs/rules/space-before-function-paren
        'space-in-parens': ['error', 'never'], // require or disallow spaces inside parentheses https://eslint.org/docs/rules/space-in-parens
        'space-infix-ops': 'error', // require spaces around operators https://eslint.org/docs/rules/space-infix-ops
        'space-unary-ops': [
            'error',
            {
                nonwords: false,
                overrides: {},
                words: true
            }
        ], // Require or disallow spaces before/after unary operators https://eslint.org/docs/rules/space-unary-ops
        'spaced-comment': [
            'error',
            'always',
            {
                block: {
                    balanced: true,
                    exceptions: ['-', '+'],
                    markers: ['=', '!', ':', '::'] // space here to support sprockets directives and flow comment types
                },
                line: {
                    exceptions: ['-', '+'],
                    markers: ['=', '!', '/'] // space here to support sprockets directives, slash for TS /// comments
                }
            }
        ], // require or disallow a space immediately following the // or /* in a comment https://eslint.org/docs/rules/spaced-comment
        'switch-colon-spacing': [
            'error',
            {
                after: true,
                before: false
            }
        ], // Enforce spacing around colons of switch statements https://eslint.org/docs/rules/switch-colon-spacing
        'template-tag-spacing': ['error', 'never'], // Require or disallow spacing between template tags and their literals https://eslint.org/docs/rules/template-tag-spacing
        'unicode-bom': ['error', 'never'], // require or disallow the Unicode Byte Order Mark https://eslint.org/docs/rules/unicode-bom
        'wrap-regex': 'error' // require regex literals to be wrapped in parentheses https://eslint.org/docs/rules/wrap-regex
    }
};