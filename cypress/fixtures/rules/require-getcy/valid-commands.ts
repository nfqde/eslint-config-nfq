// @ts-nocheck
Cypress.Commands.add('getCy', value => cy.get(`[data-cy="${value}"]`));
