const arrays = require.resolve('./arrays');
const bestPractices = require.resolve('./best-practices');
const errors = require.resolve('./errors');
const es6 = require.resolve('./es6');
const imports = require.resolve('./imports');
const node = require.resolve('./node');
const performance = require.resolve('./performance');
const promises = require.resolve('./promises');
const reactHooks = require.resolve('./react-hooks');
const react = require.resolve('./react');
const reactA11y = require.resolve('./react-a11y');
const sanitize = require.resolve('./sanitize');
const security = require.resolve('./security');
const strict = require.resolve('./strict');
const style = require.resolve('./style');
const styledComponents = require.resolve('./styled-components');
const variables = require.resolve('./variables');

module.exports = [
    arrays,
    bestPractices,
    errors,
    es6,
    imports,
    node,
    performance,
    promises,
    reactHooks,
    react,
    reactA11y,
    sanitize,
    security,
    strict,
    style,
    styledComponents,
    variables
];