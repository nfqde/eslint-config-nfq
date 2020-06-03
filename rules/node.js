/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable no-inline-comments */

module.exports = {
    rules: {
        // Best practice
        'node/no-deprecated-api': 'error', // disallows deprecated methods from node. https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-deprecated-api.md

        // Stylistic
        'node/callback-return': 'off', // enforce return after a callback https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/callback-return.md
        'node/exports-style': ['error', 'module.exports'], // defines the export style. https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/exports-style.md
        'node/file-extension-in-import': 'off', // define import extensions. https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/file-extension-in-import.md
        'node/global-require': 'off', // require all requires be top-level https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/global-require.md
        'node/no-mixed-requires': 'error', // disallow mixing regular variable and require declarations https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-mixed-requires.md
        'node/no-process-env': 'off', // disallow use of process.env https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-process-env.md
        'node/no-restricted-import': 'off', // This rule allows you to specify modules that you don’t want to use in your application. https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-restricted-import.md
        'node/no-restricted-require': 'off', // This rule allows you to specify modules that you don’t want to use in your application. https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-restricted-require.md
        'node/no-sync': 'warn', // disallow use of synchronous methods (off by default) https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-sync.md
        'node/prefer-global/buffer': ['error', 'always'], // disallow use of the Buffer() constructor https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/buffer.md
        'node/prefer-global/console': ['error', 'always'], // prefers the global console. https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/console.md
        'node/prefer-global/process': ['error', 'always'], // prefers the global process. https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/process.md
        'node/prefer-global/text-decoder': ['error', 'always'], // prefers the global TextDecoder. https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/text-decoder.md
        'node/prefer-global/text-encoder': ['error', 'always'], // prefers the global TextEncoder. https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/text-encoder.md
        'node/prefer-global/url': ['error', 'always'], // prefers the global URL. https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/url.md
        'node/prefer-global/url-search-params': ['error', 'always'], // prefers the global URLSearchParams. https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/url-search-params.md
        'node/prefer-promises/dns': 'error', // prefers async/await dns over callback. https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-promises/dns.md
        'node/prefer-promises/fs': 'error', // prefers async/await fs over callback. https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-promises/fs.md

        // Errors
        'node/handle-callback-err': 'error', // enforces error handling in callbacks (node environment) https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/handle-callback-err.md
        'node/no-callback-literal': 'error', // disallow literals for errors in callbacks. https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-callback-literal.md
        'node/no-exports-assign': 'error', // prevent exports usage as var name and assignment target. https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-exports-assign.md
        'node/no-extraneous-import': 'off', // Prevent from importing packages not installed locally. https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-extraneous-import.md
        'node/no-extraneous-require': 'off', // Prevent from requiring packages not installed locally. https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-extraneous-require.md
        'node/no-missing-import': 'off', // No missing imports. Is handled from imports module. https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-missing-import.md
        'node/no-missing-require': 'off', // No missing imports. Is handled from imports module. https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-missing-require.md
        'node/no-new-require': 'error', // disallow use of new operator with the require function https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-new-require.md
        'node/no-path-concat': 'error', // disallow string concatenation with __dirname and __filename https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-path-concat.md
        'node/no-process-exit': 'off', // disallow process.exit() https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-process-exit.md
        'node/no-unpublished-bin': 'off', // Don't use not existant bin fields. https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-unpublished-bin.md
        'node/no-unpublished-import': 'off', // Don't use not existant import fields. https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-unpublished-import.md
        'node/no-unpublished-require': 'off', // Don't use not existant require fields. https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-unpublished-require.md
        'node/no-unsupported-features/es-builtins': 'error', // disallow the usage of unsupported features. https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-unsupported-features/es-builtins.md
        'node/no-unsupported-features/es-syntax': ['error', {ignores: ['modules', 'classes', 'dynamicImport']}], // disallow the usage of unsupported es6 features. https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-unsupported-features/es-syntax.md
        'node/no-unsupported-features/node-builtins': 'error', // disallow the usage of unsupported node buildin modules. https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-unsupported-features/node-builtins.md
        'node/process-exit-as-throw': 'error', // enables eslint to read process.exit() as code stop. https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/process-exit-as-throw.md
        'node/shebang': 'error' // looks for shebang in node bin modules. https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/shebang.md
    }
};