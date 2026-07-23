// @ts-nocheck
it('invalid', () => {
    cy.mountHook(() => {
        const value = useMyHook('a');

        return value;
    }).then(({MockComponent, values}) => {
        cy.wrap(values).as('values');
        cy.mount(<MockComponent />);
    });
});
