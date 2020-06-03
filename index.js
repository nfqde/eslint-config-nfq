const global = require('./config/globals');
const plugins = require('./config/plugins');
const settings = require('./config/settings');
const rules = require('./rules');

module.exports = {
    globals: global,
    parser: 'babel-eslint',
    plugins,
    extends: rules,
    env: {
        es6: true,
        browser: true,
        node: true
    },
    parserOptions: {
        ecmaVersion: 8,
        ecmaFeatures: {jsx: true}
    },
    settings
};