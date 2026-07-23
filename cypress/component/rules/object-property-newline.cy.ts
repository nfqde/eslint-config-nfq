export {};

/**
 *
 * @param name
 */
const fixture = (name: string) => `cypress/fixtures/rules/object-property-newline/${name}`;

const fixedInvalid = String.raw`// @ts-nocheck
const obj = {a: 1,
b: 2};
`;

const fixedIgnoredExtra = String.raw`// @ts-nocheck
const sizes = {xs: 1,
sm: 2,
other: 3};
`;

describe('object-property-newline', () => {
    it('accepts objects with one property per line', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'object-property-newline',
        valid: [
            {
                filename: fixture('valid.ts'),
                name: 'valid newline'
            }
        ]
    }));

    it('reports properties on the same line', () => cy.runRuleTester({
        invalid: [
            {
                errors: [
                    {messageId: 'propertiesOnNewline'}
                ],
                filename: fixture('invalid.ts'),
                name: 'same line properties',
                output: fixedInvalid
            }
        ],
        ruleName: 'object-property-newline',
        valid: []
    }));

    it('allows same-line properties with option', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'object-property-newline',
        ruleOptions: [{allowAllPropertiesOnSameLine: true}],
        valid: [
            {
                filename: fixture('invalid.ts'),
                name: 'same line allowed'
            }
        ]
    }));

    it('accepts ignored properties when fully matching', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'object-property-newline',
        ruleOptions: [{ignoredProperties: ['xs', 'sm', 'md']}],
        valid: [
            {
                filename: fixture('ignored-all.ts'),
                name: 'ignored properties all'
            }
        ]
    }));

    it('accepts ignored properties from settings', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'object-property-newline',
        valid: [
            {
                filename: fixture('ignored-all.ts'),
                name: 'ignored properties settings',
                settings: {'@nfq': {ignoredProperties: ['xs', 'sm', 'md']}}
            }
        ]
    }));

    it('accepts ignored properties when partially matching', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'object-property-newline',
        ruleOptions: [{ignoredProperties: ['xs', 'sm', 'md']}],
        valid: [
            {
                filename: fixture('ignored-some.ts'),
                name: 'ignored properties some'
            }
        ]
    }));

    it('reports mixed ignored and extra properties', () => cy.runRuleTester({
        invalid: [
            {
                errors: [
                    {messageId: 'propertiesOnNewline'},
                    {messageId: 'propertiesOnNewline'}
                ],
                filename: fixture('ignored-extra.ts'),
                name: 'ignored properties with extra',
                output: fixedIgnoredExtra
            }
        ],
        ruleName: 'object-property-newline',
        ruleOptions: [{ignoredProperties: ['xs', 'sm', 'md']}],
        valid: []
    }));
});