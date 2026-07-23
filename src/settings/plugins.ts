import * as pluginEmotion from '@emotion/eslint-plugin';
import pluginStylistic from '@stylistic/eslint-plugin';
// @ts-expect-error
import pluginArrayFunc from 'eslint-plugin-array-func';
import pluginCypress from 'eslint-plugin-cypress';
import * as pluginImport from 'eslint-plugin-import';
import pluginJsDoc from 'eslint-plugin-jsdoc';
// @ts-expect-error
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginNode from 'eslint-plugin-n';
// @ts-expect-error
import pluginNoUnsanitized from 'eslint-plugin-no-unsanitized';
// @ts-expect-error
import pluginPromise from 'eslint-plugin-promise';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
// @ts-expect-error
import pluginRedos from 'eslint-plugin-redos';
// @ts-expect-error
import pluginSecurity from 'eslint-plugin-security';
// @ts-expect-error
import pluginSortDestructureKeys from 'eslint-plugin-sort-destructure-keys';
// @ts-expect-error
import pluginStyledComponentsOrder from 'eslint-plugin-styled-components-order';

import {customRules} from '../rules/custom';

export const plugins: Record<string, any> = {
    '@emotion': pluginEmotion,
    '@nfq': customRules,
    '@stylistic': pluginStylistic,
    'array-func': pluginArrayFunc,
    cypress: pluginCypress,
    import: pluginImport,
    jsdoc: pluginJsDoc,
    'jsx-a11y': pluginJsxA11y,
    n: pluginNode,
    'no-unsanitized': pluginNoUnsanitized,
    promise: pluginPromise,
    react: pluginReact,
    'react-hooks': pluginReactHooks,
    redos: pluginRedos,
    security: pluginSecurity,
    'sort-destructure-keys': pluginSortDestructureKeys,
    'styled-components-order': pluginStyledComponentsOrder
};