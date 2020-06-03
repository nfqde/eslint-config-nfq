/* eslint-disable no-inline-comments */

module.exports = {
    rules: {
        'promise/always-return': 'error', // Ensure that inside a then() you make sure to return a new promise or value. https://github.com/xjamundx/eslint-plugin-promise/blob/master/docs/rules/always-return.md
        'promise/avoid-new': 'off', // Avoid creating new promises outside of utility libs https://github.com/xjamundx/eslint-plugin-promise/blob/master/docs/rules/avoid-new.md
        'promise/catch-or-return': 'error', // Ensure that each time a then() is applied to a promise, a catch() is applied as well. https://github.com/xjamundx/eslint-plugin-promise/blob/master/docs/rules/catch-or-return.md
        'promise/no-callback-in-promise': 'error', // Avoid calling cb() inside of a then() https://github.com/xjamundx/eslint-plugin-promise/blob/master/docs/rules/no-callback-in-promise.md
        'promise/no-native': 'off', // Don't use promise object. https://github.com/xjamundx/eslint-plugin-promise/blob/master/docs/rules/no-native.md
        'promise/no-nesting': 'error', // Avoid nested then() or catch() statements. https://github.com/xjamundx/eslint-plugin-promise/blob/master/docs/rules/no-nesting.md
        'promise/no-new-statics': 'error', // Avoid calling new on a Promise static method https://github.com/xjamundx/eslint-plugin-promise/blob/master/docs/rules/no-new-statics.md
        'promise/no-promise-in-callback': 'error', // Avoid using promises inside of callbacks. https://github.com/xjamundx/eslint-plugin-promise/blob/master/docs/rules/no-promise-in-callback.md
        'promise/no-return-in-finally': 'error', // Disallow return statements in finally(). https://github.com/xjamundx/eslint-plugin-promise/blob/master/docs/rules/no-return-in-finally.md
        'promise/no-return-wrap': 'error', // Avoid wrapping values in Promise.resolve or Promise.reject when not needed. https://github.com/xjamundx/eslint-plugin-promise/blob/master/docs/rules/no-return-wrap.md
        'promise/param-names': 'error', // Enforce consistent param names and ordering when creating new promises. https://github.com/xjamundx/eslint-plugin-promise/blob/master/docs/rules/param-names.md
        'promise/prefer-await-to-callbacks': 'error', // Prefer async/await to the callback pattern https://github.com/xjamundx/eslint-plugin-promise/blob/master/docs/rules/prefer-await-to-callbacks.md
        'promise/prefer-await-to-then': 'error', // Prefer await to then() for reading Promise values https://github.com/xjamundx/eslint-plugin-promise/blob/master/docs/rules/prefer-await-to-then.md
        'promise/valid-params': 'warn' // Ensures the proper number of arguments are passed to Promise functions  https://github.com/xjamundx/eslint-plugin-promise/blob/master/docs/rules/valid-params.md
    }
};