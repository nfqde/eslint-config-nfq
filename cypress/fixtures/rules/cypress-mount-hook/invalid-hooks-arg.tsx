// @ts-nocheck
it('invalid', () => {
    cy.mountHooks(() => {
        const value = useA();

        return value;
    }, () => useB('x')).then(({MockComponent, values}) => {
        cy.wrap(values).as('values');
        cy.mount(<MockComponent />);
    });
});
