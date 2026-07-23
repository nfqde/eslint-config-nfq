export {};

const fixedInvalid = `// @ts-nocheck
interface User {
    id: number;
    name: string;
}
`;

describe('no-empty-lines-in-types', () => {
    it('accepts type bodies without blank lines', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'no-empty-lines-in-types',
        valid: [
            {
                filename: 'cypress/fixtures/rules/no-empty-lines-in-types/valid.ts',
                name: 'valid types'
            }
        ]
    }));

    it('reports empty lines inside types', () => cy.runRuleTester({
        invalid: [
            {
                errors: [
                    {messageId: 'noEmptyLine'}
                ],
                filename: 'cypress/fixtures/rules/no-empty-lines-in-types/invalid.ts',
                name: 'empty line in types',
                output: fixedInvalid
            }
        ],
        ruleName: 'no-empty-lines-in-types',
        valid: []
    }));
});