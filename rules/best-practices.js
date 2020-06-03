/* eslint-disable no-inline-comments */

module.exports = {
    rules: {
        'accessor-pairs': [
            'error',
            {
                getWithoutSet: false,
                setWithoutGet: true
            }
        ], // enforces getter/setter pairs in objects https://eslint.org/docs/rules/accessor-pairs
        'array-callback-return': ['error', {allowImplicit: true}], // enforces return statements in callbacks of array's methods http://eslint.org/docs/rules/array-callback-return
        'block-scoped-var': 'error', // treat var statements as if they were block scoped https://eslint.org/docs/rules/block-scoped-var
        'class-methods-use-this': ['off', {exceptMethods: []}], // enforce that class methods use "this" http://eslint.org/docs/rules/class-methods-use-this
        complexity: ['warn', {max: 20}], // specify the maximum cyclomatic complexity allowed in a program https://eslint.org/docs/rules/complexity
        'consistent-return': 'error', // require return statements to either always or never specify values https://eslint.org/docs/rules/consistent-return
        curly: 'error', // specify curly brace conventions for all control statements https://eslint.org/docs/rules/curly#top
        'default-case': ['warn', {commentPattern: '^no default$'}], // require default case in switch statements https://eslint.org/docs/rules/default-case
        'default-param-last': 'error', // Checks if default params are last https://eslint.org/docs/rules/default-param-last
        'dot-location': ['error', 'property'], // enforces consistent newlines before or after dots http://eslint.org/docs/rules/dot-location
        'dot-notation': ['error', {allowKeywords: true}], // encourages use of dot notation whenever possible https://eslint.org/docs/rules/dot-notation
        eqeqeq: ['error', 'always'], // require the use of === and !== http://eslint.org/docs/rules/eqeqeq
        'guard-for-in': 'warn', // make sure for-in loops have an if statement https://eslint.org/docs/rules/guard-for-in
        'max-classes-per-file': ['error', 1], // enforce a maximum number of classes per file https://eslint.org/docs/rules/max-classes-per-file
        'nfq/no-magic-numbers': [
            'error',
            {
                detectObjects: false,
                enforceConst: true,
                ignore: [0, 1],
                ignoreArrayIndexes: true,
                ignoreFunctions: []
            }
        ], // disallow magic numbers http://eslint.org/docs/rules/no-magic-numbers
        'no-alert': 'error', // disallow the use of alert, confirm, and prompt https://eslint.org/docs/rules/no-alert
        'no-caller': 'error', // disallow use of arguments.caller or arguments.callee https://eslint.org/docs/rules/no-caller
        'no-case-declarations': 'error', // disallow lexical declarations in case/default clauses http://eslint.org/docs/rules/no-case-declarations
        'no-constructor-return': 'off', // Disallow returning value in constructor https://eslint.org/docs/rules/no-constructor-return
        'no-div-regex': 'error', // disallow division operators explicitly at beginning of regular expression http://eslint.org/docs/rules/no-div-regex
        'no-else-return': ['error', {allowElseIf: true}], // disallow else after a return in an if https://eslint.org/docs/rules/no-else-return
        'no-empty-function': ['error', {allow: ['arrowFunctions', 'methods']}], // disallow empty functions, except for standalone funcs/arrows http://eslint.org/docs/rules/no-empty-function
        'no-empty-pattern': 'error', // disallow empty destructuring patterns http://eslint.org/docs/rules/no-empty-pattern
        'no-eq-null': 'error', // disallow comparisons to null without a type-checking operator https://eslint.org/docs/rules/no-eq-null
        'no-eval': 'error', // disallow use of eval() https://eslint.org/docs/rules/no-eval
        'no-extend-native': 'error', // disallow adding to native types https://eslint.org/docs/rules/no-extend-native
        'no-extra-bind': 'error', // disallow unnecessary function binding https://eslint.org/docs/rules/no-extra-bind
        'no-extra-label': 'error', // disallow Unnecessary Labels http://eslint.org/docs/rules/no-extra-label
        'no-fallthrough': 'error', // disallow fallthrough of case statements https://eslint.org/docs/rules/no-fallthrough
        'no-floating-decimal': 'error', // disallow the use of leading or trailing decimal points in numeric literals https://eslint.org/docs/rules/no-floating-decimal
        'no-global-assign': 'error', // disallow reassignments of native objects or read-only globals http://eslint.org/docs/rules/no-global-assign
        'no-implicit-coercion': 'error', // disallow implicit type conversions http://eslint.org/docs/rules/no-implicit-coercion
        'no-implicit-globals': 'error', // disallow var and named functions in global scope http://eslint.org/docs/rules/no-implicit-globals
        'no-implied-eval': 'error', // disallow use of eval()-like methods https://eslint.org/docs/rules/no-implied-eval
        'no-invalid-this': 'error', // disallow this keywords outside of classes or class-like objects https://eslint.org/docs/rules/no-invalid-this
        'no-iterator': 'error', // disallow usage of __iterator__ property https://eslint.org/docs/rules/no-iterator
        'no-labels': 'error', // disallow use of labels for anything other then loops and switches https://eslint.org/docs/rules/no-labels
        'no-lone-blocks': 'error', // disallow unnecessary nested blocks https://eslint.org/docs/rules/no-lone-blocks
        'no-loop-func': 'error', // disallow creation of functions within loops https://eslint.org/docs/rules/no-loop-func
        'no-multi-spaces': 'error', // disallow use of multiple spaces https://eslint.org/docs/rules/no-multi-spaces
        'no-multi-str': 'error', // disallow use of multiline strings https://eslint.org/docs/rules/no-multi-str
        'no-new': 'error', // disallow use of new operator when not part of the assignment or comparison https://eslint.org/docs/rules/no-new
        'no-new-func': 'error', // disallow use of new operator for Function object https://eslint.org/docs/rules/no-new-func
        'no-new-wrappers': 'error', // disallows creating new instances of String, Number, and Boolean https://eslint.org/docs/rules/no-new-wrappers
        'no-octal': 'error', // disallow use of (old style) octal literals https://eslint.org/docs/rules/no-octal
        'no-octal-escape': 'error', // disallow use of octal escape sequences in string literals, such as var foo = 'Copyright \251'; https://eslint.org/docs/rules/no-octal-escape
        'no-param-reassign': [
            'error',
            {
                ignorePropertyModificationsFor: [
                    'acc', // for reduce accumulators
                    'accumulator', // for reduce accumulators
                    'e', // for e.returnvalue
                    'ctx', // for Koa routing
                    'item', // array foreach
                    'req', // for Express requests
                    'request', // for Express requests
                    'res', // for Express responses
                    'response', // for Express responses
                    '$scope', // for Angular 1 scopes
                    'staticContext' // for ReactRouter context
                ],
                props: true
            }
        ], // disallow reassignment of function parameters disallow parameter object manipulation except for specific exclusions https://eslint.org/docs/rules/no-param-reassign.html
        'no-proto': 'error', // disallow usage of __proto__ property https://eslint.org/docs/rules/no-proto
        'no-redeclare': 'error', // disallow declaring the same variable more then once https://eslint.org/docs/rules/no-redeclare
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
        ], // disallow certain object properties https://eslint.org/docs/rules/no-restricted-properties
        'no-return-assign': ['error', 'except-parens'], // disallow use of assignment in return statement https://eslint.org/docs/rules/no-return-assign
        'no-return-await': 'error', // disallow redundant `return await` https://eslint.org/docs/rules/no-return-await
        'no-script-url': 'error', // disallow use of `javascript:` urls. https://eslint.org/docs/rules/no-script-url
        'no-self-assign': ['error', {props: true}], // disallow self assignment https://eslint.org/docs/rules/no-self-assign
        'no-self-compare': 'error', // disallow comparisons where both sides are exactly the same https://eslint.org/docs/rules/no-self-compare
        'no-sequences': 'error', // disallow use of comma operator https://eslint.org/docs/rules/no-sequences
        'no-throw-literal': 'error', // restrict what can be thrown as an exception https://eslint.org/docs/rules/no-throw-literal
        'no-unmodified-loop-condition': 'error', // disallow unmodified conditions of loops https://eslint.org/docs/rules/no-unmodified-loop-condition
        'no-unused-expressions': [
            'error',
            {
                allowShortCircuit: true,
                allowTaggedTemplates: false,
                allowTernary: true
            }
        ], // disallow usage of expressions in statement position https://eslint.org/docs/rules/no-unused-expressions
        'no-unused-labels': 'error', // disallow unused labels https://eslint.org/docs/rules/no-unused-labels
        'no-useless-call': 'error', // disallow unnecessary .call() and .apply() https://eslint.org/docs/rules/no-useless-call
        'no-useless-catch': 'error', // Disallow unnecessary catch clauses https://eslint.org/docs/rules/no-useless-catch
        'no-useless-concat': 'error', // disallow useless string concatenation https://eslint.org/docs/rules/no-useless-concat
        'no-useless-escape': 'error', // disallow unnecessary string escaping https://eslint.org/docs/rules/no-useless-escape
        'no-useless-return': 'error', // disallow redundant return; keywords https://eslint.org/docs/rules/no-useless-return
        'no-void': ['error', {allowAsStatement: true}], // disallow use of void operator https://eslint.org/docs/rules/no-void
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
        ], // disallow usage of configurable warning terms in comments: e.g. todo https://eslint.org/docs/rules/no-warning-comments
        'no-with': 'error', // disallow use of the with statement https://eslint.org/docs/rules/no-with
        'prefer-named-capture-group': 'off', // Suggest using named capture group in regular expression https://eslint.org/docs/rules/prefer-named-capture-group
        'prefer-promise-reject-errors': ['error', {allowEmptyReject: true}], // require using Error objects as Promise rejection reasons https://eslint.org/docs/rules/prefer-promise-reject-errors
        'prefer-regex-literals': 'error', // https://eslint.org/docs/rules/prefer-regex-literals
        radix: ['error', 'always'], // require use of the second argument for parseInt() https://eslint.org/docs/rules/radix
        'require-await': 'off', // require `await` in `async function` (note: this is a horrible rule that should never be used) https://eslint.org/docs/rules/require-await
        'require-unicode-regexp': 'error', // Enforce the use of u flag on RegExp https://eslint.org/docs/rules/require-unicode-regexp
        'vars-on-top': 'error', // requires to declare all vars on top of their containing scope https://eslint.org/docs/rules/vars-on-top
        'wrap-iife': [
            'error',
            'outside',
            {functionPrototypeMethods: false}
        ], // require immediate function invocation to be wrapped in parentheses https://eslint.org/docs/rules/wrap-iife.html
        yoda: 'error' // require or disallow Yoda conditions https://eslint.org/docs/rules/yoda
    }
};