import naturalCompare from 'natural-compare';

type NameWithMethod = {method: boolean; name: string};

export const isValidOrders = {
    /**
     * Compares two entries by name using ascending lexical order.
     * It treats the name fields as plain strings and checks if the first sorts before or equal to the second.
     * It is used as the base comparison for other ordering variants.
     *
     * @param   a The first name wrapper to compare.
     * @param   b The second name wrapper to compare.
     * @returns True when the first name is ordered before or equal to the second name.
     *
     * @remarks Uses direct string comparison for ordering.
     *
     * @example
     * ```tsx
     * const ok = isValidOrders.asc({name: 'a'}, {name: 'b'});
     * ```
     */
    asc(a: NameWithMethod, b: NameWithMethod) {
        return a.name <= b.name;
    },
    /**
     * Compares two entries by method flag and then by name in ascending order.
     * It groups by the method indicator and falls back to standard ascending name comparison.
     * It is used when method ordering is enabled for ascending checks.
     *
     * @param   a The first name wrapper to compare.
     * @param   b The second name wrapper to compare.
     * @returns True when the first entry is ordered before or equal to the second entry with method-aware ordering.
     *
     * @remarks Uses method grouping before name comparison.
     *
     * @example
     * ```tsx
     * const ok = isValidOrders.ascF({name: 'a', method: false}, {name: 'b', method: true});
     * ```
     */
    ascF(a: NameWithMethod, b: NameWithMethod) {
        if (a.method === b.method) {
            return isValidOrders.asc(a, b);
        }

        return a.method <= b.method;
    },
    /**
     * Compares two entries by name using ascending order with case folding.
     * It lowercases both names to provide a case-insensitive check.
     * It is used when the ordering option disables case sensitivity.
     *
     * @param   a The first name wrapper to compare.
     * @param   b The second name wrapper to compare.
     * @returns True when the first name is ordered before or equal to the second name.
     *
     * @remarks Uses lowercased strings to avoid case differences.
     *
     * @example
     * ```tsx
     * const ok = isValidOrders.ascI({name: 'A'}, {name: 'b'});
     * ```
     */
    ascI(a: NameWithMethod, b: NameWithMethod) {
        return a.name.toLowerCase() <= b.name.toLowerCase();
    },
    /**
     * Compares two entries by method flag and then by name using case-insensitive ascending order.
     * It groups by the method indicator and compares lowercased names when methods match.
     * It is used when method ordering and case-insensitive ordering are enabled together.
     *
     * @param   a The first name wrapper to compare.
     * @param   b The second name wrapper to compare.
     * @returns True when the first entry is ordered before or equal to the second entry with method-aware, case-insensitive ordering.
     *
     * @remarks Uses method grouping before case-insensitive comparison.
     *
     * @example
     * ```tsx
     * const ok = isValidOrders.ascIF({name: 'A', method: true}, {name: 'b', method: true});
     * ```
     */
    ascIF(a: NameWithMethod, b: NameWithMethod) {
        if (a.method === b.method) {
            return isValidOrders.ascI(a, b);
        }

        return a.method <= b.method;
    },
    /**
     * Compares two entries by name using natural ascending order with case folding.
     * It lowercases both names and applies natural comparison.
     * It is used when both natural and case-insensitive ordering are enabled.
     *
     * @param   a The first name wrapper to compare.
     * @param   b The second name wrapper to compare.
     * @returns True when the first name is ordered before or equal to the second name in natural, case-insensitive order.
     *
     * @remarks Combines natural ordering with case folding.
     *
     * @example
     * ```tsx
     * const ok = isValidOrders.ascIN({name: 'A2'}, {name: 'a10'});
     * ```
     */
    ascIN(a: NameWithMethod, b: NameWithMethod) {
        return naturalCompare(a.name.toLowerCase(), b.name.toLowerCase()) <= 0;
    },
    /**
     * Compares two entries by method flag and then by name using natural, case-insensitive ascending order.
     * It groups by the method indicator and uses natural comparison on lowercased names when methods match.
     * It is used when method ordering, natural ordering, and case-insensitive ordering are enabled together.
     *
     * @param   a The first name wrapper to compare.
     * @param   b The second name wrapper to compare.
     * @returns True when the first entry is ordered before or equal to the second entry with method-aware, natural, case-insensitive ordering.
     *
     * @remarks Uses method grouping before natural, case-insensitive comparison.
     *
     * @example
     * ```tsx
     * const ok = isValidOrders.ascINF({name: 'A2', method: true}, {name: 'a10', method: true});
     * ```
     */
    ascINF(a: NameWithMethod, b: NameWithMethod) {
        if (a.method === b.method) {
            return isValidOrders.ascIN(a, b);
        }

        return a.method <= b.method;
    },
    /**
     * Compares two entries by name using natural ascending order.
     * It delegates to a natural compare function to handle numeric substrings sensibly.
     * It is used when natural sorting is enabled.
     *
     * @param   a The first name wrapper to compare.
     * @param   b The second name wrapper to compare.
     * @returns True when the first name is ordered before or equal to the second name in natural order.
     *
     * @remarks Uses natural-compare for string ordering.
     *
     * @example
     * ```tsx
     * const ok = isValidOrders.ascN({name: 'a2'}, {name: 'a10'});
     * ```
     */
    ascN(a: NameWithMethod, b: NameWithMethod) {
        return naturalCompare(a.name, b.name) <= 0;
    },
    /**
     * Compares two entries by method flag and then by name using natural ascending order.
     * It groups by the method indicator and uses natural comparison when methods match.
     * It is used when method ordering and natural ordering are enabled together.
     *
     * @param   a The first name wrapper to compare.
     * @param   b The second name wrapper to compare.
     * @returns True when the first entry is ordered before or equal to the second entry with method-aware natural ordering.
     *
     * @remarks Uses method grouping before natural comparison.
     *
     * @example
     * ```tsx
     * const ok = isValidOrders.ascNF({name: 'a2', method: false}, {name: 'a10', method: false});
     * ```
     */
    ascNF(a: NameWithMethod, b: NameWithMethod) {
        if (a.method === b.method) {
            return isValidOrders.ascN(a, b);
        }

        return a.method <= b.method;
    },
    /**
     * Compares two entries by name using descending lexical order.
     * It delegates to the ascending comparison with swapped operands.
     * It is used as the base comparison for descending variants.
     *
     * @param   a The first name wrapper to compare.
     * @param   b The second name wrapper to compare.
     * @returns True when the first name is ordered after or equal to the second name.
     *
     * @remarks Uses ascending logic with swapped inputs.
     *
     * @example
     * ```tsx
     * const ok = isValidOrders.desc({name: 'b'}, {name: 'a'});
     * ```
     */
    desc(a: NameWithMethod, b: NameWithMethod) {
        return isValidOrders.asc(b, a);
    },
    /**
     * Compares two entries by method flag and then by name using descending order.
     * It delegates to the ascending method-aware comparison with swapped operands.
     * It is used when method ordering and descending ordering are enabled together.
     *
     * @param   a The first name wrapper to compare.
     * @param   b The second name wrapper to compare.
     * @returns True when the first entry is ordered after or equal to the second entry with method-aware ordering.
     *
     * @remarks Uses ascending method-aware logic with swapped inputs.
     *
     * @example
     * ```tsx
     * const ok = isValidOrders.descF({name: 'b', method: true}, {name: 'a', method: false});
     * ```
     */
    descF(a: NameWithMethod, b: NameWithMethod) {
        return isValidOrders.ascF(b, a);
    },
    /**
     * Compares two entries by name using descending order with case folding.
     * It delegates to the ascending case-insensitive comparison with swapped operands.
     * It is used when descending and case-insensitive ordering are enabled.
     *
     * @param   a The first name wrapper to compare.
     * @param   b The second name wrapper to compare.
     * @returns True when the first name is ordered after or equal to the second name in case-insensitive order.
     *
     * @remarks Uses ascending case-insensitive logic with swapped inputs.
     *
     * @example
     * ```tsx
     * const ok = isValidOrders.descI({name: 'b'}, {name: 'A'});
     * ```
     */
    descI(a: NameWithMethod, b: NameWithMethod) {
        return isValidOrders.ascI(b, a);
    },
    /**
     * Compares two entries by method flag and then by name using descending case-insensitive order.
     * It delegates to the ascending method-aware case-insensitive comparison with swapped operands.
     * It is used when method ordering, descending ordering, and case-insensitive ordering are enabled together.
     *
     * @param   a The first name wrapper to compare.
     * @param   b The second name wrapper to compare.
     * @returns True when the first entry is ordered after or equal to the second entry with method-aware, case-insensitive ordering.
     *
     * @remarks Uses ascending method-aware case-insensitive logic with swapped inputs.
     *
     * @example
     * ```tsx
     * const ok = isValidOrders.descIF({name: 'b', method: true}, {name: 'A', method: true});
     * ```
     */
    descIF(a: NameWithMethod, b: NameWithMethod) {
        return isValidOrders.ascIF(b, a);
    },
    /**
     * Compares two entries by name using natural descending order with case folding.
     * It delegates to the ascending natural case-insensitive comparison with swapped operands.
     * It is used when descending, natural, and case-insensitive ordering are enabled.
     *
     * @param   a The first name wrapper to compare.
     * @param   b The second name wrapper to compare.
     * @returns True when the first name is ordered after or equal to the second name in natural, case-insensitive order.
     *
     * @remarks Uses ascending natural case-insensitive logic with swapped inputs.
     *
     * @example
     * ```tsx
     * const ok = isValidOrders.descIN({name: 'a10'}, {name: 'A2'});
     * ```
     */
    descIN(a: NameWithMethod, b: NameWithMethod) {
        return isValidOrders.ascIN(b, a);
    },
    /**
     * Compares two entries by method flag and then by name using descending natural, case-insensitive order.
     * It delegates to the ascending method-aware natural case-insensitive comparison with swapped operands.
     * It is used when method ordering, descending ordering, natural ordering, and case-insensitive ordering
     * are enabled together.
     *
     * @param   a The first name wrapper to compare.
     * @param   b The second name wrapper to compare.
     * @returns True when the first entry is ordered after or equal to the second entry with method-aware, natural,case-insensitive ordering.
     *
     * @remarks Uses ascending method-aware natural case-insensitive logic with swapped inputs.
     *
     * @example
     * ```tsx
     * const ok = isValidOrders.descINF({name: 'a10', method: true}, {name: 'A2', method: true});
     * ```
     */
    descINF(a: NameWithMethod, b: NameWithMethod) {
        return isValidOrders.ascINF(b, a);
    },
    /**
     * Compares two entries by name using natural descending order.
     * It delegates to the ascending natural comparison with swapped operands.
     * It is used when descending natural ordering is enabled.
     *
     * @param   a The first name wrapper to compare.
     * @param   b The second name wrapper to compare.
     * @returns True when the first name is ordered after or equal to the second name in natural order.
     *
     * @remarks Uses ascending natural logic with swapped inputs.
     *
     * @example
     * ```tsx
     * const ok = isValidOrders.descN({name: 'a10'}, {name: 'a2'});
     * ```
     */
    descN(a: NameWithMethod, b: NameWithMethod) {
        return isValidOrders.ascN(b, a);
    },
    /**
     * Compares two entries by method flag and then by name using descending natural order.
     * It delegates to the ascending method-aware natural comparison with swapped operands.
     * It is used when method ordering, descending ordering, and natural ordering are enabled together.
     *
     * @param   a The first name wrapper to compare.
     * @param   b The second name wrapper to compare.
     * @returns True when the first entry is ordered after or equal to the second entry with method-aware natural ordering.
     *
     * @remarks Uses ascending method-aware natural logic with swapped inputs.
     *
     * @example
     * ```tsx
     * const ok = isValidOrders.descNF({name: 'a10', method: false}, {name: 'a2', method: false});
     * ```
     */
    descNF(a: NameWithMethod, b: NameWithMethod) {
        return isValidOrders.ascNF(b, a);
    }
};