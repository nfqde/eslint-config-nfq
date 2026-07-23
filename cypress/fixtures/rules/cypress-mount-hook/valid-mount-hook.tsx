// @ts-nocheck
it('valid', () => {
    cy.mountHook(() => useMyHook('a')).then(({MockComponent, values}) => {
        cy.wrap(values).as('values');
        cy.mount(
            <Wrapper>
                <MockComponent />
            </Wrapper>
        );
    }).then(() => {
        cy.get('@values').its('current').should('eq', 'a');
    });
});
