export {};

/**
 *
 * @param name
 */
const fixture = (name: string) => `cypress/fixtures/rules/no-unbound-method/${name}`;

describe('no-unbound-method', () => {
    it('accepts autobind', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'no-unbound-method',
        valid: [
            {
                filename: fixture('autobind.ts'),
                name: 'autobind'
            }
        ]
    }));

    it('accepts bound calls', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'no-unbound-method',
        valid: [
            {
                filename: fixture('bound-calls.ts'),
                name: 'bound calls'
            }
        ]
    }));

    it('accepts arrow wrapper', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'no-unbound-method',
        valid: [
            {
                filename: fixture('arrow-wrapper.ts'),
                name: 'arrow wrapper'
            }
        ]
    }));

    it('accepts static methods', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'no-unbound-method',
        valid: [
            {
                filename: fixture('static-method.ts'),
                name: 'static method'
            }
        ]
    }));

    it('accepts no this usage', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'no-unbound-method',
        valid: [
            {
                filename: fixture('no-this.ts'),
                name: 'no this usage'
            }
        ]
    }));

    it('accepts makeAutoObservable autoBind', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'no-unbound-method',
        valid: [
            {
                filename: fixture('auto-bind-make-auto-observable.ts'),
                name: 'makeAutoObservable autoBind'
            }
        ]
    }));

    it('reports unbound argument', () => cy.runRuleTester({
        invalid: [
            {
                errors: [
                    {messageId: 'unboundMethod'}
                ],
                filename: fixture('unbound-arg.ts'),
                name: 'unbound argument'
            }
        ],
        ruleName: 'no-unbound-method',
        valid: []
    }));

    it('reports assigned method', () => cy.runRuleTester({
        invalid: [
            {
                errors: [
                    {messageId: 'unboundMethod'}
                ],
                filename: fixture('assigned.ts'),
                name: 'assigned method'
            }
        ],
        ruleName: 'no-unbound-method',
        valid: []
    }));

    it('reports constructor bind', () => cy.runRuleTester({
        invalid: [
            {
                errors: [
                    {messageId: 'constructorBind'}
                ],
                filename: fixture('constructor-bind.ts'),
                name: 'constructor bind'
            }
        ],
        ruleName: 'no-unbound-method',
        valid: []
    }));

    it('reports jsx prop', () => cy.runRuleTester({
        invalid: [
            {
                errors: [
                    {messageId: 'unboundMethod'}
                ],
                filename: fixture('jsx-prop.tsx'),
                name: 'jsx prop'
            }
        ],
        ruleName: 'no-unbound-method',
        valid: []
    }));

    it('accepts custom decorator names', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'no-unbound-method',
        ruleOptions: [{decoratorNames: ['bound']}],
        valid: [
            {
                filename: fixture('decorator-bound.ts'),
                name: 'custom decorator'
            }
        ]
    }));
});