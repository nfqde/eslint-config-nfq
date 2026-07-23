// @ts-nocheck
import type {ValidationFunc} from '@nfq/react-form';

export const required: ValidationFunc = value => {
    if (typeof value === 'string' && value.trim() === '') {
        return ['Bitte pruefen'];
    }

    return null;
};

const MemoizedMerge = () => {
    const cache = new Map<ValidationFunc[], ValidationFunc>();

    return (validators: ValidationFunc[]): ValidationFunc => {
        if (cache.has(validators)) {
            return cache.get(validators)!;
        }

        return (value, form) => {
            for (const validator of validators) {
                const result = validator(value, form);

                if (Array.isArray(result)) {
                    return result;
                }
            }

            return null;
        };
    };
};

export const merge = MemoizedMerge();
