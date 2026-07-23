export {};

/**
 *
 * @param name
 */
const fixture = (name: string) => `cypress/fixtures/rules/spread-transient-props/${name}`;

describe('spread-transient-props', () => {
    it('accepts spread transient and object literal options', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'spread-transient-props',
        valid: [
            {
                filename: fixture('valid-spread.ts'),
                name: 'spread transient'
            },
            {
                filename: fixture('valid-object-literal.ts'),
                name: 'object literal options'
            },
            {
                filename: fixture('valid-unrelated.ts'),
                name: 'single argument and unrelated calls'
            }
        ]
    }));

    it('reports and fixes bare transient identifier', () => cy.runRuleTester({
        invalid: [
            {
                errors: [
                    {messageId: 'spreadTransient'}
                ],
                filename: fixture('invalid-identifier.ts'),
                name: 'bare transient identifier',
                output: '// @ts-nocheck\nconst TableRow = styled(\'tr\', {...transient})``;\n'
            }
        ],
        ruleName: 'spread-transient-props',
        valid: []
    }));
});
