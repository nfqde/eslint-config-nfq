// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('runRuleTester', payload => {
    cy.task('runRuleTester', {
        invalid: payload.invalid,
        ruleName: payload.ruleName,
        ruleOptions: payload.ruleOptions,
        valid: payload.valid
    }).then(result => {
        // eslint-disable-next-line promise/always-return, @typescript-eslint/no-unnecessary-condition
        const failureMessage = result.ok ? undefined : (result.failures ?? []).join('\n');

        expect(result.ok, failureMessage).to.eq(true);
    });
});

/**
 * Tests if an element is of an specific type.
 *
 * @param chai The chai object.
 */
const isHtmlElement = (chai: Chai.ChaiStatic) => {
    /**
     * Asserts for an specific html tagName.
     *
     * @param tagName Options given to the command.
     */
    function assertHtmlElement(this: Chai.AssertionStatic, tagName: string) {
        this.assert(
            // eslint-disable-next-line no-underscore-dangle
            (this._obj as HTMLElement[])[0].tagName.toLowerCase() === tagName.toLowerCase(),
            `expected #{this} to be HtmlElement ${tagName.toLowerCase()}`,
            `expected #{this} to not be HtmlElement ${tagName.toLowerCase()}`,
            // eslint-disable-next-line no-underscore-dangle
            this._obj
        );
    }

    chai.Assertion.addMethod('htmlElement', assertHtmlElement);
};

chai.use(isHtmlElement);