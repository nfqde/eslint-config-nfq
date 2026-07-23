export {};

const fixedInvalid = `// @ts-nocheck
const obj = {
    a: 1,
    b: 2
};
`;

describe('no-empty-lines-in-objects', () => {
    it('accepts objects without blank lines', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'no-empty-lines-in-objects',
        valid: [
            {
                filename: 'cypress/fixtures/rules/no-empty-lines-in-objects/valid.ts',
                name: 'valid object'
            }
        ]
    }));

    it('reports empty lines inside objects', () => cy.runRuleTester({
        invalid: [
            {
                errors: [
                    {messageId: 'noEmptyLine'}
                ],
                filename: 'cypress/fixtures/rules/no-empty-lines-in-objects/invalid.ts',
                name: 'empty line in object',
                output: fixedInvalid
            }
        ],
        ruleName: 'no-empty-lines-in-objects',
        valid: []
    }));
});