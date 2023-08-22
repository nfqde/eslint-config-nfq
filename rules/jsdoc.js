/* eslint-disable no-inline-comments */
module.exports = {
    rules: {
        'jsdoc/check-access': 'off', // checks access keyword for right values https://github.com/gajus/eslint-plugin-jsdoc#check-access
        'jsdoc/check-alignment': 'error', // Reports invalid alignment of JSDoc block asterisks. https://github.com/gajus/eslint-plugin-jsdoc#check-alignment
        'jsdoc/check-examples': 'off', // Reports invalid examples in JSDoc comments. (Waiting for eslint 8 support) https://github.com/gajus/eslint-plugin-jsdoc#check-examples
        'jsdoc/check-indentation': 'error', // Reports invalid indentation of JSDoc block. https://github.com/gajus/eslint-plugin-jsdoc#check-indentation
        'jsdoc/check-line-alignment': [
            'error',
            'always',
            {tags: ['param', 'arg', 'argument', 'property', 'prop']}
        ], // Reports invalid alignment of JSDoc block lines. https://github.com/gajus/eslint-plugin-jsdoc#check-indentation
        'jsdoc/check-param-names': [
            'error',
            {
                checkDestructured: false,
                checkRestProperty: false,
                enableFixer: true
            }
        ], // Reports invalid parameter names in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc#check-param-names
        'jsdoc/check-property-names': [
            'error',
            {enableFixer: true}
        ], // Reports invalid property names in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc#check-property-names
        'jsdoc/check-syntax': 'error', // Reports invalid JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc#check-syntax
        'jsdoc/check-tag-names': 'error', // Reports invalid tag names in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc#check-tag-names
        'jsdoc/check-types': 'error', // Reports invalid types in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc#check-types
        'jsdoc/check-values': 'error', // This rule checks the values for a handful of tags. https://github.com/gajus/eslint-plugin-jsdoc#check-values
        'jsdoc/empty-tags': 'error', // Reports non empty JSDoc tags that should be empty. https://github.com/gajus/eslint-plugin-jsdoc#empty-tags
        'jsdoc/implements-on-classes': 'error', // Reports missing @implements tag on classes. https://github.com/gajus/eslint-plugin-jsdoc#implements-on-classes
        'jsdoc/match-description': 'error', // Reports invalid descriptions in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc#match-description
        'jsdoc/match-name': 'off', // Reports invalid names in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc#match-name
        'jsdoc/multiline-blocks': [
            'error',
            {
                noFinalLineText: true,
                noMultilineBlocks: false,
                noSingleLineBlocks: false,
                noZeroLineText: true

            }
        ], // Controls how and whether jsdoc blocks can be expressed as single or multiple line blocks. https://github.com/gajus/eslint-plugin-jsdoc#multiline-blocks
        'jsdoc/no-bad-blocks': 'error', // Reports invalid JSDoc block tags. https://github.com/gajus/eslint-plugin-jsdoc#no-bad-blocks
        'jsdoc/no-defaults': 'off', // Reports default params if used. https://github.com/gajus/eslint-plugin-jsdoc#no-defaults
        'jsdoc/no-missing-syntax': 'off', // Reports missing JSDoc syntax. https://github.com/gajus/eslint-plugin-jsdoc#no-missing-syntax
        'jsdoc/no-multi-asterisks': 'error', // Prevents use of multiple asterisks at the beginning of lines. https://github.com/gajus/eslint-plugin-jsdoc#no-multi-asterisks
        'jsdoc/no-restricted-syntax': 'off', // Reports invalid JSDoc syntax. https://github.com/gajus/eslint-plugin-jsdoc#no-restricted-syntax
        'jsdoc/no-types': 'off', // Reports redundant types in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc#no-types
        'jsdoc/no-undefined-types': 'off', // Reports undefined types in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc#no-undefined-types
        'jsdoc/require-asterisk-prefix': ['error', 'always'], // Requires that each JSDoc line starts with an *. https://github.com/gajus/eslint-plugin-jsdoc#require-asterisk-prefix
        'jsdoc/require-description': ['error', {exemptedBy: ['type', 'inheritdoc']}], // Reports missing description in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc#require-description
        'jsdoc/require-description-complete-sentence': 'error', // Reports missing complete sentence in JSDoc description. https://github.com/gajus/eslint-plugin-jsdoc#require-description-complete-sentence
        'jsdoc/require-example': 'off', // Reports missing example in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc#require-example
        'jsdoc/require-file-overview': 'off', // Reports missing file overview in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc#require-file-overview
        'jsdoc/require-hyphen-before-param-description': ['error', 'never'], // Reports missing hyphen before param description in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc#require-hyphen-before-param-description
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
        ], // Reports missing JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc#require-jsdoc
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
        ], // Reports missing params in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc#require-param
        'jsdoc/require-param-description': 'error', // Reports missing param description in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc#require-param-description
        'jsdoc/require-param-name': 'error', // Reports missing param name in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc#require-param-name
        'jsdoc/require-param-type': 'error', // Reports missing param type in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc#require-param-type
        'jsdoc/require-property': 'error', // Reports missing properties in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc#require-property
        'jsdoc/require-property-description': 'error', // Reports missing property description in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc#require-property-description
        'jsdoc/require-property-name': 'error', // Reports missing property name in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc#require-property-name
        'jsdoc/require-property-type': 'error', // Reports missing property type in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc#require-property-type
        'jsdoc/require-returns': 'error', // Reports missing returns in JSDoc comments.
        'jsdoc/require-returns-check': 'error', // Reports missing returns in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc#require-returns-check
        'jsdoc/require-returns-description': 'error', // Reports missing returns description in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc#require-returns-description
        'jsdoc/require-returns-type': 'error', // Reports missing returns type in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc#require-returns-type
        'jsdoc/require-throws': 'error', // Reports missing throws in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc#require-throws
        'jsdoc/require-yields': 'error', // Reports missing yields in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc#require-yields
        'jsdoc/require-yields-check': 'error', // Reports missing yields in JSDoc comments. https://github.com/gajus/eslint-plugin-jsdoc#require-yields-check
        'jsdoc/sort-tags': 'off', // Reports unsorted JSDoc tags. https://github.com/gajus/eslint-plugin-jsdoc#sort-tags
        'jsdoc/tag-lines': ['error', 'any', {startLines: 1}] // Reports unsorted JSDoc tags. https://github.com/gajus/eslint-plugin-jsdoc#tag-lines
    }
};