// @ts-nocheck
it('invalid', () => {
    cy.mountHooks(() => useA(), () => useB('x')).then(({MockComponent, values}) => {
        cy.wrap(values).as('values');
        cy.mount(<MockComponent />);
    }).then(() => {
        cy.get('@values').its('current').invoke('setValue', 'y');
    });
});
