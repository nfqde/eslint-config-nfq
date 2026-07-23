// @ts-nocheck
it('invalid', () => {
    cy.mountHooks(() => useA(), () => useB('x')).then((result) => {
        cy.wrap(result.values).as('values');
        cy.mount(<result.MockComponent />);
    });
});
