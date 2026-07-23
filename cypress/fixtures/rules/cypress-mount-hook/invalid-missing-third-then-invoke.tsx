// @ts-nocheck
it('invalid', () => {
    cy.mountHook(() => useMyHook('a')).then(({MockComponent, values}) => {
        cy.wrap(values).as('values');
        cy.mount(<MockComponent />);
    }).then(() => {
        cy.get('@values').its('current').invoke('setValue', 'b');
    });
});
