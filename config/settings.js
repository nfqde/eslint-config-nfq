module.exports = {
    'import/resolver': {
        alias: {
            extensions: [
                '.js',
                '.jsx',
                '.json',
                '.css',
                '.png',
                '.jpeg',
                '.jpg',
                '.svg',
                '.webp'
            ]
        }
    },
    jsdoc: {
        ignoreInternal: false,
        ignorePrivate: false,
        maxLines: 1,
        minLines: 0,
        mode: 'typescript',
        tagNamePreference: {
            augments: 'extends',
            ignore: false
        }
    },
    react: {version: 'detect'}
};