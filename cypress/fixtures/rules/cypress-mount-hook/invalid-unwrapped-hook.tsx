// @ts-nocheck
it('invalid', () => {
    const value = useMyHook('a');

    cy.wrap(value).should('exist');
});
