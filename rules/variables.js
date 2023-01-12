/* eslint-disable no-inline-comments */
const confusingBrowserGlobals = require('confusing-browser-globals');

module.exports = {
    rules: {
        'init-declarations': 'off', // enforce or disallow variable initializations at definition https://eslint.org/docs/rules/init-declarations
        'no-delete-var': 'error', // disallow deletion of variables https://eslint.org/docs/rules/no-delete-var
        'no-label-var': 'error', // disallow labels that share a name with a variable https://eslint.org/docs/rules/no-label-var
        'no-restricted-globals': ['error', 'isFinite', 'isNaN'].concat(confusingBrowserGlobals), // disallow specific globals https://eslint.org/docs/rules/no-restricted-globals
        'no-shadow': 'error', // disallow declaration of variables already declared in the outer scope https://eslint.org/docs/rules/no-shadow-restricted-names
        'no-shadow-restricted-names': 'error', // disallow shadowing of names such as arguments https://eslint.org/docs/rules/no-shadow-restricted-names
        'no-undef': 'error', // disallow use of undeclared variables unless mentioned in a /*global */ block https://eslint.org/docs/rules/no-undef
        'no-undef-init': 'error', // disallow use of undefined when initializing variables https://eslint.org/docs/rules/no-undef-init
        'no-undefined': 'error', // disallow use of undefined variable https://eslint.org/docs/rules/no-undefined
        'no-unused-vars': [
            'error',
            {
                args: 'after-used',
                argsIgnorePattern: '^e$',
                caughtErrors: 'none',
                ignoreRestSiblings: true,
                vars: 'all'
            }
        ], // disallow declaration of variables that are not used in the code https://eslint.org/docs/rules/no-undefined
        'no-use-before-define': [
            'error',
            {
                classes: false,
                functions: false,
                variables: false
            }
        ] // disallow use of variables before they are defined https://eslint.org/docs/rules/no-use-before-define
    }
};