/**
 * Normalizes a value used in magic number ignore lists into a consistent numeric form.
 * It ensures string values with numeric suffixes are converted to bigint while preserving
 * numeric and bigint inputs as-is. This helps downstream comparisons behave predictably
 * across mixed input types.
 *
 * @param value The ignore value to normalize, which may be a bigint, number, or string.
 * @returns The normalized value as a bigint or number suitable for comparisons.
 *
 *
 * @example
 * ```tsx
 * const normalized = normalizeIgnoreValue('10n');
 * ```
 */
export const normalizeIgnoreValue = (value: bigint | number | string) => (
    typeof value === 'string' ? BigInt(value.slice(0, -1)) : value
);