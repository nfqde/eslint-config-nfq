/* eslint-disable no-inline-comments */
export const complexity = {
    'class-methods-use-this': ['off', {exceptMethods: []}],
    complexity: ['warn', {max: 20}],
    'max-classes-per-file': ['error', 1],
    'no-param-reassign': [
        'error',
        {
            ignorePropertyModificationsFor: [
                '$scope', // for Angular 1 scopes
                'acc', // for reduce accumulators
                'accumulator', // for reduce accumulators
                'ctx', // for Koa routing
                'descriptor', // for decorators
                'e', // for e.returnvalue
                'item', // array foreach
                'key', // for reduce key value pairs
                'req', // for Express requests
                'request', // for Express requests
                'res', // for Express responses
                'response', // for Express responses
                'staticContext', // for ReactRouter context
                'value' // for reduce key value pairs
            ],
            props: true
        }
    ],
    'vars-on-top': 'error'
};