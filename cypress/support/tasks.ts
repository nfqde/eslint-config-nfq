import fs from 'fs';
import path from 'path';

import * as tsParser from '@typescript-eslint/parser';
import {RuleTester} from '@typescript-eslint/rule-tester';

import {componentFileStructure} from '../../src/rules/custom/component-file-structure';
import {componentSingleHook} from '../../src/rules/custom/component-single-hook';
import {cypressMountHook} from '../../src/rules/custom/cypress-mount-hook';
import {hexagonalDependencyDirection} from '../../src/rules/custom/hexagonal-dependency-direction';
import {noEmptyLinesInObjects} from '../../src/rules/custom/no-empty-lines-in-objects';
import {noEmptyLinesInTypes} from '../../src/rules/custom/no-empty-lines-in-types';
import {noMagicNumbers} from '../../src/rules/custom/no-magic-numbers';
import {noUnboundMethod} from '../../src/rules/custom/no-unbound-method';
import {objectPropertyNewline} from '../../src/rules/custom/object-property-newline';
import {requireGetCy} from '../../src/rules/custom/require-getcy';
import {sortKeys} from '../../src/rules/custom/sort-keys';
import {spreadTransientProps} from '../../src/rules/custom/spread-transient-props';
import {styledComponentsOrder} from '../../src/rules/custom/styled-components-order';

type RuleTestCase = {
    code?: string;
    errors?: {messageId: string}[];
    filename: string;
    name?: string;
    options?: unknown[];
    output?: string[] | string | null;
    settings?: Record<string, unknown>;
    sourceFilename?: string;
};

const ruleMap = {
    'component-file-structure': componentFileStructure,
    'component-single-hook': componentSingleHook,
    'cypress-mount-hook': cypressMountHook,
    'hexagonal-dependency-direction': hexagonalDependencyDirection,
    'no-empty-lines-in-objects': noEmptyLinesInObjects,
    'no-empty-lines-in-types': noEmptyLinesInTypes,
    'no-magic-numbers': noMagicNumbers,
    'no-unbound-method': noUnboundMethod,
    'object-property-newline': objectPropertyNewline,
    'require-getcy': requireGetCy,
    'sort-keys': sortKeys,
    'spread-transient-props': spreadTransientProps,
    'styled-components-order': styledComponentsOrder,
    undefined
};

export type RuleTestPayload = {
    invalid: RuleTestCase[];
    ruleName: keyof typeof ruleMap;
    ruleOptions?: unknown[];
    valid: RuleTestCase[];
};

/**
 * Runs an ESLint RuleTester against the provided payload and collects failures.
 * It resolves the rule by name, prepares parser options, and reads source code from inline content or disk.
 * It also wires RuleTester lifecycle hooks to capture errors and returns a summary result.
 *
 * @param payload The test payload containing the rule name, cases, and options to execute.
 * @returns An object with a boolean success flag and an array of failure messages.
 *
 * @example
 * ```tsx
 * const result = runRuleTester({
 *     ruleName: 'sort-keys',
 *     valid: [{filename: 'test.ts'}],
 *     invalid: [{filename: 'test.ts', errors: [{messageId: 'sorted'}]}]
 * });
 * ```
 */
export const runRuleTester = (payload: RuleTestPayload) => {
    const projectRoot = process.cwd();
    const rule = ruleMap[payload.ruleName];

    if (!rule) {
        return {
            failures: [`Unknown rule name: ${payload.ruleName}`],
            ok: false
        };
    }

    const parserOptions = {
        ecmaFeatures: {jsx: true},
        ecmaVersion: 'latest' as const,
        projectService: {
            allowDefaultProject: [
                '__virtual__/*.ts',
                '__virtual__/*.tsx',
                '__virtual__/*/*.ts',
                '__virtual__/*/*.tsx',
                '__virtual__/*/*/*.ts',
                '__virtual__/*/*/*.tsx',
                '__virtual__/*/*/*/*.ts',
                '__virtual__/*/*/*/*.tsx',
                '__virtual__/*/*/*/*/*.ts',
                '__virtual__/*/*/*/*/*.tsx',
                '__virtual__/*/*/*/*/*/*.ts',
                '__virtual__/*/*/*/*/*/*.tsx',
                '__virtual__/*/*/*/*/*/*/*.ts',
                '__virtual__/*/*/*/*/*/*/*.tsx'
            ]
        },
        sourceType: 'module' as const,
        tsconfigRootDir: projectRoot
    };

    const failures: string[] = [];
    /**
     * This function resolves the source code used for a rule test case.
     * It prefers inline code when provided and falls back to reading from disk based on the filename information.
     * It ensures the RuleTester always receives a concrete code string to evaluate.
     *
     * @param testCase The rule test case containing file and optional inline code metadata.
     * @returns The resolved source code string for the test case.
     *
     *
     * @example
     * ```tsx
     * const code = readCode({ filename: 'src/example.ts' });
     * ```
     */
    const readCode = (testCase: RuleTestCase) => {
        if (testCase.code) {
            return testCase.code;
        }

        const resolvedPath = path.resolve(projectRoot, testCase.sourceFilename ?? testCase.filename);

        // eslint-disable-next-line security/detect-non-literal-fs-filename, n/no-sync
        return fs.readFileSync(resolvedPath, 'utf8');
    };
    /**
     * This function executes a labeled step and captures any thrown errors.
     * It wraps the provided callback in a try/catch so failures can be recorded without stopping the overall
     * process. It formats the error into a readable message and appends it to the failures list.
     *
     * @param label The label used to identify the step in failure messages.
     * @param fn    The callback that performs the step's work.
     *
     * @example
     * ```tsx
     * runStep('afterAll', () => {});
     * ```
     */
    const runStep = (label: string, fn: () => void) => {
        try {
            fn();
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);

            failures.push(`${label}: ${message}`);
        }
    };

    RuleTester.afterAll = fn => runStep('afterAll', fn);
    RuleTester.describe = (name, fn) => runStep(`describe:${name}`, fn);
    RuleTester.it = (name, fn) => runStep(`it:${name}`, fn);
    RuleTester.itOnly = RuleTester.it;

    const ruleTester = new RuleTester({
        languageOptions: {
            parser: tsParser,
            parserOptions
        }
    });
    /**
     * This function normalizes a RuleTester case by resolving its source code and options.
     * It ensures that the returned object always includes a concrete code string, even when the input
     * omits inline code. It also merges default rule options with per-case overrides in a consistent way.
     *
     * @param testCase The rule test case containing file metadata, optional inline code, and optional options.
     * @returns The normalized test case with resolved code and merged options.
     *
     * @example
     * ```tsx
     * const normalized = applyCase({ filename: 'src/example.ts' });
     * ```
     */
    const applyCase = (testCase: RuleTestCase) => {
        const {sourceFilename, ...rest} = testCase;

        return {
            ...rest,
            code: readCode(testCase),
            options: testCase.options ?? payload.ruleOptions ?? []
        };
    };

    runStep(`run:${payload.ruleName}`, () => {
        // @ts-expect-error
        ruleTester.run(payload.ruleName, rule, {
            invalid: payload.invalid.map(applyCase),
            valid: payload.valid.map(applyCase)
        });
    });

    return {
        failures,
        ok: failures.length === 0
    };
};