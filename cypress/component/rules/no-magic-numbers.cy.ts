export {};

/**
 *
 * @param name
 */
const fixture = (name: string) => `cypress/fixtures/rules/no-magic-numbers/${name}`;

describe('no-magic-numbers', () => {
    it('accepts configured safe numbers', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'no-magic-numbers',
        ruleOptions: [{}],
        valid: [
            {
                filename: fixture('valid.ts'),
                name: 'valid numbers'
            }
        ]
    }));

    it('reports magic numbers', () => cy.runRuleTester({
        invalid: [
            {
                errors: [
                    {messageId: 'noMagic'}
                ],
                filename: fixture('invalid.ts'),
                name: 'magic number'
            }
        ],
        ruleName: 'no-magic-numbers',
        ruleOptions: [{}],
        valid: []
    }));

    it('accepts arrays when ignoreArrays is true', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'no-magic-numbers',
        ruleOptions: [{ignoreArrays: true}],
        valid: [
            {
                filename: fixture('ignore-arrays.ts'),
                name: 'ignore arrays'
            }
        ]
    }));

    it('requires const when enforceConst is true', () => cy.runRuleTester({
        invalid: [
            {
                errors: [
                    {messageId: 'useConst'}
                ],
                filename: fixture('enforce-const.ts'),
                name: 'enforce const'
            }
        ],
        ruleName: 'no-magic-numbers',
        ruleOptions: [{enforceConst: true}],
        valid: []
    }));

    it('accepts ignored functions', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'no-magic-numbers',
        ruleOptions: [{ignoreFunctions: ['clamp', 'max']}],
        valid: [
            {
                filename: fixture('ignore-functions.ts'),
                name: 'ignore functions'
            }
        ]
    }));
});