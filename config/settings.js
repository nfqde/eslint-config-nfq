module.exports = {
    'import/resolver': {
        alias: {
            extensions: [
                '.js',
                '.ts',
                '.cjs',
                '.mjs',
                '.cts',
                '.mts',
                '.jsx',
                '.tsx',
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