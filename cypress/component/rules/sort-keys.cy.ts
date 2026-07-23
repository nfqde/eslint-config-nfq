export {};

/**
 *
 * @param name
 */
const fixture = (name: string) => `cypress/fixtures/rules/sort-keys/${name}`;

const fixedInvalid = String.raw`// @ts-nocheck
const obj = {
    a: 2,
    b: 1
};
`;

const fixedIgnoredOrder = String.raw`// @ts-nocheck
const sizes = {
    sm: 1,
    md: 2,
    lg: 3
};
`;

const fixedIgnoredExtra = String.raw`// @ts-nocheck
const sizes = {
    alpha: 2,
    sm: 1
};
`;

describe('sort-keys', () => {
    it('accepts sorted keys', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'sort-keys',
        valid: [
            {
                filename: fixture('valid.ts'),
                name: 'sorted keys'
            }
        ]
    }));

    it('reports unsorted keys', () => cy.runRuleTester({
        invalid: [
            {
                errors: [
                    {messageId: 'outOfOrder'}
                ],
                filename: fixture('invalid.ts'),
                name: 'unsorted keys',
                output: fixedInvalid
            }
        ],
        ruleName: 'sort-keys',
        valid: []
    }));

    it('accepts descending order with option', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'sort-keys',
        ruleOptions: ['desc'],
        valid: [
            {
                filename: fixture('desc.ts'),
                name: 'descending order'
            }
        ]
    }));

    it('accepts case-insensitive order', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'sort-keys',
        ruleOptions: ['asc', {caseSensitive: false}],
        valid: [
            {
                filename: fixture('case-insensitive.ts'),
                name: 'case insensitive'
            }
        ]
    }));

    it('accepts natural order', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'sort-keys',
        ruleOptions: ['asc', {natural: true}],
        valid: [
            {
                filename: fixture('natural.ts'),
                name: 'natural order'
            }
        ]
    }));

    it('accepts method grouping order', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'sort-keys',
        ruleOptions: ['asc', {methodsExtra: true}],
        valid: [
            {
                filename: fixture('methods-extra.ts'),
                name: 'methods extra'
            }
        ]
    }));

    it('accepts ignored prop types', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'sort-keys',
        ruleOptions: ['asc', {ignorePropTypes: true}],
        valid: [
            {
                filename: fixture('ignore-prop-types.ts'),
                name: 'ignore prop types'
            }
        ]
    }));

    it('accepts ignored properties order when fully matching', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'sort-keys',
        valid: [
            {
                filename: fixture('ignored-only.ts'),
                name: 'ignored properties full',
                settings: {'@nfq': {ignoredProperties: ['sm', 'md', 'lg']}}
            }
        ]
    }));

    it('accepts ignored properties order when partially matching', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'sort-keys',
        valid: [
            {
                filename: fixture('ignored-subset.ts'),
                name: 'ignored properties subset',
                settings: {'@nfq': {ignoredProperties: ['sm', 'md', 'lg']}}
            }
        ]
    }));

    it('reports ignored properties out of order', () => cy.runRuleTester({
        invalid: [
            {
                errors: [
                    {messageId: 'ignoredPropertiesOrder'}
                ],
                filename: fixture('ignored-only-invalid.ts'),
                name: 'ignored properties order',
                output: fixedIgnoredOrder,
                settings: {'@nfq': {ignoredProperties: ['sm', 'md', 'lg']}}
            }
        ],
        ruleName: 'sort-keys',
        valid: []
    }));

    it('reports mixed ignored and extra properties', () => cy.runRuleTester({
        invalid: [
            {
                errors: [
                    {messageId: 'outOfOrder'}
                ],
                filename: fixture('ignored-extra.ts'),
                name: 'ignored properties with extra',
                output: fixedIgnoredExtra,
                settings: {'@nfq': {ignoredProperties: ['sm', 'md', 'lg']}}
            }
        ],
        ruleName: 'sort-keys',
        valid: []
    }));
});