// @ts-nocheck
it('valid', () => {
    cy.mountHooks(() => useA(), () => useB('x')).then(({MockComponent, values}) => {
        cy.wrap(values).as('values');
        cy.mount(<MockComponent />);
    }).then(() => {
        cy.get('@values').its('current').invoke('setValue', 'y');
    }).then(() => {
        cy.get('@values').its('current').should('eq', 'y');
    });
});
