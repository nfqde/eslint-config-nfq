export {};

/**
 *
 * @param name
 */
const fixture = (name: string) => `cypress/fixtures/rules/component-single-hook/${name}`;

describe('component-single-hook', () => {
    it('accepts components without hooks', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'component-single-hook',
        valid: [
            {
                filename: fixture('valid-no-hook.tsx'),
                name: 'no hook'
            }
        ]
    }));

    it('accepts a single hook call', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'component-single-hook',
        valid: [
            {
                filename: fixture('valid-one-hook.tsx'),
                name: 'one hook'
            }
        ]
    }));

    it('accepts guard clauses', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'component-single-hook',
        valid: [
            {
                filename: fixture('valid-guard.tsx'),
                name: 'guard clause'
            }
        ]
    }));

    it('accepts ternary returns', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'component-single-hook',
        valid: [
            {
                filename: fixture('valid-ternary.tsx'),
                name: 'ternary return'
            }
        ]
    }));

    it('accepts wrapped components', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'component-single-hook',
        valid: [
            {
                filename: fixture('valid-wrapped.tsx'),
                name: 'wrapped component'
            }
        ]
    }));

    it('skips non-JSX files with uppercase functions', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'component-single-hook',
        valid: [
            {
                filename: fixture('valid-non-jsx-uppercase.ts'),
                name: 'non-jsx uppercase function'
            }
        ]
    }));

    it('reports multiple hook calls', () => cy.runRuleTester({
        invalid: [
            {
                errors: [
                    {messageId: 'tooManyHooks'}
                ],
                filename: fixture('invalid-two-hooks.tsx'),
                name: 'two hooks'
            }
        ],
        ruleName: 'component-single-hook',
        valid: []
    }));

    it('reports extra statements after hook', () => cy.runRuleTester({
        invalid: [
            {
                errors: [
                    {messageId: 'invalidStatement'}
                ],
                filename: fixture('invalid-extra-const.tsx'),
                name: 'extra const'
            }
        ],
        ruleName: 'component-single-hook',
        valid: []
    }));

    it('reports extra statements without hook', () => cy.runRuleTester({
        invalid: [
            {
                errors: [
                    {messageId: 'invalidStatement'}
                ],
                filename: fixture('invalid-const-no-hook.tsx'),
                name: 'const without hook'
            }
        ],
        ruleName: 'component-single-hook',
        valid: []
    }));

    it('reports non-guard if statements', () => cy.runRuleTester({
        invalid: [
            {
                errors: [
                    {messageId: 'invalidStatement'}
                ],
                filename: fixture('invalid-non-guard-if.tsx'),
                name: 'non-guard if'
            }
        ],
        ruleName: 'component-single-hook',
        valid: []
    }));
});