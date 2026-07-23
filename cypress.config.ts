import {defineConfig} from 'cypress';

import {runRuleTester} from './cypress/support/tasks';

import type {RuleTestPayload} from './cypress/support/tasks';
import type {Configuration} from 'webpack';

export default defineConfig({
    component: {
        devServer: {
            bundler: 'webpack',
            framework: 'react',
            /**
             * The webpack configuration to use when bundling your components.
             *
             * @returns Webpack configuration.
             */
            webpackConfig() {
                const config: Configuration = {
                    module: {
                        rules: [
                            {
                                test: /\.(js|jsx|ts|tsx)$/u,
                                use: {loader: 'babel-loader'}
                            },
                            {
                                test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/u,
                                type: 'asset/resource'
                            }
                        ]
                    },
                    resolve: {
                        extensions: [
                            '.js',
                            '.jsx',
                            '.ts',
                            '.tsx',
                            '.css',
                            '.png',
                            '.jpeg',
                            '.jpg',
                            '.json',
                            '.svg'
                        ]
                    },
                    target: 'web'
                };

                return config;
            }
        },
        env: {
            codeCoverage: {exclude: ['cypress/**/*.*']},
            NODE_ENV: 'test'
        },
        reporter: 'mochawesome',
        reporterOptions: {
            html: false,
            json: true,
            overwrite: false,
            reportDir: 'cypress/reports'
        },
        video: false,
        /**
         * Sets up plugins and so on.
         *
         * @param on     Cypress event handler.
         * @param config Cypress configuration.
         * @returns Cypress configuration.
         */
        setupNodeEvents(on, config) {
            on('task', {
                /**
                 * This task handler runs the shared rule tester for Cypress tasks.
                 * It forwards the payload to the local runner and returns its result to Cypress.
                 * It acts as a thin wrapper that keeps task wiring concise and consistent.
                 *
                 * @param payload The rule test payload containing the rule name, options, and cases.
                 * @returns The result of running the rule tester, including success status and any failures.
                 *
                 * @example
                 * ```tsx
                 * runRuleTester({ruleName: 'sort-keys', valid: [], invalid: []});
                 * ```
                 */
                runRuleTester(payload: RuleTestPayload) {
                    return runRuleTester(payload);
                }
            });

            return config;
        }
    },
    video: false
});