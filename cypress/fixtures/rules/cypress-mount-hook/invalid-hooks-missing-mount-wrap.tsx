// @ts-nocheck
it('invalid', () => {
    cy.mountHooks(() => useA(), () => useB('x')).then(({MockComponent, values}) => {
        void MockComponent;
        void values;
    });
});
