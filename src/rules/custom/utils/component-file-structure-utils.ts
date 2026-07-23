import {ASTUtils} from '@typescript-eslint/utils';

import {getFunctionFromExpression, isUppercaseName} from './component-utils';
import {unwrapExpression} from './expression-utils';

import type {TSESTree} from '@typescript-eslint/utils';

export type ComponentInfo = {
    componentTypeNode?: TSESTree.Node | null;
    name: string;
    propsTypeNode?: TSESTree.Node | null;
    statement: TSESTree.Node;
};

export type TypeDeclarationInfo = {
    name: string;
    statement: TSESTree.Node;
};

/**
 * Determines whether a given AST node tree contains any JSX elements or fragments. It performs a depth-first traversal
 * using an explicit stack to avoid recursion and scans all child nodes except parent links. It returns true as soon as
 * a JSXElement or JSXFragment node is found and otherwise returns false after fully traversing the tree.
 *
 * @param node The AST node to scan for JSX content.
 * @returns True when the tree contains JSX elements or fragments, otherwise false.
 *
 * @remarks
 * This helper is used to detect component-like render bodies that include JSX.
 *
 * @example
 * ```tsx
 * const hasJsx = containsJsx(node);
 * ```
 */
export const containsJsx = (node: TSESTree.Node | null | undefined): boolean => {
    if (!node) {
        return false;
    }

    const stack: TSESTree.Node[] = [node];

    while (stack.length) {
        const current = stack.pop()!;

        if (current.type === 'JSXElement' || current.type === 'JSXFragment') {
            return true;
        }

        for (const key of Object.keys(current) as (keyof TSESTree.Node)[]) {
            if (key === 'parent') {
                continue;
            }

            const value = current[key];

            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if (!value || typeof value !== 'object') {
                continue;
            }

            if (Array.isArray(value)) {
                for (const item of value) {
                    if (item && typeof item === 'object' && 'type' in item) {
                        stack.push(item as TSESTree.Node);
                    }
                }
            } else if ('type' in value) {
                stack.push(value as unknown as TSESTree.Node);
            }
        }
    }

    return false;
};

/**
 * Determines whether the provided AST node represents a React component superclass. It checks for both direct
 * identifiers and React namespace member expressions. It returns true only when the name matches Component or
 * PureComponent and otherwise returns false.
 *
 * @param node The AST node to test for a component superclass reference.
 * @returns True when the node matches Component or PureComponent, otherwise false.
 *
 * @remarks
 * This helper is used to recognize React class component inheritance patterns.
 *
 * @example
 * ```tsx
 * const ok = isComponentSuperclass(node);
 * ```
 */
const isComponentSuperclass = (node: TSESTree.Node | null | undefined): boolean => {
    if (!node) {
        return false;
    }

    if (node.type === 'Identifier') {
        return node.name === 'Component' || node.name === 'PureComponent';
    }

    if (
        node.type === 'MemberExpression'
        && node.object.type === 'Identifier'
        && node.object.name === 'React'
        && node.property.type === 'Identifier'
    ) {
        return node.property.name === 'Component' || node.property.name === 'PureComponent';
    }

    return false;
};

/**
 * Determines whether a class declaration or expression represents a React class component. It validates the superclass
 * against React Component or PureComponent and then checks for a render method that returns JSX. It returns true only
 * when both conditions are satisfied.
 *
 * @param node The class declaration or expression node to inspect.
 * @returns True when the class extends a React component superclass and defines a JSX-producing render method.
 *
 * @remarks
 * This helper relies on a render method presence and JSX detection to identify class components.
 *
 * @example
 * ```tsx
 * const ok = isClassComponent(classNode);
 * ```
 */
const isClassComponent = (node: TSESTree.ClassDeclaration | TSESTree.ClassExpression): boolean => {
    if (!isComponentSuperclass(node.superClass)) {
        return false;
    }

    const renderMethod = node.body.body.find(
        member => member.type === 'MethodDefinition'
            && member.key.type === 'Identifier'
            && member.key.name === 'render'
    );

    // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
    if (!renderMethod || renderMethod.type !== 'MethodDefinition') {
        return false;
    }

    return containsJsx(renderMethod.value.body);
};

/**
 * Retrieves the props type node from the superclass type parameters of a class.
 *
 * @param node The class declaration or expression to inspect.
 * @returns The first type parameter node from the superclass, or `null` if none exists.
 */
const getSuperclassPropsType = (
    node: TSESTree.ClassDeclaration | TSESTree.ClassExpression
): TSESTree.Node | null => {
    const withSuperParams = node as unknown as {
        superTypeArguments?: {params?: TSESTree.Node[]};
        superTypeParameters?: {params?: TSESTree.Node[]};
    };

    const superParams = withSuperParams.superTypeArguments ?? withSuperParams.superTypeParameters;

    return superParams?.params?.[0] ?? null;
};

/**
 * Retrieves the type arguments from a call expression in a TypeScript AST node. It inspects both `typeArguments` and
 * `typeParameters` to cover parser variations and returns the collected list. It returns null when no type arguments
 * are present on the call expression.
 *
 * @param node The call expression node to inspect for type arguments.
 * @returns The array of type argument nodes when available, otherwise null.
 *
 * @remarks
 * This helper normalizes access to type arguments across parser versions.
 *
 * @example
 * ```tsx
 * const args = getTypeArguments(callExpression);
 * ```
 */
const getTypeArguments = (node: TSESTree.CallExpression): TSESTree.Node[] | null => {
    const withTypeArgs = node as unknown as {
        typeArguments?: {params?: TSESTree.Node[]};
        typeParameters?: {params?: TSESTree.Node[]};
    };

    const typeArgs = withTypeArgs.typeArguments ?? withTypeArgs.typeParameters;

    return typeArgs?.params ?? null;
};

/**
 * Determines whether a callee expression represents a React `forwardRef` call target. It supports both direct
 * identifiers and React namespace member expressions to cover common invocation styles. It returns true only when the
 * callee matches `forwardRef` in one of the recognized forms.
 *
 * @param callee The callee expression to test for a forwardRef reference.
 * @returns True when the callee resolves to a forwardRef call target, otherwise false.
 *
 * @remarks
 * This helper is used to detect forwardRef wrapper calls in initializer expressions.
 *
 * @example
 * ```tsx
 * const ok = isForwardRefCallee(call.callee);
 * ```
 */
const isForwardRefCallee = (callee: TSESTree.Expression): boolean => {
    if (callee.type === 'Identifier') {
        return callee.name === 'forwardRef';
    }

    return callee.type === 'MemberExpression'
        && callee.object.type === 'Identifier'
        && callee.object.name === 'React'
        && callee.property.type === 'Identifier'
        && callee.property.name === 'forwardRef';
};

/**
 * Extracts the props type argument from a `forwardRef` call expression, if present.
 *
 * Traverses nested call expressions to locate a `forwardRef` invocation and returns
 * the relevant type argument representing props.
 *
 * @param expression The expression to inspect for a `forwardRef` call.
 * @returns The props type node if found; otherwise `null`.
 */
const getForwardRefPropsType = (expression: TSESTree.Expression): TSESTree.Node | null => {
    const node = unwrapExpression(expression);

    if (node.type !== 'CallExpression') {
        return null;
    }

    if (isForwardRefCallee(node.callee)) {
        const typeArgs = getTypeArguments(node);

        if (!typeArgs || typeArgs.length === 0) {
            return null;
        }

        if (typeArgs.length > 1) {
            return typeArgs[1] ?? null;
        }

        return typeArgs[0] ?? null;
    }

    for (const argument of node.arguments) {
        if (argument.type === 'CallExpression') {
            const nested = getForwardRefPropsType(argument);

            if (nested) {
                return nested;
            }
        }
    }

    return null;
};

/**
 * Determines whether a statement declares a component-like function and returns structured details when it does.
 * It checks for uppercase-named function declarations and variable declarations initialized with arrow functions or
 * function expressions. It returns null when the statement does not match the expected component patterns.
 *
 * @param node The statement node to analyze for component declarations.
 * @returns The component information when a match is found, or null when no component is detected.
 *
 * @remarks
 * This helper relies on naming conventions and initializer inspection to infer component declarations.
 *
 * @example
 * ```tsx
 * const info = getComponentInfoFromStatement(statement);
 * ```
 */
export const getComponentInfoFromStatement = (node: TSESTree.Statement): ComponentInfo | null => {
    if (node.type === 'FunctionDeclaration' && isUppercaseName(node.id.name)) {
        if (!containsJsx(node.body)) {
            return null;
        }

        return {
            componentTypeNode: node.returnType?.typeAnnotation ?? null,
            name: node.id.name,
            propsTypeNode: node.params[0] && 'typeAnnotation' in node.params[0]
                ? node.params[0].typeAnnotation
                : null,
            statement: node
        };
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (node.type === 'ClassDeclaration' && node.id && isUppercaseName(node.id.name)) {
        if (!isClassComponent(node)) {
            return null;
        }

        return {
            componentTypeNode: null,
            name: node.id.name,
            propsTypeNode: getSuperclassPropsType(node),
            statement: node
        };
    }

    if (node.type !== 'VariableDeclaration') {
        return null;
    }

    for (const declarator of node.declarations) {
        if (!ASTUtils.isIdentifier(declarator.id)) {
            continue;
        }

        const {name} = declarator.id;

        if (!isUppercaseName(name) || !declarator.init) {
            continue;
        }

        const init = unwrapExpression(declarator.init);

        if (init.type === 'ClassExpression') {
            if (!isClassComponent(init)) {
                continue;
            }

            return {
                componentTypeNode: null,
                name,
                propsTypeNode: getSuperclassPropsType(init),
                statement: node
            };
        }

        const functionNode = getFunctionFromExpression(init);

        if (functionNode && containsJsx(functionNode.body)) {
            const initPropsType = functionNode.params[0] && 'typeAnnotation' in functionNode.params[0]
                ? functionNode.params[0].typeAnnotation
                : null;
            const forwardRefPropsType = getForwardRefPropsType(init);

            return {
                componentTypeNode: declarator.id.typeAnnotation?.typeAnnotation ?? null,
                name,
                propsTypeNode: initPropsType ?? forwardRefPropsType,
                statement: node
            };
        }
    }

    return null;
};

/**
 * Determines whether a statement assigns a display name to a component identifier. It narrows the statement to an
 * expression statement that performs an assignment and validates the left-hand side member access. It returns a boolean
 * indicating whether the assignment targets the specified component's displayName property.
 *
 * @param node          The statement node to inspect.
 * @param componentName The expected component identifier name.
 * @returns True when the statement assigns to the component's displayName property.
 *
 * @remarks
 * This helper is used to recognize explicit displayName assignments.
 *
 * @example
 * ```tsx
 * const ok = isDisplayNameAssignment(statement, 'Header');
 * ```
 */
export const isDisplayNameAssignment = (node: TSESTree.Statement, componentName: string) => {
    if (node.type !== 'ExpressionStatement') {
        return false;
    }

    const {expression} = node;

    if (expression.type !== 'AssignmentExpression') {
        return false;
    }

    const {left} = expression;

    if (left.type !== 'MemberExpression' || left.property.type !== 'Identifier') {
        return false;
    }

    return ASTUtils.isIdentifier(left.object)
        && left.object.name === componentName
        && left.property.name === 'displayName';
};

/**
 * Determines whether a statement is an export that re-exports a component identifier with the same name.
 * It inspects named export specifiers and verifies that both the local and exported names match the provided component
 * name. It returns false for non-named exports or when no matching specifier is found.
 *
 * @param node          The statement node to inspect.
 * @param componentName The expected component identifier name.
 * @returns True when the statement exports the component identifier by name.
 *
 * @remarks
 * This helper is used to detect explicit named exports of component identifiers.
 *
 * @example
 * ```tsx
 * const ok = isComponentExport(statement, 'Header');
 * ```
 */
export const isComponentExport = (node: TSESTree.Statement, componentName: string) => {
    if (node.type !== 'ExportNamedDeclaration' || !node.specifiers.length) {
        return false;
    }

    return node.specifiers.some(specifier => (
        specifier.local.type === 'Identifier'
        && specifier.local.name === componentName
        && specifier.exported.type === 'Identifier'
        && specifier.exported.name === componentName
    ));
};

/**
 * Determines whether a statement is a default export that targets a component identifier.
 * It supports `export default Identifier` and `export default class/function` declarations
 * with matching names.
 *
 * @param node          The statement node to inspect.
 * @param componentName The expected component identifier name.
 * @returns True when the statement default-exports the component.
 *
 * @example
 * ```tsx
 * const ok = isDefaultComponentExport(statement, 'App');
 * ```
 */
export const isDefaultComponentExport = (node: TSESTree.Statement, componentName: string) => {
    if (node.type !== 'ExportDefaultDeclaration') {
        return false;
    }

    const {declaration} = node;

    if (declaration.type === 'Identifier') {
        return declaration.name === componentName;
    }

    if (declaration.type === 'ClassDeclaration' || declaration.type === 'FunctionDeclaration') {
        // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
        return Boolean(declaration.id && declaration.id.name === componentName);
    }

    return false;
};

/**
 * Determines whether a statement declares a styled component variable using the styled tag factory. It inspects variable
 * declarations and checks tagged template expressions for identifiers, member expressions, or call expressions that
 * resolve to `styled`. It returns a boolean that indicates whether any declarator matches the styled component pattern.
 *
 * @param node The statement node to inspect for a styled component declaration.
 * @returns True when the statement contains a styled tagged template declaration.
 *
 * @remarks
 * This helper recognizes multiple `styled` invocation forms used in styled-components.
 *
 * @example
 * ```tsx
 * const ok = isStyledDeclaration(statement);
 * ```
 */
export const isStyledDeclaration = (node: TSESTree.Statement) => {
    if (node.type !== 'VariableDeclaration') {
        return false;
    }

    /**
     * Determines whether an expression represents a styled-components tagged template pattern. It unwraps the expression
     * to handle nested constructs and then checks identifiers, member expressions, and call expressions. It walks up the
     * tag chain until it can confirm the tag originates from `styled`, otherwise it reports false. This helper is scoped
     * to styled tagged template detection within variable declarations.
     *
     * @param expression The expression node to inspect for a styled tag origin.
     * @returns True when the expression resolves to a styled tag, otherwise false.
     *
     * @remarks
     * This helper tolerates chained member accesses and factory calls by recursively inspecting the tag origin.
     *
     * @example
     * ```tsx
     * const ok = isStyledTagExpression(tagExpression);
     * ```
     */
    const isStyledTagExpression = (expression: TSESTree.Expression): boolean => {
        const current = unwrapExpression(expression);

        if (ASTUtils.isIdentifier(current)) {
            return current.name === 'styled';
        }

        if (current.type === 'MemberExpression') {
            return current.object.type !== 'Super'
                && isStyledTagExpression(current.object as TSESTree.Expression);
        }

        if (current.type === 'CallExpression') {
            if (current.callee.type === 'Super') {
                return false;
            }

            return isStyledTagExpression(current.callee as TSESTree.Expression);
        }

        return false;
    };

    return node.declarations.some(declarator => {
        if (declarator.init?.type !== 'TaggedTemplateExpression') {
            return false;
        }

        return isStyledTagExpression(declarator.init.tag);
    });
};

const STYLED_FACTORY_NAMES = new Set(['motion', 'styled']);

/**
 * Determines whether a callee expression represents a styled component factory. It checks identifiers against a known
 * set of factory names and also recognizes motion member expressions. It returns true only when the callee matches one
 * of the supported styled factory patterns.
 *
 * @param callee The callee expression to inspect.
 * @returns True when the callee matches a supported styled factory.
 *
 * @remarks
 * This helper supports both direct factory identifiers and motion namespace member expressions.
 *
 * @example
 * ```tsx
 * const ok = isStyledFactory(unwrapExpression(call.callee));
 * ```
 */
const isStyledFactory = (callee: TSESTree.Expression): boolean => {
    if (ASTUtils.isIdentifier(callee)) {
        return STYLED_FACTORY_NAMES.has(callee.name);
    }

    if (
        callee.type === 'MemberExpression'
        && callee.object.type === 'Identifier'
        && callee.object.name === 'motion'
    ) {
        return true;
    }

    return false;
};

/**
 * Determines whether a statement declares a component factory call (motion(H1)).
 * These are treated similarly to styled components for ordering purposes.
 *
 * @param node The statement node to inspect.
 * @returns True when the statement contains a supported factory call declaration.
 *
 * @example
 * ```tsx
 * const ok = isStyledFactoryDeclaration(statement);
 * ```
 */
export const isStyledFactoryDeclaration = (node: TSESTree.Statement) => {
    if (node.type !== 'VariableDeclaration') {
        return false;
    }

    return node.declarations.some(declarator => {
        if (!declarator.init) {
            return false;
        }

        const init = unwrapExpression(declarator.init);

        if (init.type !== 'CallExpression') {
            return false;
        }

        const callee = unwrapExpression(init.callee);

        if (
            callee.type === 'MemberExpression'
            && callee.property.type === 'Identifier'
            && callee.property.name === 'withComponent'
        ) {
            return true;
        }

        return isStyledFactory(callee);
    });
};

/**
 * Extracts type declaration details from a statement when it represents a TypeScript interface or type alias.
 * It supports both direct declarations and named exports that wrap those declarations. It returns structured metadata
 * so callers can quickly access the declared name and statement node.
 *
 * @param node The statement node to inspect for a type declaration.
 * @returns The type declaration info when found, or null when the statement does not declare a type.
 *
 * @remarks
 * This helper simplifies handling exported and non-exported type declarations in AST traversal.
 *
 * @example
 * ```tsx
 * const info = getTypeDeclarationInfo(statement);
 * ```
 */
export const getTypeDeclarationInfo = (node: TSESTree.Statement): TypeDeclarationInfo | null => {
    if (node.type === 'TSInterfaceDeclaration' || node.type === 'TSTypeAliasDeclaration') {
        return {
            name: node.id.name,
            statement: node
        };
    }

    if (node.type === 'ExportNamedDeclaration' && node.declaration) {
        const {declaration} = node;

        if (declaration.type === 'TSInterfaceDeclaration' || declaration.type === 'TSTypeAliasDeclaration') {
            return {
                name: declaration.id.name,
                statement: node
            };
        }
    }

    return null;
};

/**
 * Collects type reference identifiers from a TypeScript AST node and records them in a provided set. It walks the node
 * recursively, skipping parent links to avoid cycles, and handles both singular child nodes and arrays of nodes. It
 * updates the provided set in place and does not return a value.
 *
 * @param typeNode The AST node to scan for type references.
 * @param names    The set that receives discovered type reference names.
 *
 * @remarks
 * This helper is intended for internal traversal of TypeScript type nodes.
 *
 * @example
 * ```tsx
 * const names = new Set<string>();
 * collectTypeReferences(typeNode, names);
 * ```
 */
export const collectTypeReferences = (typeNode: TSESTree.Node, names: Set<string>) => {
    if (typeNode.type === 'TSTypeReference') {
        if (typeNode.typeName.type === 'Identifier') {
            names.add(typeNode.typeName.name);
        }
    }

    for (const key of Object.keys(typeNode) as (keyof typeof typeNode)[]) {
        if (key === 'parent') {
            continue;
        }
        const value = typeNode[key];

        if (typeof value !== 'object') {
            continue;
        }

        if (Array.isArray(value)) {
            for (const item of value) {
                if (item && typeof item === 'object') {
                    collectTypeReferences(item as TSESTree.Node, names);
                }
            }
        } else {
            collectTypeReferences(value as unknown as TSESTree.Node, names);
        }
    }
};