/* eslint-disable no-inline-comments */

module.exports = {
    rules: {
        'for-direction': 'error', // Enforce “for” loop update clause moving the counter in the right direction https://eslint.org/docs/rules/for-direction
        'getter-return': ['error', {allowImplicit: false}], // Enforces that a return statement is present in property getters https://eslint.org/docs/rules/getter-return
        'no-async-promise-executor': 'error', // disallow using an async function as a Promise executor https://eslint.org/docs/rules/no-async-promise-executor
        'no-await-in-loop': 'error', // Disallow await inside of loops https://eslint.org/docs/rules/no-await-in-loop
        'no-compare-neg-zero': 'error', // Disallow comparisons to negative zero https://eslint.org/docs/rules/no-compare-neg-zero
        'no-cond-assign': 'error', // disallow assignment in conditional expressions https://eslint.org/docs/rules/no-cond-assign
        'no-console': 'warn', // disallow use of console https://eslint.org/docs/rules/no-console
        'no-constant-condition': ['warn', {checkLoops: false}], // disallow use of constant expressions in conditions https://eslint.org/docs/rules/no-constant-condition
        'no-control-regex': 'error', // disallow control characters in regular expressions https://eslint.org/docs/rules/no-control-regex
        'no-debugger': 'error', // disallow use of debugger https://eslint.org/docs/rules/no-debugger
        'no-dupe-args': 'error', // disallow duplicate arguments in functions https://eslint.org/docs/rules/no-dupe-args
        'no-dupe-else-if': 'error', // Disallow duplicate conditions in if-else-if chains https://eslint.org/docs/rules/no-dupe-else-if
        'no-dupe-keys': 'error', // disallow duplicate keys when creating object literals https://eslint.org/docs/rules/no-dupe-keys
        'no-duplicate-case': 'error', // disallow a duplicate case label. https://eslint.org/docs/rules/no-duplicate-case
        'no-empty-character-class': 'error', // disallow the use of empty character classes in regular expressions https://eslint.org/docs/rules/no-empty-character-class
        'no-ex-assign': 'error', // disallow assigning to the exception in a catch block https://eslint.org/docs/rules/no-ex-assign
        'no-extra-boolean-cast': 'error', // disallow double-negation boolean casts in a boolean context https://eslint.org/docs/rules/no-extra-boolean-cast
        'no-extra-parens': [
            'off',
            'all',
            {
                conditionalAssign: true,
                enforceForArrowConditionals: false,
                ignoreJSX: 'all', // delegate to eslint-plugin-react
                nestedBinaryExpressions: false,
                returnAssign: false
            }
        ], // disallow unnecessary parentheses https://eslint.org/docs/rules/no-extra-parens
        'no-extra-semi': 'error', // disallow unnecessary semicolons https://eslint.org/docs/rules/no-extra-semi
        'no-func-assign': 'error', // disallow overwriting functions written as function declarations https://eslint.org/docs/rules/no-func-assign
        'no-import-assign': 'error', // https://eslint.org/docs/rules/no-import-assign
        'no-inner-declarations': 'error', // disallow function or variable declarations in nested blocks https://eslint.org/docs/rules/no-inner-declaration
        'no-invalid-regexp': 'error', // disallow invalid regular expression strings in the RegExp constructor https://eslint.org/docs/rules/no-invalid-regexp
        'no-irregular-whitespace': 'error', // disallow irregular whitespace outside of strings and comments https://eslint.org/docs/rules/no-irregular-whitespace
        'no-misleading-character-class': 'error', // Disallow characters which are made with multiple code points in character class syntax https://eslint.org/docs/rules/no-misleading-character-class
        'no-obj-calls': 'error', // disallow the use of object properties of the global object (Math and JSON) as functions https://eslint.org/docs/rules/no-obj-calls
        'no-prototype-builtins': 'error', // disallow use of Object.prototypes builtins directly https://eslint.org/docs/rules/no-prototype-builtins
        'no-regex-spaces': 'error', // disallow multiple spaces in a regular expression literal https://eslint.org/docs/rules/no-regex-spaces
        'no-setter-return': 'error', // Disallow returning values from setters https://eslint.org/docs/rules/no-setter-return
        'no-sparse-arrays': 'error', // disallow sparse arrays https://eslint.org/docs/rules/no-sparse-arrays
        'no-template-curly-in-string': 'error', // Disallow template literal placeholder syntax in regular strings https://eslint.org/docs/rules/no-template-curly-in-string
        'no-unexpected-multiline': 'error', // Avoid code that looks like two expressions but is actually one https://eslint.org/docs/rules/no-unexpected-multiline
        'no-unreachable': 'error', // disallow unreachable statements after a return, throw, continue, or break statement https://eslint.org/docs/rules/no-unreachable
        'no-unsafe-finally': 'error', // disallow return/throw/break/continue inside finally blocks https://eslint.org/docs/rules/no-unsafe-finally
        'no-unsafe-negation': 'error', // disallow negating the left operand of relational operators https://eslint.org/docs/rules/no-unsafe-negation
        'require-atomic-updates': 'off', // Disallow assignments that can lead to race conditions due to usage of await or yield https://eslint.org/docs/rules/require-atomic-updates
        'use-isnan': 'error', // disallow comparisons with the value NaN https://eslint.org/docs/rules/use-isnan
        'valid-jsdoc': [
            'error',
            {
                matchDescription: '.+',
                requireReturn: false
            }
        ], // ensure JSDoc comments are valid https://eslint.org/docs/rules/valid-jsdoc
        'valid-typeof': ['error', {requireStringLiterals: true}] // ensure that the results of typeof are compared against a valid string https://eslint.org/docs/rules/valid-typeof
    }
};