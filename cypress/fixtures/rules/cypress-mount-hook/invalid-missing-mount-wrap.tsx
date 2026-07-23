// @ts-nocheck
it('invalid', () => {
    cy.mountHook(() => useMyHook('a')).then(({MockComponent, values}) => {
        void MockComponent;
        void values;
    });
});
