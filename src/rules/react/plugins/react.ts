const SPACE_INDENT = 4;

export const reactRules = {
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
    ],
    'react/button-has-type': [
        'error',
        {
            button: true,
            reset: true,
            submit: true
        }
    ],
    'react/checked-requires-onchange-or-readonly': 'error',
    'react/default-props-match-prop-types': ['error', {allowRequiredDefaults: false}],
    'react/destructuring-assignment': ['error', 'always'],
    'react/display-name': ['off', {ignoreTranspilerName: true}],
    'react/forbid-component-props': ['off', {forbid: []}],
    'react/forbid-dom-props': ['off', {forbid: []}],
    'react/forbid-elements': ['off', {forbid: []}],
    'react/forbid-foreign-prop-types': ['warn', {allowInPropTypes: true}],
    'react/forbid-prop-types': [
        'error',
        {
            checkChildContextTypes: true,
            checkContextTypes: true,
            forbid: ['any']
        }
    ],
    'react/function-component-definition': [
        'error',
        {
            namedComponents: 'arrow-function',
            unnamedComponents: 'arrow-function'
        }
    ],
    'react/iframe-missing-sandbox': 'error',
    'react/jsx-boolean-value': ['error', 'never', {always: []}],
    'react/jsx-child-element-spacing': 'error',
    'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
    'react/jsx-closing-tag-location': 'error',
    'react/jsx-curly-brace-presence': [
        'error',
        {
            children: 'never',
            props: 'never'
        }
    ],
    'react/jsx-curly-newline': [
        'error',
        {
            multiline: 'consistent',
            singleline: 'consistent'
        }
    ],
    'react/jsx-curly-spacing': ['error', 'never', {allowMultiline: true}],
    'react/jsx-equals-spacing': ['error', 'never'],
    'react/jsx-filename-extension': ['error', {extensions: ['.jsx', '.tsx']}],
    'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
    'react/jsx-fragments': ['error', 'syntax'],
    'react/jsx-handler-names': [
        'error',
        {
            eventHandlerPrefix: 'handle',
            eventHandlerPropPrefix: 'on'
        }
    ],
    'react/jsx-indent': [
        'error',
        SPACE_INDENT,
        {
            checkAttributes: true,
            indentLogicalExpressions: true
        }
    ],
    'react/jsx-indent-props': ['error', SPACE_INDENT],
    'react/jsx-key': [
        'error',
        {
            checkFragmentShorthand: true,
            checkKeyMustBeforeSpread: true,
            warnOnDuplicates: true
        }
    ],
    'react/jsx-max-depth': 'off',
    'react/jsx-max-props-per-line': [
        'error',
        {
            maximum: 1,
            when: 'multiline'
        }
    ],
    'react/jsx-newline': ['error', {prevent: true}],
    'react/jsx-no-bind': [
        'error',
        {
            allowArrowFunctions: true,
            allowBind: false,
            allowFunctions: false,
            ignoreDOMComponents: false,
            ignoreRefs: true
        }
    ],
    'react/jsx-no-comment-textnodes': 'error',
    'react/jsx-no-duplicate-props': ['error', {ignoreCase: true}],
    'react/jsx-no-leaked-render': 'off',
    'react/jsx-no-literals': ['off', {noStrings: true}],
    'react/jsx-no-script-url': [
        'error',
        [
            {
                name: 'Link',
                props: ['to']
            }
        ]
    ],
    'react/jsx-no-target-blank': ['error', {enforceDynamicLinks: 'always'}],
    'react/jsx-no-undef': ['error', {allowGlobals: true}],
    'react/jsx-no-useless-fragment': 'error',
    'react/jsx-one-expression-per-line': ['off', {allow: 'single-child'}],
    'react/jsx-pascal-case': [
        'error',
        {
            allowAllCaps: false,
            ignore: []
        }
    ],
    'react/jsx-props-no-multi-spaces': 'error',
    'react/jsx-props-no-spread-multi': 'error',
    'react/jsx-props-no-spreading': [
        'error',
        {
            custom: 'enforce',
            exceptions: [],
            explicitSpread: 'ignore',
            html: 'enforce'
        }
    ],
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
    ],
    'react/jsx-tag-spacing': [
        'error',
        {
            afterOpening: 'never',
            beforeClosing: 'never',
            beforeSelfClosing: 'always',
            closingSlash: 'never'
        }
    ],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
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
    ],
    'react/no-access-state-in-setstate': 'error',
    'react/no-adjacent-inline-elements': 'off',
    'react/no-array-index-key': 'error',
    'react/no-arrow-function-lifecycle': 'error',
    'react/no-children-prop': 'error',
    'react/no-danger': 'warn',
    'react/no-danger-with-children': 'error',
    'react/no-deprecated': 'error',
    'react/no-did-mount-set-state': 'off',
    'react/no-did-update-set-state': 'error',
    'react/no-direct-mutation-state': 'error',
    'react/no-find-dom-node': 'error',
    'react/no-is-mounted': 'error',
    'react/no-multi-comp': ['error', {ignoreStateless: true}],
    'react/no-namespace': 'error',
    'react/no-redundant-should-component-update': 'error',
    'react/no-render-return-value': 'error',
    'react/no-set-state': 'off',
    'react/no-string-refs': 'error',
    'react/no-this-in-sfc': 'error',
    'react/no-typos': 'error',
    'react/no-unescaped-entities': 'error',
    'react/no-unknown-property': 'error',
    'react/no-unsafe': ['error', {checkAliases: true}],
    'react/no-unused-class-component-methods': 'off',
    'react/no-unused-prop-types': [
        'error',
        {
            customValidators: [],
            skipShapeProps: true
        }
    ],
    'react/no-unused-state': 'error',
    'react/no-will-update-set-state': 'error',
    'react/prefer-es6-class': ['error', 'always'],
    'react/prefer-read-only-props': 'off',
    'react/prefer-stateless-function': ['off', {ignorePureComponents: true}],
    'react/prop-types': [
        'off',
        {
            customValidators: [],
            ignore: [],
            skipUndeclared: false
        }
    ],
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': ['error', {forbidDefaultForRequired: true}],
    'react/require-optimization': ['off', {allowDecorators: ['viewRender']}],
    'react/require-render-return': 'error',
    'react/self-closing-comp': 'error',
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
    ],
    'react/sort-default-props': ['error', {ignoreCase: true}],
    'react/sort-prop-types': [
        'error',
        {
            callbacksLast: true,
            ignoreCase: true,
            requiredFirst: true,
            sortShapeProp: true
        }
    ],
    'react/state-in-constructor': ['error', 'always'],
    'react/static-property-placement': ['error', 'static public field'],
    'react/style-prop-object': 'off',
    'react/void-dom-elements-no-children': 'error'
};