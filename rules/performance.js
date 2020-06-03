/* eslint-disable no-inline-comments */

module.exports = {
    rules: {
        'perf-standard/check-function-inline': 'off', // This lint rule checks to see if a function is between 600 and 660 characters and then warns that the function will not be inlined in V8. https://github.com/Raynos/eslint-plugin-perf-standard#check-function-inline
        'perf-standard/no-instanceof-guard': 'error', // This disables the common anti-pattern of: if (!(this instanceof Foo)) return new Foo() https://github.com/Raynos/eslint-plugin-perf-standard#no-instanceof-gaurd
        'perf-standard/no-self-in-constructor': 'error' // This disables the ability to use var self = this in the body of a constructor function. https://github.com/Raynos/eslint-plugin-perf-standard#no-self-in-constructor
    }
};