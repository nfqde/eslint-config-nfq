export {};

/**
 *
 * @param name
 */
const fixture = (name: string) => `cypress/fixtures/rules/component-file-structure/${name}`;

describe('component-file-structure', () => {
    it('accepts a valid structure', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'component-file-structure',
        valid: [
            {
                filename: fixture('valid.tsx'),
                name: 'valid structure'
            }
        ]
    }));

    it('accepts non-component helpers', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'component-file-structure',
        valid: [
            {
                filename: fixture('valid-non-component-helpers.tsx'),
                name: 'valid with non-component helpers'
            }
        ]
    }));

    it('accepts Next page default export', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'component-file-structure',
        valid: [
            {
                filename: fixture('valid-page-default-export.tsx'),
                name: 'valid Next page default export'
            }
        ]
    }));

    it('accepts declarations between component and export', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'component-file-structure',
        valid: [
            {
                filename: fixture('valid-between-component-and-export.tsx'),
                name: 'valid declarations between component and export'
            }
        ]
    }));

    it('accepts styled attrs declarations', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'component-file-structure',
        valid: [
            {
                filename: fixture('valid-styled-attrs.tsx'),
                name: 'valid styled attrs declaration'
            }
        ]
    }));

    it('accepts class static displayName', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'component-file-structure',
        valid: [
            {
                filename: fixture('valid-class-static-displayname.tsx'),
                name: 'valid class static displayName'
            }
        ]
    }));

    it('accepts Next SSR page type', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'component-file-structure',
        valid: [
            {
                filename: fixture('valid-page-ssr-type.tsx'),
                name: 'valid Next SSR page type'
            }
        ]
    }));

    it('accepts forwardRef props types', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'component-file-structure',
        valid: [
            {
                filename: fixture('valid-forwardref-props.tsx'),
                name: 'valid forwardRef props'
            }
        ]
    }));

    it('accepts uppercase helper without JSX', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'component-file-structure',
        valid: [
            {
                filename: fixture('valid-non-jsx-uppercase-helper.ts'),
                name: 'valid uppercase helper without JSX'
            }
        ]
    }));

    it('accepts non-props type before props', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'component-file-structure',
        valid: [
            {
                filename: fixture('valid-nonprops-type-before-props.tsx'),
                name: 'valid non-props type before props'
            }
        ]
    }));

    it('accepts withComponent styled declaration', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'component-file-structure',
        valid: [
            {
                filename: fixture('valid-withComponent.tsx'),
                name: 'valid withComponent styled'
            }
        ]
    }));

    it('reports props type after component', () => cy.runRuleTester({
        invalid: [
            {
                errors: [
                    {messageId: 'invalidOrder'}
                ],
                filename: fixture('invalid-props-after.tsx'),
                name: 'props type after component'
            }
        ],
        ruleName: 'component-file-structure',
        valid: []
    }));

    it('requires displayName', () => cy.runRuleTester({
        invalid: [
            {
                errors: [
                    {messageId: 'missingDisplayName'}
                ],
                filename: fixture('invalid-missing-displayname.tsx'),
                name: 'missing displayName'
            }
        ],
        ruleName: 'component-file-structure',
        valid: []
    }));

    it('requires named export', () => cy.runRuleTester({
        invalid: [
            {
                errors: [
                    {messageId: 'missingNamedExport'}
                ],
                filename: fixture('invalid-missing-export.tsx'),
                name: 'missing named export'
            }
        ],
        ruleName: 'component-file-structure',
        valid: []
    }));

    it('reports styled components before export', () => cy.runRuleTester({
        invalid: [
            {
                errors: [
                    {messageId: 'invalidOrder'}
                ],
                filename: fixture('invalid-styled-before-export.tsx'),
                name: 'styled before export'
            }
        ],
        ruleName: 'component-file-structure',
        valid: []
    }));
});