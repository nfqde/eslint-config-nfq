---
title: @nfq/cypress-mount-hook
rule_type: suggestion
---

Enforces a consistent `cy.mountHook` / `cy.mountHooks` usage pattern inside Cypress `it` blocks.

## Rule Details

Hook calls must be wrapped by `cy.mountHook` or `cy.mountHooks`.

Accepted forms:

```ts
cy.mountHook(useMyHook)
cy.mountHook(() => useMyHook('arg'))
cy.mountHooks(useA, useB)
cy.mountHooks(() => useA(), () => useB('x'))
```

The first `.then` must destructure `{MockComponent, values}`, call `cy.wrap(values).as('values')`, and then mount the `MockComponent`.
Only those two statements are allowed in the first `.then`.

The second `.then` is required for assertions.
If the second `.then` uses `cy.get('@values').its('current').invoke(...)`, a third `.then` is required to assert updated values.

Examples of **incorrect** code for this rule:

::: incorrect

```ts
it('bad', () => {
    const value = useMyHook();

    cy.mountHook(() => useMyHook()).then(() => {});
});
```

```ts
it('bad', () => {
    cy.mountHook(() => useMyHook()).then(({MockComponent, values}) => {
        cy.mount(<MockComponent />);
        expect(values.current).to.equal('x');
    });
});
```

:::

Examples of **correct** code for this rule:

::: correct

```ts
it('good', () => {
    cy.mountHook(() => useMyHook('x')).then(({MockComponent, values}) => {
        cy.wrap(values).as('values');
        cy.mount(<MockComponent />);
    }).then(() => {
        cy.get('@values').its('current').should('eq', 'x');
    });
});

it('good', () => {
    cy.mountHook(() => useMyHook('x')).then(({MockComponent, values}) => {
        cy.wrap(values).as('values');
        cy.mount(<MockComponent />);
    }).then(() => {
        cy.get('@values').its('current').invoke('setValue', 'y');
    }).then(() => {
        cy.get('@values').its('current').should('eq', 'y');
    });
});
```

:::
