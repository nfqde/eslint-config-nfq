// @ts-nocheck
it('invalid', () => {
    cy.mountHook(() => useMyHook('a')).then((result) => {
        cy.wrap(result.values).as('values');
        cy.mount(<result.MockComponent />);
    });
});
