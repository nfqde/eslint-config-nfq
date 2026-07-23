import {ASTUtils} from '@typescript-eslint/utils';

import type {TSESTree} from '@typescript-eslint/utils';

export type AstNode = TSESTree.Node | null | undefined;

/**
 * Extracts the static property name from an AST node if it can be determined statically.
 * This function handles Property, MethodDefinition, and MemberExpression nodes and attempts
 * to resolve their property names to string values when possible at compile time.
 *
 * @param node The AST node to extract the property name from.
 * @returns The static property name as a string, or null if it cannot be determined statically.
 *
 * @example
 * ```tsx
 * // For obj.prop
 * const memberExpr = // ... MemberExpression node
 * const propName = getStaticPropertyName(memberExpr); // Returns "prop"
 *
 * // For { key: value }
 * const property = // ... Property node
 * const keyName = getStaticPropertyName(property); // Returns "key"
 * ```
 */
export const getStaticPropertyName = (node: AstNode): string | null => {
    let prop: TSESTree.Node | null = null;

    switch (node?.type) {
        case 'Property':
        case 'MethodDefinition':
            prop = node.key;
            break;
        case 'MemberExpression':
            prop = node.property;
            break;
        default:
            return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!prop) {
        return null;
    }

    switch (prop.type) {
        case 'Literal':
            return String(prop.value);
        case 'TemplateLiteral':
            if (prop.expressions.length === 0 && prop.quasis.length === 1) {
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                return prop.quasis[0].value.cooked ?? null;
            }
            break;
        case 'Identifier': {
            const isComputed = 'computed' in node && node.computed;

            if (!isComputed) {
                return prop.name;
            }
            break;
        }
        default:
            break;
    }

    return null;
};

/**
 * Checks whether the actual text matches the expected pattern or string value.
 * This utility function provides a unified way to test strings against both literal string values and regular expressions.
 * It returns true if the actual string equals the expected string (when expected is a string) or matches the pattern (when expected is a RegExp).
 *
 * @param actual   The actual string value to be tested against the expected pattern or value.
 * @param expected The expected pattern (RegExp) or literal string value to match against the actual string.
 * @returns True if the actual string matches the expected value or pattern, false otherwise.
 *
 * @example
 * ```tsx
 * // String comparison
 * const result1 = checkText("hello", "hello"); // Returns true
 * const result2 = checkText("hello", "world"); // Returns false
 *
 * // RegExp comparison
 * const pattern = /^test/;
 * const result3 = checkText("testing", pattern); // Returns true
 * const result4 = checkText("example", pattern); // Returns false
 * ```
 */
export const checkText = (actual: string, expected: RegExp | string): boolean => (
    typeof expected === 'string' ? actual === expected : expected.test(actual)
);

/**
 * Skips a ChainExpression node and returns its inner expression.
 * When encountering optional chaining expressions (e.g., `obj?.prop`), this utility
 * unwraps the ChainExpression wrapper to access the underlying expression node.
 *
 * @param node The AST node to potentially unwrap.
 * @returns The inner expression if the node is a ChainExpression, otherwise the original node.
 *
 * @example
 * ```typescript
 * // For optional chaining: obj?.prop
 * const chainNode = // ... ChainExpression node
 * const innerNode = skipChainExpression(chainNode); // Returns the MemberExpression
 * ```
 */
export const skipChainExpression = (node: AstNode): AstNode => (
    node?.type === 'ChainExpression' ? node.expression : node
);

/**
 * Checks whether the provided AST node represents a numeric literal value.
 * This function performs type narrowing to determine if a node is a Literal with a numeric value,
 * including both regular numbers and BigInt values. It serves as a type guard that helps with
 * type safety when working with numeric literals in AST processing.
 *
 * @param node The AST node to check for numeric literal properties.
 * @returns True if the node is a numeric Literal (number or BigInt), false otherwise.
 *
 * @example
 * ```tsx
 * // For numeric literal: 42
 * const numberNode = // ... Literal node with value 42
 * const isNumeric = isNumericLiteral(numberNode); // Returns true
 *
 * // For BigInt literal: 123n
 * const bigintNode = // ... Literal node with BigInt value
 * const isBigInt = isNumericLiteral(bigintNode); // Returns true
 *
 * // For string literal: "hello"
 * const stringNode = // ... Literal node with string value
 * const isString = isNumericLiteral(stringNode); // Returns false
 * ```
 */
export const isNumericLiteral = (node: AstNode): node is TSESTree.Literal => Boolean(
    node?.type === 'Literal'
    && (typeof node.value === 'number' || 'bigint' in node)
);

/**
 * Determines whether the provided AST node is an Identifier and whether its name matches the given pattern.
 * The check uses the shared text matcher to support both literal string comparisons and regular expressions.
 * This utility is useful for narrowing nodes when analyzing specific identifier names in the AST.
 *
 * @param node The AST node to test for an Identifier and name match.
 * @param name The expected identifier name or a RegExp pattern to match against the node name.
 * @returns True when the node is an Identifier and its name matches the provided pattern, otherwise false.
 *
 * @example
 * ```tsx
 * const node = // ... Identifier node with name "foo"
 * const matches = isSpecificId(node, "foo"); // Returns true
 * ```
 */
export const isSpecificId = (node: AstNode, name: RegExp | string): boolean => (
    ASTUtils.isIdentifier(node) && checkText(node.name, name)
);

/**
 * Checks whether a given AST node represents a specific member access pattern with optional object and property constraints.
 * This utility unwraps optional chaining, verifies the node is a MemberExpression, and then validates the object and property
 * names using shared matchers for strings and regular expressions. It is useful for rule logic that needs to detect precise
 * member access patterns while safely handling null or optional inputs.
 *
 * @param node         The AST node to inspect for a member access expression.
 * @param objectName   The expected object identifier name or pattern, or null to skip the object check.
 * @param propertyName The expected property name or pattern, or null to skip the property check.
 * @returns True when the node is a matching member access expression based on the provided constraints, otherwise false.
 *
 * @example
 * ```tsx
 * // For obj.prop
 * const memberNode = // ... MemberExpression node
 * const matches = isSpecificMemberAccess(memberNode, "obj", "prop"); // Returns true
 * ```
 */
export const isSpecificMemberAccess = (
    node: AstNode,
    objectName: RegExp | string | null,
    propertyName: RegExp | string | null
): boolean => {
    const checkNode = skipChainExpression(node);

    if (checkNode?.type !== 'MemberExpression') {
        return false;
    }

    if (objectName && !isSpecificId(checkNode.object as AstNode, objectName)) {
        return false;
    }

    if (propertyName) {
        const actualPropertyName = getStaticPropertyName(checkNode);

        if (typeof actualPropertyName !== 'string' || !checkText(actualPropertyName, propertyName)) {
            return false;
        }
    }

    return true;
};