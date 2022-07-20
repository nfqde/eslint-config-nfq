const global = require('./config/globals');
const plugins = require('./config/plugins');
const settings = require('./config/settings');
const rules = require('./rules');
const typescript = require('./rules/typescript');

module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true
    },
    extends: rules,
    globals: global,
    overrides: [
        {
            files: ['**/*.{ts,cts,mts,tsx}'],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                project: './tsconfig.json',
                tsconfigRootDir: __dirname
            },
            plugins: ['@typescript-eslint'],
            rules: typescript.rules
        }
    ],
    parser: '@babel/eslint-parser',
    parserOptions: {
        ecmaFeatures: {jsx: true},
        ecmaVersion: 8,
        requireConfigFile: false
    },
    plugins,
    settings
};