// @ts-nocheck
it('invalid', () => {
    cy.mountHooks(() => useA(), () => useB('x')).then(({MockComponent, values}) => {
        cy.mount(<MockComponent />);
        cy.wrap(values).as('values');
    }).then(() => {
        cy.get('@values').its('current').should('exist');
    });
});
