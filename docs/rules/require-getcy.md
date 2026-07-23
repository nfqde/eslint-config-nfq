---
title: @nfq/require-getcy
rule_type: suggestion
---

Requires the custom Cypress command `cy.getCy()` instead of `cy.get()`. This mirrors the intent of `cypress/require-data-selectors` but enforces the project convention to use `getCy` for `data-cy` selectors.
`cy.get()` is allowed only for Cypress aliases (strings starting with `@`).

## Rule Details

Examples of **incorrect** code for this rule:

::: incorrect

```ts
cy.get('[data-cy="submit"]');
cy.get('.button');
```

:::

Examples of **correct** code for this rule:

::: correct

```ts
cy.getCy('submit');
```

```ts
Cypress.Commands.add('getCy', value => cy.get(`[data-cy="${value}"]`));
```

:::
