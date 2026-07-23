// @ts-nocheck
type ValidationFunc = (value: unknown, form?: unknown) => string[] | null;

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

export {MemoizedMerge};
