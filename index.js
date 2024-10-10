const global = require('./config/globals');
const plugins = require('./config/plugins');
const settings = require('./config/settings');
const rules = require('./rules');
const stylistic = require('./rules/stylistic');
const typescript = require('./rules/typescript');
const typescriptCypress = require('./rules/typescript-cypress-exeptions');

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
            files: ['**/*.cy.{ts,cts,mts,tsx}'],
            parser: '@typescript-eslint/parser',
            parserOptions: {project: '**/tsconfig*.json'},
            plugins: ['@typescript-eslint', '@stylistic/ts'],
            rules: {
                ...typescript.rules,
                ...stylistic.rules,
                ...typescriptCypress.rules
            }
        },
        {
            files: ['**/*.{ts,cts,mts,tsx}'],
            parser: '@typescript-eslint/parser',
            parserOptions: {project: '**/tsconfig*.json'},
            plugins: ['@typescript-eslint', '@stylistic/ts'],
            rules: {
                ...typescript.rules,
                ...stylistic.rule
            }
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