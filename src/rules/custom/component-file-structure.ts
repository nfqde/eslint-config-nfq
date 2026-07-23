import {ESLintUtils} from '@typescript-eslint/utils';

import {
    collectTypeReferences,
    containsJsx,
    getComponentInfoFromStatement,
    getTypeDeclarationInfo,
    isComponentExport,
    isDefaultComponentExport,
    isDisplayNameAssignment,
    isStyledDeclaration,
    isStyledFactoryDeclaration
} from './utils/component-file-structure-utils';

import type {ComponentInfo} from './utils/component-file-structure-utils';
import type {TSESLint, TSESTree} from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
    name => `https://github.com/nfqde/eslint-config-nfq/blob/master/docs/rules/${name}.md`
);

type MessageIds = 'invalidOrder' | 'missingDisplayName' | 'missingNamedExport';

const ORDER_LABELS = [
    'Imports',
    'Optional declarations',
    'Props types',
    'Component',
    'Component helpers and displayName',
    'Exports',
    'Styled components and local helper types'
];
const ORDER_MESSAGE = ORDER_LABELS.join(' -> ');
// eslint-disable-next-line jsdoc/require-jsdoc
const getSectionLabel = (section: number) => ORDER_LABELS[section - 1] ?? 'Unknown';
const PAGE_TYPE_NAMES = new Set([
    'NextPage',
    'NextPageWithLayout',
    'NextSSRPage',
    'NextSSRPageWithLayout',
    'NextSSGPageWithLayout'
]);

export const componentFileStructure = createRule<[], MessageIds>({
    defaultOptions: [],
    meta: {
        docs: {description: 'Enforce file structure order for React component files.'},
        messages: {
            // eslint-disable-next-line @stylistic/max-len
            invalidOrder: 'This file structure block is out of order. {{currentName}} is a {{current}} and should be before {{previousName}}. Expected order: {{order}}.',
            missingDisplayName: 'Component {{name}} must set displayName.',
            missingNamedExport: 'Component {{name}} must be exported by name.'
        },
        schema: [],
        type: 'suggestion'
    },
    name: 'component-file-structure',
    /**
     * Creates the rule listener for enforcing component file structure ordering. It analyzes the program body to
     * identify the primary component, its props types, and structural sections. It then reports ordering issues and
     * missing requirements like displayName or named exports.
     *
     * @param context The ESLint rule context used to access source code and report diagnostics.
     * @returns A rule listener that validates component file structure and reports issues.
     *
     * @example
     * ```tsx
     * // eslint-disable-next-line @nfq/component-file-structure
     * const listener = componentFileStructure.create(context);
     * ```
     */
    // eslint-disable-next-line max-lines-per-function
    create(context) {
        const filename = context.getFilename();
        const filenameLower = filename.toLowerCase();

        if (!filenameLower.endsWith('.tsx') && !filenameLower.endsWith('.jsx')) {
            return {};
        }

        const {sourceCode} = context;
        const programBody = sourceCode.ast.body;

        if (!containsJsx(sourceCode.ast)) {
            return {};
        }
        const componentCandidates = programBody
            .filter((statement): statement is TSESTree.Statement => statement.type !== 'TSModuleDeclaration')
            .map(statement => getComponentInfoFromStatement(statement))
            .filter((info): info is ComponentInfo => Boolean(info));

        if (componentCandidates.length === 0) {
            return {};
        }

        const componentInfo = componentCandidates.sort(
            (left, right) => left.statement.range[0] - right.statement.range[0]
        )[0];
        const componentName = componentInfo.name;
        const typeDeclarations = new Map<string, TSESTree.Node>();

        for (const statement of programBody) {
            const info = getTypeDeclarationInfo(statement as TSESTree.Statement);

            if (info) {
                typeDeclarations.set(info.name, info.statement);
            }
        }

        const propsTypeNames = new Set<string>();
        const propsTypeRefs = new Set<string>();
        const propsTypeNode = componentInfo.propsTypeNode ?? null;
        /**
         * Determines whether the component uses a page-specific type alias. It inspects the component type node
         * and collects all referenced type names. It then checks if any of those names match known page types to
         * decide if the component is a page component.
         *
         * @returns True when the component type includes a known page type; otherwise false.
         *
         * @example
         * ```tsx
         * const isPage = isPageType();
         * ```
         */
        const isPageType = () => {
            const typeNode = componentInfo.componentTypeNode ?? null;

            if (!typeNode) {
                return false;
            }

            const typeRefs = new Set<string>();

            collectTypeReferences(typeNode, typeRefs);

            return Array.from(typeRefs).some(name => PAGE_TYPE_NAMES.has(name));
        };

        /**
         * Checks whether a statement assigns a page layout helper to the component. It ensures the statement is
         * an assignment expression targeting a member of the component identifier. It then verifies the member name
         * matches supported layout assignment properties.
         *
         * @param statement The statement to inspect for a layout assignment.
         * @returns True when the statement assigns a layout helper on the component; otherwise false.
         *
         * @example
         * ```tsx
         * const hasLayout = isPageLayoutAssignment(statement);
         * ```
         */
        const isPageLayoutAssignment = (statement: TSESTree.Statement) => {
            if (statement.type !== 'ExpressionStatement') {
                return false;
            }

            const {expression} = statement;

            if (expression.type !== 'AssignmentExpression') {
                return false;
            }

            const {left} = expression;

            if (left.type !== 'MemberExpression' || left.object.type !== 'Identifier') {
                return false;
            }

            if (left.object.name !== componentName || left.property.type !== 'Identifier') {
                return false;
            }

            return left.property.name === 'getLayout' || left.property.name === 'getLayoutKey';
        };

        const hasDefaultExport = programBody
            .some(statement => isDefaultComponentExport(statement as TSESTree.Statement, componentName));
        const hasLayoutAssignment = programBody
            .some(statement => isPageLayoutAssignment(statement as TSESTree.Statement));
        const isPageComponent = hasDefaultExport && (hasLayoutAssignment || isPageType());

        /**
         * Determines whether a class element represents a static displayName member. It checks that the element is a supported
         * property definition shape and that it is declared as static. It then verifies the identifier name matches the expected
         * displayName property, which signals a static display name assignment on a class.
         *
         * @returns True when the element is a static displayName property; otherwise false.
         *
         * @example
         * ```tsx
         * const isDisplayName = hasDisplayNameMember(member);
         * ```
         */
        const hasStaticDisplayName = () => {
            /**
             * Determines whether a class element represents a static displayName member. It checks that the element is a supported
             * property definition shape and that it is declared as static. It then verifies the identifier name matches the expected
             * displayName property, which signals a static display name assignment on a class.
             *
             * @param member The class element to inspect for a static displayName property.
             * @returns True when the element is a static displayName property; otherwise false.
             *
             * @example
             * ```tsx
             * const isDisplayName = hasDisplayNameMember(member);
             * ```
             */
            const hasDisplayNameMember = (member: TSESTree.ClassElement) => {
                // @ts-expect-error
                if (member.type !== 'PropertyDefinition' && member.type !== 'ClassProperty') {
                    return false;
                }

                if (!member.static || member.key.type !== 'Identifier') {
                    return false;
                }

                return member.key.name === 'displayName';
            };

            if (componentInfo.statement.type === 'ClassDeclaration') {
                return componentInfo.statement.id?.name === componentName
                    && componentInfo.statement.body.body.some(hasDisplayNameMember);
            }

            if (componentInfo.statement.type === 'VariableDeclaration') {
                for (const declarator of componentInfo.statement.declarations) {
                    if (declarator.id.type !== 'Identifier' || declarator.id.name !== componentName) {
                        continue;
                    }

                    const {init} = declarator;

                    if (init?.type === 'ClassExpression') {
                        return init.body.body.some(hasDisplayNameMember);
                    }
                }
            }

            return false;
        };

        if (propsTypeNode) {
            collectTypeReferences(propsTypeNode, propsTypeRefs);

            for (const name of propsTypeRefs) {
                if (typeDeclarations.has(name)) {
                    propsTypeNames.add(name);
                }
            }
        }

        /**
         * Determines whether a statement declares a type that is used as the component props. It inspects the statement
         * for a type declaration and compares the declared name against the collected props type names. It returns a
         * boolean so callers can classify statements into the props type section.
         *
         * @param statement The statement to inspect for a props type declaration.
         * @returns True when the statement declares a props type; otherwise false.
         *
         * @example
         * ```tsx
         * const isProps = isPropsTypeDeclaration(statement);
         * ```
         */
        const isPropsTypeDeclaration = (statement: TSESTree.Statement) => {
            const info = getTypeDeclarationInfo(statement);

            return Boolean(info && propsTypeNames.has(info.name));
        };

        /**
         * Determines whether a statement declares a type that is not used as the component props. It inspects the
         * statement for a type declaration and ensures the declared name is not among the collected props type names.
         * It returns a boolean so callers can classify statements into non-props type sections.
         *
         * @param statement The statement to inspect for a non-props type declaration.
         * @returns True when the statement declares a non-props type; otherwise false.
         *
         * @example
         * ```tsx
         * const isNonProps = isNonPropsTypeDeclaration(statement);
         * ```
         */
        const isNonPropsTypeDeclaration = (statement: TSESTree.Statement) => {
            const info = getTypeDeclarationInfo(statement);

            return Boolean(info && !propsTypeNames.has(info.name));
        };

        /**
         * Determines whether a statement is an optional variable-like declaration in the component file structure. It
         * filters out the main component statement and styled declarations to avoid misclassification. It considers
         * variable declarations, non-component function declarations, and enum declarations as optional declarations.
         *
         * @param statement The statement to evaluate for optional declaration status.
         * @returns True when the statement should be treated as an optional declaration; otherwise false.
         *
         * @example
         * ```tsx
         * const isOptional = isOptionalVarDeclaration(statement);
         * ```
         */
        const isOptionalVarDeclaration = (statement: TSESTree.Statement) => {
            if (statement.type === 'VariableDeclaration') {
                if (
                    statement === componentInfo.statement
                    || isStyledDeclaration(statement)
                    || isStyledFactoryDeclaration(statement)
                ) {
                    return false;
                }

                return true;
            }

            if (statement.type === 'FunctionDeclaration') {
                return statement !== componentInfo.statement;
            }

            return statement.type === 'TSEnumDeclaration';
        };

        /**
         * Determines the structural section number for a given statement in a component file. It checks the statement
         * against known component structure elements like imports, the main component, displayName assignment, exports,
         * styled declarations, optional declarations, and props types. It returns a numeric section marker to help
         * enforce ordering rules or null when the statement does not belong to a tracked section.
         *
         * @param statement The statement to classify within the component file structure.
         * @returns The numeric section identifier for the statement, or null when it does not match a section.
         *
         * @example
         * ```tsx
         * const section = sectionForStatement(statement);
         * ```
         */
        const sectionForStatement = (statement: TSESTree.Statement) => {
            if (statement.type === 'ImportDeclaration') {
                return 1;
            }

            if (statement === componentInfo.statement) {
                // eslint-disable-next-line @nfq/no-magic-numbers
                return 4;
            }

            if (isDisplayNameAssignment(statement, componentName)) {
                // eslint-disable-next-line @nfq/no-magic-numbers
                return 5;
            }

            if (
                isComponentExport(statement, componentName)
                || isDefaultComponentExport(statement, componentName)
            ) {
                // eslint-disable-next-line @nfq/no-magic-numbers
                return 6;
            }

            if (
                isNonPropsTypeDeclaration(statement)
                && statement.range[0] < componentInfo.statement.range[0]
            ) {
                // eslint-disable-next-line @nfq/no-magic-numbers
                return 2;
            }

            if (
                isStyledDeclaration(statement)
                || isStyledFactoryDeclaration(statement)
                || isNonPropsTypeDeclaration(statement)
            ) {
                // eslint-disable-next-line @nfq/no-magic-numbers
                return 7;
            }

            if (isOptionalVarDeclaration(statement)) {
                if (statement.range[0] > componentInfo.statement.range[0]) {
                    // eslint-disable-next-line @nfq/no-magic-numbers
                    return 5;
                }

                // eslint-disable-next-line @nfq/no-magic-numbers
                return 2;
            }

            if (isPropsTypeDeclaration(statement)) {
                // eslint-disable-next-line @nfq/no-magic-numbers
                return 3;
            }

            return null;
        };

        /**
         * Determines a human-readable label for a statement within the component file structure. It inspects the statement
         * type and section to produce a meaningful name for reporting order violations. It also handles special cases like
         * displayName assignments and exports so diagnostics are clear and actionable.
         *
         * @param statement The statement to derive a label for.
         * @param section   The section number associated with the statement.
         * @returns A descriptive name for the statement within its section.
         *
         * @example
         * ```tsx
         * const name = getStatementName(statement, 4);
         * ```
         */
        const getStatementName = (statement: TSESTree.Statement, section: number) => {
            // eslint-disable-next-line @nfq/no-magic-numbers
            if (section === 4) {
                return componentName;
            }

            // eslint-disable-next-line @nfq/no-magic-numbers
            if (section === 5 && isDisplayNameAssignment(statement, componentName)) {
                return `${componentName}.displayName`;
            }

            if (statement.type === 'VariableDeclaration') {
                const first = statement.declarations[0];

                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                if (first?.id.type === 'Identifier') {
                    return first.id.name;
                }
            }

            if (statement.type === 'FunctionDeclaration' || statement.type === 'ClassDeclaration') {
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                return statement.id?.name ?? getSectionLabel(section);
            }

            if (statement.type === 'ExportDefaultDeclaration') {
                const {declaration} = statement;

                if (declaration.type === 'Identifier') {
                    return `export default ${declaration.name}`;
                }

                if (declaration.type === 'ClassDeclaration' || declaration.type === 'FunctionDeclaration') {
                    if (declaration.id?.name) {
                        return `export default ${declaration.id.name}`;
                    }
                }

                return 'export default';
            }

            if (statement.type === 'ExportNamedDeclaration') {
                const names = statement.specifiers
                    .filter(specifier => specifier.local.type === 'Identifier')
                    // @ts-expect-error
                    .map(specifier => specifier.local.name as string);

                if (names.length === 1) {
                    return `export {${names[0]}}`;
                }

                if (names.length > 1) {
                    return 'export {...}';
                }
            }

            return getSectionLabel(section);
        };

        return {
            /**
             * Iterates over the program body statements to validate their order based on the defined component file structure. It
             * tracks the last seen section and reports any statement that appears in an earlier section than the last one. It also checks
             * for the presence of a displayName assignment and a named export for the component, reporting if either is missing.
             * This ensures that the component file adheres to the expected structure and includes necessary metadata for better maintainability and clarity.
             *
             * @example
             * ```tsx
             * Program();
             * ```
             */
            Program() {
                let lastSection = 0;
                let lastSectionName = '';
                let hasDisplayName = hasStaticDisplayName();
                let hasNamedExport = false;

                for (const statement of programBody) {
                    const section = sectionForStatement(statement as TSESTree.Statement);

                    // eslint-disable-next-line @nfq/no-magic-numbers
                    if (section === 5) {
                        hasDisplayName = true;
                    }

                    // eslint-disable-next-line @nfq/no-magic-numbers
                    if (section === 6) {
                        hasNamedExport = true;
                    }

                    if (!section) {
                        continue;
                    }

                    if (section < lastSection) {
                        context.report({
                            data: {
                                current: getSectionLabel(section),
                                currentName: getStatementName(statement as TSESTree.Statement, section),
                                order: ORDER_MESSAGE,
                                previous: getSectionLabel(lastSection),
                                previousName: lastSectionName || getSectionLabel(lastSection)
                            },
                            messageId: 'invalidOrder',
                            node: statement
                        });
                    } else {
                        lastSection = section;
                        lastSectionName = getStatementName(statement as TSESTree.Statement, section);
                    }
                }

                if (!hasDisplayName && !isPageComponent) {
                    context.report({
                        data: {name: componentName},
                        messageId: 'missingDisplayName',
                        node: componentInfo.statement
                    });
                }

                if (!hasNamedExport && !isPageComponent) {
                    context.report({
                        data: {name: componentName},
                        messageId: 'missingNamedExport',
                        node: componentInfo.statement
                    });
                }
            }
        } as TSESLint.RuleListener;
    }
});