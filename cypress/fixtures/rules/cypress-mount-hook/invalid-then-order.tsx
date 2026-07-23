// @ts-nocheck
it('invalid', () => {
    cy.mountHook(() => useMyHook('a')).then(({MockComponent, values}) => {
        cy.mount(<MockComponent />);
        cy.wrap(values).as('values');
    }).then(() => {
        cy.get('@values').its('current').should('eq', 'a');
    });
});
