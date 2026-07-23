import globalsEslint from 'globals';

export const globals: Record<string, boolean> = {
    after: false,
    afterEach: false,
    before: false,
    beforeEach: false,
    chai: false,
    Chai: false,
    context: false,
    cy: false,
    Cypress: false,
    describe: false,
    it: false,
    JQuery: false,
    JSX: false,
    NodeJS: false,
    ...globalsEslint.browser,
    ...globalsEslint.node,
    ...globalsEslint.builtin,
    ...globalsEslint.chai,
    ...globalsEslint.es2026
};