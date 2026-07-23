export {};

/**
 *
 * @param name
 */
const fixture = (name: string) => `cypress/fixtures/rules/require-getcy/${name}`;

describe('require-getcy', () => {
    it('accepts getCy usage', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'require-getcy',
        valid: [
            {
                filename: fixture('valid-getcy.ts'),
                name: 'getCy'
            },
            {
                filename: fixture('valid-commands.ts'),
                name: 'getCy command definition'
            }
        ]
    }));

    it('accepts cy.get alias usage', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'require-getcy',
        valid: [
            {
                filename: fixture('valid-alias.ts'),
                name: 'alias get'
            }
        ]
    }));

    it('reports cy.get usage', () => cy.runRuleTester({
        invalid: [
            {
                errors: [
                    {messageId: 'useGetCy'}
                ],
                filename: fixture('invalid-data-cy.ts'),
                name: 'data-cy selector'
            },
            {
                errors: [
                    {messageId: 'useGetCy'}
                ],
                filename: fixture('invalid-selector.ts'),
                name: 'css selector'
            }
        ],
        ruleName: 'require-getcy',
        valid: []
    }));
});