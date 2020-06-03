/* eslint-disable no-inline-comments */

module.exports = {
    rules: {
        'no-unsanitized/method': 'error', // The method rule in eslint-plugin-no-unsanitized perform basic security checks for function calls. https://github.com/mozilla/eslint-plugin-no-unsanitized/blob/master/docs/rules/method.md
        'no-unsanitized/property': 'error' // The property rule in eslint-plugin-no-unsanitized perform basic security checks for property assignments. https://github.com/mozilla/eslint-plugin-no-unsanitized/blob/master/docs/rules/property.md
    }
};