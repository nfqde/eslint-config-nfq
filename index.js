const global = require('./config/globals');
const plugins = require('./config/plugins');
const settings = require('./config/settings');
const rules = require('./rules');

module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true
    },
    extends: rules,
    globals: global,
    parser: '@babel/eslint-parser',
    parserOptions: {
        ecmaFeatures: {jsx: true},
        ecmaVersion: 8
    },
    plugins,
    settings
};