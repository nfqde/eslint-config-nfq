/* eslint-disable no-inline-comments */
module.exports = {
    rules: {
        'array-func/avoid-reverse': 'error', // Avoid reversing the array and running a method on it if there is an equivalent of the method operating on the array from the other end. https://github.com/freaktechnik/eslint-plugin-array-func#avoid-reverse
        'array-func/from-map': 'error', // Prefer using the mapFn callback of Array.from over an immediate .map() call on the Array.from result. https://github.com/freaktechnik/eslint-plugin-array-func#from-map
        'array-func/no-unnecessary-this-arg': 'error', // Avoid the this parameter when providing arrow function as callback in array functions. https://github.com/freaktechnik/eslint-plugin-array-func#no-unnecessary-this-arg
        'array-func/prefer-array-from': 'error', // Use Array.from instead of [...iterable] for performance benefits. https://github.com/freaktechnik/eslint-plugin-array-func#prefer-array-from
        'array-func/prefer-flat': 'error', // Use .flatMap() to flatten an array and map the values instead of using .flat().map(). https://github.com/freaktechnik/eslint-plugin-array-func#prefer-flat-map
        'array-func/prefer-flat-map': 'error' // Use .flat() to flatten an array of arrays. This rule currently recognizes two patterns and can replace them with a .flat() call https://github.com/freaktechnik/eslint-plugin-array-func#prefer-flat
    }
};