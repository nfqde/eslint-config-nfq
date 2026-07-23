export {};

/**
 *
 * @param name
 */
const fixture = (name: string) => `cypress/fixtures/rules/cypress-mount-hook/${name}`;

describe('cypress-mount-hook', () => {
    it('accepts valid mountHook usage', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'cypress-mount-hook',
        valid: [
            {
                filename: fixture('valid-mount-hook.tsx'),
                name: 'valid mountHook'
            },
            {
                filename: fixture('valid-mount-hooks.tsx'),
                name: 'valid mountHooks'
            },
            {
                filename: fixture('valid-mount-hook-invoke.tsx'),
                name: 'valid mountHook invoke'
            },
            {
                filename: fixture('valid-mount-hooks-invoke.tsx'),
                name: 'valid mountHooks invoke'
            }
        ]
    }));

    it('reports unwrapped hook usage', () => cy.runRuleTester({
        invalid: [
            {
                errors: [
                    {messageId: 'unwrappedHook'}
                ],
                filename: fixture('invalid-unwrapped-hook.tsx'),
                name: 'unwrapped hook'
            }
        ],
        ruleName: 'cypress-mount-hook',
        valid: []
    }));

    it('reports invalid mountHook arguments', () => cy.runRuleTester({
        invalid: [
            {
                errors: [
                    {messageId: 'invalidHookArgument'},
                    {messageId: 'unwrappedHook'}
                ],
                filename: fixture('invalid-arg.tsx'),
                name: 'invalid arg'
            }
        ],
        ruleName: 'cypress-mount-hook',
        valid: []
    }));

    it('reports invalid mountHooks arguments', () => cy.runRuleTester({
        invalid: [
            {
                errors: [
                    {messageId: 'invalidHookArgument'},
                    {messageId: 'unwrappedHook'}
                ],
                filename: fixture('invalid-hooks-arg.tsx'),
                name: 'invalid hooks arg'
            }
        ],
        ruleName: 'cypress-mount-hook',
        valid: []
    }));

    it('reports missing first then structure', () => cy.runRuleTester({
        invalid: [
            {
                errors: [
                    {messageId: 'missingThenDestructure'}
                ],
                filename: fixture('invalid-then-destructure.tsx'),
                name: 'missing destructure'
            }
        ],
        ruleName: 'cypress-mount-hook',
        valid: []
    }));

    it('reports missing first then structure for mountHooks', () => cy.runRuleTester({
        invalid: [
            {
                errors: [
                    {messageId: 'missingThenDestructure'}
                ],
                filename: fixture('invalid-hooks-then-destructure.tsx'),
                name: 'missing destructure hooks'
            }
        ],
        ruleName: 'cypress-mount-hook',
        valid: []
    }));

    it('reports missing mount or wrap', () => cy.runRuleTester({
        invalid: [
            {
                errors: [
                    {messageId: 'missingThenWrap'},
                    {messageId: 'missingMount'},
                    {messageId: 'invalidFirstThenStatement'}
                ],
                filename: fixture('invalid-missing-mount-wrap.tsx'),
                name: 'missing mount and wrap'
            }
        ],
        ruleName: 'cypress-mount-hook',
        valid: []
    }));

    it('reports missing mount or wrap for mountHooks', () => cy.runRuleTester({
        invalid: [
            {
                errors: [
                    {messageId: 'missingThenWrap'},
                    {messageId: 'missingMount'},
                    {messageId: 'invalidFirstThenStatement'}
                ],
                filename: fixture('invalid-hooks-missing-mount-wrap.tsx'),
                name: 'missing mount and wrap hooks'
            }
        ],
        ruleName: 'cypress-mount-hook',
        valid: []
    }));

    it('reports assertions in first then', () => cy.runRuleTester({
        invalid: [
            {
                errors: [
                    {messageId: 'assertionInFirstThen'},
                    {messageId: 'invalidFirstThenStatement'}
                ],
                filename: fixture('invalid-assertion-first-then.tsx'),
                name: 'assertion in first then'
            }
        ],
        ruleName: 'cypress-mount-hook',
        valid: []
    }));

    it('reports assertions in first then for mountHooks', () => cy.runRuleTester({
        invalid: [
            {
                errors: [
                    {messageId: 'assertionInFirstThen'},
                    {messageId: 'invalidFirstThenStatement'}
                ],
                filename: fixture('invalid-hooks-assertion-first-then.tsx'),
                name: 'assertion in first then hooks'
            }
        ],
        ruleName: 'cypress-mount-hook',
        valid: []
    }));

    it('reports extra statements in first then', () => cy.runRuleTester({
        invalid: [
            {
                errors: [
                    {messageId: 'invalidFirstThenStatement'}
                ],
                filename: fixture('invalid-extra-statement.tsx'),
                name: 'extra statement'
            }
        ],
        ruleName: 'cypress-mount-hook',
        valid: []
    }));

    it('reports extra statements in first then for mountHooks', () => cy.runRuleTester({
        invalid: [
            {
                errors: [
                    {messageId: 'invalidFirstThenStatement'}
                ],
                filename: fixture('invalid-hooks-extra-statement.tsx'),
                name: 'extra statement hooks'
            }
        ],
        ruleName: 'cypress-mount-hook',
        valid: []
    }));

    it('reports wrap-after-mount order', () => cy.runRuleTester({
        invalid: [
            {
                errors: [
                    {messageId: 'invalidThenOrder'}
                ],
                filename: fixture('invalid-then-order.tsx'),
                name: 'wrap after mount'
            }
        ],
        ruleName: 'cypress-mount-hook',
        valid: []
    }));

    it('reports wrap-after-mount order for mountHooks', () => cy.runRuleTester({
        invalid: [
            {
                errors: [
                    {messageId: 'invalidThenOrder'}
                ],
                filename: fixture('invalid-hooks-then-order.tsx'),
                name: 'wrap after mount hooks'
            }
        ],
        ruleName: 'cypress-mount-hook',
        valid: []
    }));

    it('reports missing second then for mountHook', () => cy.runRuleTester({
        invalid: [
            {
                errors: [
                    {messageId: 'missingSecondThen'}
                ],
                filename: fixture('invalid-missing-second-then.tsx'),
                name: 'missing second then'
            }
        ],
        ruleName: 'cypress-mount-hook',
        valid: []
    }));

    it('reports missing second then for mountHooks', () => cy.runRuleTester({
        invalid: [
            {
                errors: [
                    {messageId: 'missingSecondThen'}
                ],
                filename: fixture('invalid-hooks-missing-second-then.tsx'),
                name: 'missing second then hooks'
            }
        ],
        ruleName: 'cypress-mount-hook',
        valid: []
    }));

    it('reports missing then after invoke for mountHook', () => cy.runRuleTester({
        invalid: [
            {
                errors: [
                    {messageId: 'missingThenAfterInvoke'}
                ],
                filename: fixture('invalid-missing-third-then-invoke.tsx'),
                name: 'missing then after invoke'
            }
        ],
        ruleName: 'cypress-mount-hook',
        valid: []
    }));

    it('reports missing then after invoke for mountHooks', () => cy.runRuleTester({
        invalid: [
            {
                errors: [
                    {messageId: 'missingThenAfterInvoke'}
                ],
                filename: fixture('invalid-hooks-missing-third-then-invoke.tsx'),
                name: 'missing then after invoke hooks'
            }
        ],
        ruleName: 'cypress-mount-hook',
        valid: []
    }));
});