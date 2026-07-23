import * as tsParser from '@typescript-eslint/parser';

import {
    commonEslintRules,
    commonPluginRules,
    cypressPluginRules,
    cypressResets,
    nodeRules,
    reactPluginRules,
    storybookResets,
    tsRules,
    typescriptRuleResets
} from './rules';
import {globals} from './settings/globals';
import {plugins} from './settings/plugins';
import {settings} from './settings/settings';
import {tsPlugins} from './settings/tsPlugins';

export const NFQEslintConfig = [
    settings,
    {
        files: ['**/*.{js,cjs,mjs,jsx}'],
        languageOptions: {
            ecmaVersion: 'latest',
            globals,
            parser: tsParser,
            parserOptions: {
                ecmaFeatures: {jsx: true},
                ecmaVersion: 'latest',
                project: '**/tsconfig*.json'
            }
        },
        linterOptions: {
            reportUnusedDisableDirectives: 'error',
            reportUnusedInlineConfigs: 'error'
        },
        name: 'NFQ ESLint JS Config',
        plugins,
        rules: {
            ...commonEslintRules,
            ...commonPluginRules,
            ...nodeRules,
            ...reactPluginRules
        }
    },
    {
        files: ['**/*.{ts,cts,mts,tsx}'],
        languageOptions: {
            ecmaVersion: 'latest',
            globals,
            parser: tsParser,
            parserOptions: {
                ecmaFeatures: {jsx: true},
                ecmaVersion: 'latest',
                project: '**/tsconfig*.json'
            }
        },
        linterOptions: {
            reportUnusedDisableDirectives: 'error',
            reportUnusedInlineConfigs: 'error'
        },
        name: 'NFQ ESLint TS Config',
        plugins: tsPlugins,
        rules: {
            ...commonEslintRules,
            ...commonPluginRules,
            ...nodeRules,
            ...reactPluginRules,
            ...tsRules,
            ...typescriptRuleResets
        }
    },
    {
        files: ['**/*.stories.{ts,cts,mts,tsx}'],
        languageOptions: {
            ecmaVersion: 'latest',
            globals,
            parser: tsParser,
            parserOptions: {
                ecmaFeatures: {jsx: true},
                ecmaVersion: 'latest',
                project: '**/tsconfig*.json'
            }
        },
        linterOptions: {
            reportUnusedDisableDirectives: 'error',
            reportUnusedInlineConfigs: 'error'
        },
        name: 'NFQ ESLint TS Story Config',
        plugins: tsPlugins,
        rules: {
            ...commonEslintRules,
            ...commonPluginRules,
            ...nodeRules,
            ...reactPluginRules,
            ...tsRules,
            ...typescriptRuleResets,
            ...storybookResets
        }
    },
    {
        files: ['**/*.cy.{ts,cts,mts,tsx}'],
        languageOptions: {
            ecmaVersion: 'latest',
            globals,
            parser: tsParser,
            parserOptions: {
                ecmaFeatures: {jsx: true},
                ecmaVersion: 'latest',
                project: '**/tsconfig*.json'
            }
        },
        linterOptions: {
            reportUnusedDisableDirectives: 'error',
            reportUnusedInlineConfigs: 'error'
        },
        name: 'NFQ ESLint Cypress Config',
        plugins: tsPlugins,
        rules: {
            ...commonEslintRules,
            ...commonPluginRules,
            ...nodeRules,
            ...reactPluginRules,
            ...tsRules,
            ...typescriptRuleResets,
            ...cypressPluginRules,
            ...cypressResets
        }
    }
];

export {globals, plugins, settings, tsPlugins};