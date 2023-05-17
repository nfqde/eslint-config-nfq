/* eslint-disable max-lines */
/* eslint-disable no-inline-comments */

const SPACE_INDENT = 4;

module.exports = {
    // View link below for react rules documentation
    // https://github.com/yannickcr/eslint-plugin-react#list-of-supported-rules
    rules: {
        'class-methods-use-this': [
            'off',
            {
                exceptMethods: [
                    'render',
                    'getInitialState',
                    'getDefaultProps',
                    'getChildContext',
                    'componentWillMount',
                    'UNSAFE_componentWillMount',
                    'componentDidMount',
                    'componentWillReceiveProps',
                    'UNSAFE_componentWillReceiveProps',
                    'shouldComponentUpdate',
                    'componentWillUpdate',
                    'UNSAFE_componentWillUpdate',
                    'componentDidUpdate',
                    'componentWillUnmount',
                    'componentDidCatch',
                    'getSnapshotBeforeUpdate'
                ]
            }
        ],
        'jsx-quotes': ['error', 'prefer-double'], // Specify whether double or single quotes should be used in JSX attributes https://eslint.org/docs/rules/jsx-quotes
        'no-underscore-dangle': [
            'error',
            {
                allow: ['_id', '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'],
                allowAfterSuper: false,
                allowAfterThis: false,
                enforceInMethodNames: true
            }
        ],
        'react/boolean-prop-naming': [
            'warn',
            {
                message: 'It is better if your prop ({{ propName }}) matches an common boolean pattern!',
                propTypeNames: ['bool', 'mutuallyExclusiveTrueProps'],
                rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+'
            }
        ], // Enforces consistent naming for boolean props https://github.com/yannickcr/eslint-plugin-react/blob/843d71a432baf0f01f598d7cf1eea75ad6896e4b/docs/rules/boolean-prop-naming.md
        'react/button-has-type': [
            'error',
            {
                button: true,
                reset: true,
                submit: true
            }
        ], // Prevent usage of button elements without an explicit type attribute https://github.com/yannickcr/eslint-plugin-react/blob/843d71a432baf0f01f598d7cf1eea75ad6896e4b/docs/rules/button-has-type.md
        'react/default-props-match-prop-types': ['error', {allowRequiredDefaults: false}], // Enforce all defaultProps have a corresponding non-required PropType https://github.com/yannickcr/eslint-plugin-react/blob/9e13ae2c51e44872b45cc15bf1ac3a72105bdd0e/docs/rules/default-props-match-prop-types.md
        'react/destructuring-assignment': ['error', 'always'], // Enforce consistent usage of destructuring assignment of props, state, and context https://github.com/yannickcr/eslint-plugin-react/blob/843d71a432baf0f01f598d7cf1eea75ad6896e4b/docs/rules/destructuring-assignment.md
        'react/display-name': ['off', {ignoreTranspilerName: false}], // Prevent missing displayName in a React component definition https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/display-name.md
        'react/forbid-component-props': ['off', {forbid: []}], // Forbid certain props on Components https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-component-props.md
        'react/forbid-dom-props': ['off', {forbid: []}], // Forbid certain props on DOM Nodes https://github.com/yannickcr/eslint-plugin-react/blob/843d71a432baf0f01f598d7cf1eea75ad6896e4b/docs/rules/forbid-dom-props.md
        'react/forbid-elements': ['off', {forbid: []}], // Forbid certain elements https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-elements.md
        'react/forbid-foreign-prop-types': ['warn', {allowInPropTypes: true}], // Forbids using non-exported propTypes  https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-foreign-prop-types.md
        'react/forbid-prop-types': [
            'error',
            {
                checkChildContextTypes: true,
                checkContextTypes: true,
                forbid: ['any']
            }
        ], // Forbid certain propTypes (any, array, object) https://github.com/yannickcr/eslint-plugin-react/blob/843d71a432baf0f01f598d7cf1eea75ad6896e4b/docs/rules/forbid-prop-types.md
        'react/function-component-definition': [
            'error',
            {
                namedComponents: 'arrow-function',
                unnamedComponents: 'arrow-function'
            }
        ], // Enforce a specific function type for function components  https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/function-component-definition.md
        'react/jsx-boolean-value': ['error', 'never', {always: []}], // Enforce boolean attributes notation in JSX https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md
        'react/jsx-child-element-spacing': 'error', // Ensures inline tags are not rendered without spaces between them https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-child-element-spacing.md
        'react/jsx-closing-bracket-location': ['error', 'line-aligned'], // Validate closing bracket location in JSX https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md
        'react/jsx-closing-tag-location': 'error', // Validate closing tag location in JSX https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-tag-location.md
        'react/jsx-curly-brace-presence': [
            'error',
            {
                children: 'never',
                props: 'never'
            }
        ], // Enforce curly braces or disallow unnecessary curly braces in JSX props and/or children https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-curly-brace-presence.md
        'react/jsx-curly-newline': [
            'error',
            {
                multiline: 'consistent',
                singleline: 'consistent'
            }
        ], // Enforce linebreaks in curly braces in JSX attributes and expressions. https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-curly-newline.md
        'react/jsx-curly-spacing': ['error', 'never', {allowMultiline: true}], // Enforce or disallow spaces inside of curly braces in JSX attributes https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-curly-spacing.md
        'react/jsx-equals-spacing': ['error', 'never'], // Enforce spacing around jsx equals signs https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-equals-spacing.md
        'react/jsx-filename-extension': ['error', {extensions: ['.jsx', '.tsx']}], // only .jsx files may have JSX https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
        'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'], // Require that the first prop in a JSX element be on a new line when the element is multiline https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-first-prop-new-line.md
        'react/jsx-fragments': ['error', 'syntax'], // Enforce shorthand or standard form for React fragments https://github.com/yannickcr/eslint-plugin-react/blob/bc976b837abeab1dffd90ac6168b746a83fc83cc/docs/rules/jsx-fragments.md
        'react/jsx-handler-names': [
            'error',
            {
                eventHandlerPrefix: 'handle',
                eventHandlerPropPrefix: 'on'
            }
        ], // Enforce event handler naming conventions in JSX https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-handler-names.md
        'react/jsx-indent': [
            'error',
            SPACE_INDENT,
            {
                checkAttributes: true,
                indentLogicalExpressions: true
            }
        ], // Enforce JSX indentation https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent.md
        'react/jsx-indent-props': ['error', SPACE_INDENT], // Validate props indentation in JSX https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent-props.md
        'react/jsx-key': ['error', {checkFragmentShorthand: true}], // Validate JSX has key prop when in array or iterator https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-key.md
        'react/jsx-max-depth': 'off', // Validate JSX maximum depth https://github.com/yannickcr/eslint-plugin-react/blob/abe8381c0d6748047224c430ce47f02e40160ed0/docs/rules/jsx-max-depth.md
        'react/jsx-max-props-per-line': [
            'error',
            {
                maximum: 1,
                when: 'multiline'
            }
        ], // Limit maximum of props on a single line in JSX https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-max-props-per-line.md
        'react/jsx-no-bind': [
            'error',
            {
                allowArrowFunctions: true,
                allowBind: false,
                allowFunctions: false,
                ignoreDOMComponents: false,
                ignoreRefs: true
            }
        ], // Prevent usage of .bind() in JSX props https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md
        'react/jsx-no-comment-textnodes': 'error', // prevent accidental JS comments from being injected into JSX as text https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-comment-textnodes.md
        'react/jsx-no-duplicate-props': ['error', {ignoreCase: true}], // Prevent duplicate props in JSX https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-duplicate-props.md
        'react/jsx-no-literals': ['off', {noStrings: true}], // Prevent usage of unwrapped JSX strings https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-literals.md
        'react/jsx-no-script-url': [
            'error',
            [
                {
                    name: 'Link',
                    props: ['to']
                }
            ]
        ], // Prevent usage of `javascript:` URLs https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-script-url.md
        'react/jsx-no-target-blank': ['error', {enforceDynamicLinks: 'always'}], // Disallow target="_blank" on links https://github.com/yannickcr/eslint-plugin-react/blob/ac102885765be5ff37847a871f239c6703e1c7cc/docs/rules/jsx-no-target-blank.md
        'react/jsx-no-undef': ['error', {allowGlobals: true}], // Disallow undeclared variables in JSX https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-undef.md
        'react/jsx-no-useless-fragment': 'error', // Disallow unnecessary fragments https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-useless-fragment.md
        'react/jsx-one-expression-per-line': ['off', {allow: 'single-child'}], // One JSX Element Per Line https://github.com/yannickcr/eslint-plugin-react/blob/843d71a432baf0f01f598d7cf1eea75ad6896e4b/docs/rules/jsx-one-expression-per-line.md
        'react/jsx-pascal-case': [
            'error',
            {
                allowAllCaps: false,
                ignore: []
            }
        ], // Enforce PascalCase for user-defined JSX components https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md
        'react/jsx-props-no-multi-spaces': 'error', // Disallow multiple spaces between inline JSX props https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-props-no-multi-spaces.md
        'react/jsx-props-no-spreading': [
            'error',
            {
                custom: 'enforce',
                exceptions: [],
                explicitSpread: 'ignore',
                html: 'enforce'
            }
        ], // Disallow JSX props spreading https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-props-no-spreading.md
        'react/jsx-sort-props': [
            'error',
            {
                callbacksLast: true,
                ignoreCase: true,
                noSortAlphabetically: false,
                reservedFirst: true,
                shorthandFirst: false,
                shorthandLast: true
            }
        ], // Enforce props alphabetical sorting https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-sort-props.md
        'react/jsx-tag-spacing': [
            'error',
            {
                afterOpening: 'never',
                beforeClosing: 'never',
                beforeSelfClosing: 'always',
                closingSlash: 'never'
            }
        ], // Validate whitespace in and around the JSX opening and closing brackets https://github.com/yannickcr/eslint-plugin-react/blob/843d71a432baf0f01f598d7cf1eea75ad6896e4b/docs/rules/jsx-tag-spacing.md
        'react/jsx-uses-react': 'error', // Prevent React to be incorrectly marked as unused https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-uses-react.md
        'react/jsx-uses-vars': 'error', // Prevent variables used in JSX to be incorrectly marked as unused https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-uses-vars.md
        'react/jsx-wrap-multilines': [
            'error',
            {
                arrow: 'parens-new-line',
                assignment: 'parens-new-line',
                condition: 'parens-new-line',
                declaration: 'parens-new-line',
                logical: 'parens-new-line',
                prop: 'parens-new-line',
                return: 'parens-new-line'
            }
        ], // Prevent missing parentheses around multilines JSX https://github.com/yannickcr/eslint-plugin-react/blob/843d71a432baf0f01f598d7cf1eea75ad6896e4b/docs/rules/jsx-wrap-multilines.md
        'react/no-access-state-in-setstate': 'error', // Prevent using this.state within a this.setState https://github.com/yannickcr/eslint-plugin-react/blob/843d71a432baf0f01f598d7cf1eea75ad6896e4b/docs/rules/no-access-state-in-setstate.md
        'react/no-adjacent-inline-elements': 'off', // Prevent adjacent inline elements not separated by whitespace https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-adjacent-inline-elements.md
        'react/no-array-index-key': 'error', // Prevent usage of Array index in keys https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md
        'react/no-children-prop': 'error', // Prevent passing of children as props https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-children-prop.md
        'react/no-danger': 'warn', // Prevent usage of dangerous JSX properties https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-danger.md
        'react/no-danger-with-children': 'error', // Prevent problem with children and props.dangerouslySetInnerHTML https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-danger-with-children.md
        'react/no-deprecated': 'error', // Prevent usage of deprecated methods https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-deprecated.md
        'react/no-did-mount-set-state': 'off', // Prevent usage of setState in componentDidMount this is necessary for server-rendering https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-did-mount-set-state.md
        'react/no-did-update-set-state': 'error', // Prevent usage of setState in componentDidUpdate https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-did-update-set-state.md
        'react/no-direct-mutation-state': 'error', // Prevent direct mutation of this.state https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-direct-mutation-state.md
        'react/no-find-dom-node': 'error', // warn against using findDOMNode() https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-find-dom-node.md
        'react/no-is-mounted': 'error', // Prevent usage of isMounted https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-is-mounted.md
        'react/no-multi-comp': ['error', {ignoreStateless: true}], // Prevent multiple component definition per file https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-multi-comp.md
        'react/no-redundant-should-component-update': 'error', // Prevent usage of shouldComponentUpdate when extending React.PureComponent https://github.com/yannickcr/eslint-plugin-react/blob/9e13ae2c51e44872b45cc15bf1ac3a72105bdd0e/docs/rules/no-redundant-should-component-update.md
        'react/no-render-return-value': 'error', // disallow using React.render/ReactDOM.render's return value https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-render-return-value.md
        'react/no-set-state': 'off', // Prevent usage of setState https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-set-state.md
        'react/no-string-refs': 'error', // Prevent using string references https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-string-refs.md
        'react/no-this-in-sfc': 'error', // Prevent this from being used in stateless functional components https://github.com/yannickcr/eslint-plugin-react/blob/843d71a432baf0f01f598d7cf1eea75ad6896e4b/docs/rules/no-this-in-sfc.md
        'react/no-typos': 'error', // Prevents common casing typos https://github.com/yannickcr/eslint-plugin-react/blob/73abadb697034b5ccb514d79fb4689836fe61f91/docs/rules/no-typos.md
        'react/no-unescaped-entities': 'error', // Prevent invalid characters from appearing in markup https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unescaped-entities.md
        'react/no-unknown-property': 'error', // Prevent usage of unknown DOM property https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unknown-property.md
        'react/no-unsafe': ['error', {checkAliases: true}], // Prevent usage of UNSAFE_ methods https://github.com/yannickcr/eslint-plugin-react/blob/157cc932be2cfaa56b3f5b45df6f6d4322a2f660/docs/rules/no-unsafe.md
        'react/no-unused-prop-types': [
            'error',
            {
                customValidators: [],
                skipShapeProps: true
            }
        ], // Prevent unused propType definitions https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unused-prop-types.md
        'react/no-unused-state': 'error', // Prevent unused state values https://github.com/yannickcr/eslint-plugin-react/pull/1103/
        'react/no-will-update-set-state': 'error', // Prevent usage of setState in componentWillUpdate https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-will-update-set-state.md
        'react/prefer-es6-class': ['error', 'always'], // Require ES6 class declarations over React.createClass https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-es6-class.md
        'react/prefer-read-only-props': 'off', // Enforce that props are read-only https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-read-only-props.md
        'react/prefer-stateless-function': ['off', {ignorePureComponents: true}], // Require stateless functions when not using lifecycle methods, setState or ref https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md
        'react/prop-types': [
            'off',
            {
                customValidators: [],
                ignore: [],
                skipUndeclared: false
            }
        ], // Prevent missing props validation in a React component definition https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prop-types.md
        'react/react-in-jsx-scope': 'off', // Prevent missing React when using JSX https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/react-in-jsx-scope.md
        'react/require-default-props': ['error', {forbidDefaultForRequired: true}], // Enforce a defaultProps definition for every prop that is not a required prop https://github.com/yannickcr/eslint-plugin-react/blob/843d71a432baf0f01f598d7cf1eea75ad6896e4b/docs/rules/require-default-props.md
        'react/require-optimization': ['off', {allowDecorators: ['viewRender']}], // require a shouldComponentUpdate method, or PureRenderMixin https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-optimization.md
        'react/require-render-return': 'error', // Require render() methods to return something https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-render-return.md
        'react/self-closing-comp': 'error', // Prevent extra closing tags for components without children https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md
        'react/sort-comp': [
            'error',
            {
                groups: {
                    lifecycle: [
                        'displayName',
                        'propTypes',
                        'contextTypes',
                        'childContextTypes',
                        'mixins',
                        'statics',
                        'defaultProps',
                        'constructor',
                        'getDefaultProps',
                        'getInitialState',
                        'state',
                        'getChildContext',
                        'getDerivedStateFromProps',
                        'componentWillMount',
                        'UNSAFE_componentWillMount',
                        'componentDidMount',
                        'componentWillReceiveProps',
                        'UNSAFE_componentWillReceiveProps',
                        'shouldComponentUpdate',
                        'componentWillUpdate',
                        'UNSAFE_componentWillUpdate',
                        'getSnapshotBeforeUpdate',
                        'componentDidUpdate',
                        'componentDidCatch',
                        'componentWillUnmount'
                    ],
                    rendering: [
                        '/^render.+$/',
                        'render'
                    ]
                },
                order: [
                    'static-variables',
                    'static-methods',
                    'instance-variables',
                    'lifecycle',
                    '/^on.+$/',
                    'getters',
                    'setters',
                    '/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/',
                    'instance-methods',
                    'everything-else',
                    'rendering'
                ]
            }
        ], // Enforce component methods order https://github.com/yannickcr/eslint-plugin-react/blob/843d71a432baf0f01f598d7cf1eea75ad6896e4b/docs/rules/sort-comp.md
        'react/sort-default-props': ['error', {ignoreCase: true}], // Enforce defaultProps declarations alphabetical sorting https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/sort-default-props.md
        'react/sort-prop-types': [
            'error',
            {
                callbacksLast: true,
                ignoreCase: true,
                requiredFirst: true,
                sortShapeProp: true
            }
        ], // Enforce propTypes declarations alphabetical sorting https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/sort-prop-types.md
        'react/state-in-constructor': ['error', 'always'], // Enforce state initialization style https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/state-in-constructor.md
        'react/static-property-placement': ['error', 'static public field'], // Enforces where React component static properties should be positioned https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/static-property-placement.md
        'react/style-prop-object': 'off', // Require style prop value be an object or var https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/style-prop-object.md
        'react/void-dom-elements-no-children': 'error' // Prevent void DOM elements from receiving children https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/void-dom-elements-no-children.md
    }
};