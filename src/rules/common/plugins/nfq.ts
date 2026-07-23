export const nfq = {
    '@nfq/hexagonal-dependency-direction': 'error',
    '@nfq/no-empty-lines-in-objects': 'error',
    '@nfq/no-magic-numbers': [
        'error',
        {
            detectObjects: false,
            enforceConst: true,
            ignore: [0, 1, -1],
            ignoreArrayIndexes: true,
            ignoreArrays: true,
            ignoreClassFieldInitialValues: true,
            ignoreConstDeclarations: false,
            ignoreDefaultValues: true,
            ignoreFunctions: [
                'darken',
                'lighten',
                'setTimeout',
                'setInterval',
                'spacing',
                'translucify',
                'wait',
                'toFixed'
            ]
        }
    ],
    '@nfq/no-unbound-method': ['error', {decoratorNames: ['autobind']}],
    '@nfq/object-property-newline': 'error',
    '@nfq/sort-keys': [
        'error',
        'asc',
        {
            caseSensitive: false,
            ignorePropTypes: true,
            methodsExtra: true,
            natural: true
        }
    ]
};