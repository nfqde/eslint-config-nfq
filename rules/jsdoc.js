/* eslint-disable no-inline-comments */
module.exports = {
    rules: {
        'jsdoc/check-access': 'off', // checks access keyword for right values https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-access.md
        'jsdoc/check-alignment': 'error', // Reports invalid alignment of JSDoc block asterisks. https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-alignment.md
        'jsdoc/check-examples': 'off', // Reports invalid examples in JSDoc comments. (Waiting for eslint 8 support) https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-examples.md
        'jsdoc/check-indentation': 'error', // Reports invalid indentation of JSDoc block. https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-indentation.md
        'jsdoc/check-line-alignment': [
            'error',
            'always',
            {tags: ['param', 'arg', 'argument', 'property', 'prop']}
        ], // Reports invalid alignment of JSDoc block lines. https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-indentation.md
        'jsdoc/check-param-names': [
            'error',
            {
                checkDestructured: false,
                checkRestProperty: false,
                enableFixer: true
            }
        ], // Reports invalid parameter names in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-param-names.md
        'jsdoc/check-property-names': [
            'error',
            {enableFixer: true}
        ], // Reports invalid property names in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-property-names.md
        'jsdoc/check-syntax': 'error', // Reports invalid JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-syntax.md
        'jsdoc/check-tag-names': 'error', // Reports invalid tag names in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-tag-names.md
        'jsdoc/check-types': 'error', // Reports invalid types in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-types.md
        'jsdoc/check-values': 'error', // This rule checks the values for a handful of tags. https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-values.md
        'jsdoc/empty-tags': 'error', // Reports non empty JSDoc tags that should be empty. https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/empty-tags.md
        'jsdoc/implements-on-classes': 'error', // Reports missing @implements tag on classes. https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/implements-on-classes.md
        'jsdoc/match-description': 'error', // Reports invalid descriptions in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/match-description.md
        'jsdoc/match-name': 'off', // Reports invalid names in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/match-name.md
        'jsdoc/multiline-blocks': [
            'error',
            {
                noFinalLineText: true,
                noMultilineBlocks: false,
                noSingleLineBlocks: false,
                noZeroLineText: true

            }
        ], // Controls how and whether jsdoc blocks can be expressed as single or multiple line blocks. https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/multiline-blocks.md
        'jsdoc/no-bad-blocks': 'error', // Reports invalid JSDoc block tags. https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/no-bad-blocks.md
        'jsdoc/no-defaults': 'off', // Reports default params if used. https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/no-defaults.md
        'jsdoc/no-missing-syntax': 'off', // Reports missing JSDoc syntax. https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/no-missing-syntax.md
        'jsdoc/no-multi-asterisks': 'error', // Prevents use of multiple asterisks at the beginning of lines. https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/no-multi-asterisks.md
        'jsdoc/no-restricted-syntax': 'off', // Reports invalid JSDoc syntax. https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/no-restricted-syntax.md
        'jsdoc/no-types': 'off', // Reports redundant types in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/no-types.md
        'jsdoc/no-undefined-types': 'off', // Reports undefined types in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/no-undefined-types.md
        'jsdoc/require-asterisk-prefix': ['error', 'always'], // Requires that each JSDoc line starts with an *. https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-asterisk-prefix.md
        'jsdoc/require-description': ['error', {exemptedBy: ['type', 'inheritdoc']}], // Reports missing description in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-description.md
        'jsdoc/require-description-complete-sentence': 'error', // Reports missing complete sentence in JSDoc description. https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-description-complete-sentence.md
        'jsdoc/require-example': 'off', // Reports missing example in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-example.md
        'jsdoc/require-file-overview': 'off', // Reports missing file overview in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-file-overview.md
        'jsdoc/require-hyphen-before-param-description': ['error', 'never'], // Reports missing hyphen before param description in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-hyphen-before-param-description.md
        'jsdoc/require-jsdoc': [
            'error',
            {
                contexts: ['VariableDeclaration > VariableDeclarator > ArrowFunctionExpression'],
                publicOnly: false,
                require: {
                    ArrowFunctionExpression: false,
                    ClassDeclaration: true,
                    ClassExpression: true,
                    FunctionDeclaration: true,
                    FunctionExpression: true,
                    MethodDefinition: true
                }
            }
        ], // Reports missing JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-jsdoc.md
        'jsdoc/require-param': [
            'error',
            {
                checkDestructured: true,
                checkDestructuredRoots: true,
                checkRestProperty: false,
                enableFixer: true,
                enableRestElementFixer: true,
                enableRootFixer: true,
                unnamedRootBase: ['props', 'obj', 'root'],
                useDefaultObjectProperties: true
            }
        ], // Reports missing params in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-param.md
        'jsdoc/require-param-description': 'error', // Reports missing param description in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-param-description.md
        'jsdoc/require-param-name': 'error', // Reports missing param name in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-param-name.md
        'jsdoc/require-param-type': 'error', // Reports missing param type in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-param-type.md
        'jsdoc/require-property': 'error', // Reports missing properties in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-property.md
        'jsdoc/require-property-description': 'error', // Reports missing property description in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-property-description.md
        'jsdoc/require-property-name': 'error', // Reports missing property name in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-property-name.md
        'jsdoc/require-property-type': 'error', // Reports missing property type in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-property-type.md
        'jsdoc/require-returns': 'error', // Reports missing returns in JSDoc comments.
        'jsdoc/require-returns-check': 'error', // Reports missing returns in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-returns-check.md
        'jsdoc/require-returns-description': 'error', // Reports missing returns description in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-returns-description.md
        'jsdoc/require-returns-type': 'error', // Reports missing returns type in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-returns-type.md
        'jsdoc/require-throws': 'error', // Reports missing throws in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-throws.md
        'jsdoc/require-yields': 'error', // Reports missing yields in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-yields.md
        'jsdoc/require-yields-check': 'error', // Reports missing yields in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-yields-check.md
        'jsdoc/sort-tags': 'off', // Reports unsorted JSDoc tags. https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/sort-tags.md
        'jsdoc/tag-lines': 'off' // Reports unsorted JSDoc tags. https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/tag-lines.md
    }
};