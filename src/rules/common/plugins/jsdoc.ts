export const jsdoc = {
    'jsdoc/check-access': 'off',
    'jsdoc/check-alignment': 'error',
    'jsdoc/check-examples': 'off',
    'jsdoc/check-indentation': 'error',
    'jsdoc/check-line-alignment': [
        'error',
        'always',
        {tags: ['param', 'arg', 'argument', 'property', 'prop']}
    ],
    'jsdoc/check-param-names': [
        'error',
        {
            checkDestructured: false,
            checkRestProperty: false,
            enableFixer: true
        }
    ],
    'jsdoc/check-property-names': [
        'error',
        {enableFixer: true}
    ],
    'jsdoc/check-syntax': 'error',
    'jsdoc/check-tag-names': 'error',
    'jsdoc/check-types': 'error',
    'jsdoc/check-values': 'error',
    'jsdoc/empty-tags': 'error',
    'jsdoc/implements-on-classes': 'error',
    'jsdoc/match-description': 'error',
    'jsdoc/match-name': 'off',
    'jsdoc/multiline-blocks': [
        'error',
        {
            noFinalLineText: true,
            noMultilineBlocks: false,
            noSingleLineBlocks: false,
            noZeroLineText: true
        }
    ],
    'jsdoc/no-bad-blocks': 'error',
    'jsdoc/no-defaults': 'off',
    'jsdoc/no-missing-syntax': 'off',
    'jsdoc/no-multi-asterisks': 'error',
    'jsdoc/no-restricted-syntax': 'off',
    'jsdoc/no-types': 'off',
    'jsdoc/no-undefined-types': 'off',
    'jsdoc/require-asterisk-prefix': ['error', 'always'],
    'jsdoc/require-description': ['error', {exemptedBy: ['type', 'inheritdoc']}],
    'jsdoc/require-description-complete-sentence': 'error',
    'jsdoc/require-example': 'off',
    'jsdoc/require-file-overview': 'off',
    'jsdoc/require-hyphen-before-param-description': ['error', 'never'],
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
    ],
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
    ],
    'jsdoc/require-param-description': 'error',
    'jsdoc/require-param-name': 'error',
    'jsdoc/require-param-type': 'error',
    'jsdoc/require-property': 'error',
    'jsdoc/require-property-description': 'error',
    'jsdoc/require-property-name': 'error',
    'jsdoc/require-property-type': 'error',
    'jsdoc/require-returns': 'error',
    'jsdoc/require-returns-check': 'error',
    'jsdoc/require-returns-description': 'error',
    'jsdoc/require-returns-type': 'error',
    'jsdoc/require-throws': 'error',
    'jsdoc/require-yields': 'error',
    'jsdoc/require-yields-check': 'error',
    'jsdoc/sort-tags': 'off',
    'jsdoc/tag-lines': ['error', 'any', {startLines: 1}]
};