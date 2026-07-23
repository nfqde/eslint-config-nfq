/* eslint-disable no-inline-comments */
export const redos = {
    'redos/no-vulnerable': [
        'error',
        {
            cache: true,
            checker: 'auto',
            ignoreErrors: true,
            permittableComplexities: ['polynomial', 'exponential'],
            timeout: 10000
        }
    ] // Superior ReDoS detection using advanced algorithms (automaton + fuzzing) with caching. Replaces security/detect-unsafe-regex. https://github.com/MakeNowJust-Labo/recheck
};