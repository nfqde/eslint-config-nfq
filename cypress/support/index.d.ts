/// <reference types="cypress" />

import './commands';

export interface RuleTestCase {
    errors?: {messageId: string}[];
    filename: string;
    name?: string;
    output?: string[] | string | null;
    settings?: Record<string, unknown>;
    sourceFilename?: string;
}

interface Payload {
    invalid: RuleTestCase[];
    ruleName: string;
    ruleOptions?: unknown[];
    valid: RuleTestCase[];
}

declare global {
    namespace Cypress {
        interface Chainable {
            runRuleTester(payload: Payload): Chainable<void>;
            task(
                event: 'runRuleTester',
                payload: {
                    invalid: RuleTestCase[];
                    ruleName: string;
                    ruleOptions?: unknown[];
                    valid: RuleTestCase[];
                }
            ): Chainable<{failures: string[]; ok: boolean}>;
        }

        interface Chainer<Subject> {
            /**
             * Custom Chai assertion that checks if given subject is an specific HTML element.
             *
             * @example
             * ```
             * expect('foo').to.be.an.htmlElement('button)
             * cy.wrap('foo').should('be.an.htmlElement', 'button')
             * ```
             */
            (chainer: 'be.an.htmlElement', value: string): Chainable<Subject>;
            /**
             * Custom Chai assertion that checks if given subject is an specific HTML element.
             *
             * @example
             * ```
             * expect('foo').to.not.be.an.htmlElement('button)
             * cy.wrap('foo').should('not.be.an.htmlElement', 'button')
             * ```
             */
            // eslint-disable-next-line @typescript-eslint/unified-signatures
            (chainer: 'not.be.an.htmlElement', value: string): Chainable<Subject>;
        }
    }
}