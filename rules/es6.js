/* eslint-disable no-inline-comments */

module.exports = {
    rules: {
        'arrow-body-style': ['error', 'as-needed', {requireReturnForObjectLiteral: false}], // enforces no braces where they can be omitted https://eslint.org/docs/rules/arrow-body-style
        'arrow-parens': ['error', 'as-needed'], // require parens in arrow function arguments https://eslint.org/docs/rules/arrow-parens
        'arrow-spacing': [
            'error',
            {
                after: true,
                before: true
            }
        ], // require space before/after arrow function's arrow https://eslint.org/docs/rules/arrow-spacing
        'constructor-super': 'error', // verify super() callings in constructors https://eslint.org/docs/rules/constructor-super
        'generator-star-spacing': [
            'error',
            {
                after: true,
                before: false
            }
        ], // enforce the spacing around the * in generator functions https://eslint.org/docs/rules/generator-star-spacing
        'no-class-assign': 'error', // disallow modifying variables of class declarations https://eslint.org/docs/rules/no-class-assign
        'no-confusing-arrow': ['error', {allowParens: true}], // disallow arrow functions where they could be confused with comparisons https://eslint.org/docs/rules/no-confusing-arrow
        'no-const-assign': 'error', // disallow modifying variables that are declared using const https://eslint.org/docs/rules/no-const-assign
        'no-dupe-class-members': 'error', // disallow duplicate class members https://eslint.org/docs/rules/no-dupe-class-members
        'no-new-symbol': 'error', // disallow symbol constructor https://eslint.org/docs/rules/no-new-symbol
        'no-restricted-imports': [
            'off',
            {
                paths: [],
                patterns: []
            }
        ], // disallow specific imports https://eslint.org/docs/rules/no-restricted-imports
        'no-this-before-super': 'error', // disallow to use this/super before super() calling in constructors. https://eslint.org/docs/rules/no-this-before-super
        'no-useless-computed-key': 'error', // disallow useless computed property keys https://eslint.org/docs/rules/no-useless-computed-key
        'no-useless-constructor': 'error', // disallow unnecessary constructor https://eslint.org/docs/rules/no-useless-constructor
        'no-useless-rename': [
            'error',
            {
                ignoreDestructuring: false,
                ignoreExport: false,
                ignoreImport: false
            }
        ], // disallow renaming import, export, and destructured assignments to the same name https://eslint.org/docs/rules/no-useless-rename
        'no-var': 'error', // require let or const instead of var https://eslint.org/docs/rules/no-var
        'object-shorthand': [
            'error',
            'always',
            {
                avoidExplicitReturnArrows: true,
                avoidQuotes: true,
                ignoreConstructors: false
            }
        ], // require method and property shorthand syntax for object literals https://eslint.org/docs/rules/object-shorthand
        'prefer-arrow-callback': [
            'error',
            {
                allowNamedFunctions: false,
                allowUnboundThis: true
            }
        ], // suggest using arrow functions as callbacks https://eslint.org/docs/rules/prefer-arrow-callback
        'prefer-const': [
            'error',
            {
                destructuring: 'any',
                ignoreReadBeforeAssign: true
            }
        ], // suggest using of const declaration for variables that are never modified after declared https://eslint.org/docs/rules/prefer-const
        'prefer-destructuring': [
            'error',
            {
                AssignmentExpression: {
                    array: true,
                    object: false
                },
                VariableDeclarator: {
                    array: false,
                    object: true
                }
            },
            {enforceForRenamedProperties: false}
        ], // Prefer destructuring from arrays and objects https://eslint.org/docs/rules/prefer-destructuring
        'prefer-numeric-literals': 'error', // disallow parseInt() in favor of binary, octal, and hexadecimal literals https://eslint.org/docs/rules/prefer-numeric-literals
        'prefer-reflect': 'off', // suggest using Reflect methods where applicable https://eslint.org/docs/rules/prefer-reflect
        'prefer-rest-params': 'error', // use rest parameters instead of arguments https://eslint.org/docs/rules/prefer-rest-params
        'prefer-spread': 'error', // suggest using the spread operator instead of .apply() https://eslint.org/docs/rules/prefer-spread
        'prefer-template': 'error', // suggest using template literals instead of string concatenation https://eslint.org/docs/rules/prefer-template
        'require-yield': 'error', // disallow generator functions that do not have yield https://eslint.org/docs/rules/require-yield
        'rest-spread-spacing': ['error', 'never'], // enforce spacing between object rest-spread https://eslint.org/docs/rules/rest-spread-spacing
        'sort-imports': [
            'error',
            {
                ignoreCase: true,
                ignoreDeclarationSort: true,
                ignoreMemberSort: false
            }
        ], // import sorting https://eslint.org/docs/rules/sort-imports
        'symbol-description': 'error', // require a Symbol description https://eslint.org/docs/rules/symbol-description
        'template-curly-spacing': ['error', 'never'], // enforce usage of spacing in template strings https://eslint.org/docs/rules/template-curly-spacing
        'yield-star-spacing': ['error', 'after'] // enforce spacing around the * in yield* expressions https://eslint.org/docs/rules/yield-star-spacing
    }
};