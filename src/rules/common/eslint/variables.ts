// @ts-expect-error
import confusingBrowserGlobals from 'confusing-browser-globals';

export const variables = {
    'init-declarations': 'off',
    'no-delete-var': 'error',
    'no-label-var': 'error',
    'no-restricted-globals': ['error', 'isFinite', 'isNaN'].concat(confusingBrowserGlobals as ConcatArray<string>),
    'no-shadow': 'error',
    'no-shadow-restricted-names': 'error',
    'no-undef': 'error',
    'no-undef-init': 'error',
    'no-undefined': 'error',
    'no-unused-vars': [
        'error',
        {
            args: 'after-used',
            argsIgnorePattern: '^e$',
            caughtErrors: 'none',
            ignoreRestSiblings: true,
            vars: 'all'
        }
    ],
    'no-use-before-define': [
        'error',
        {
            classes: false,
            functions: false,
            variables: false
        }
    ]
};