import {eslint} from './eslint';
import {react} from './react';
import {security} from './security';

export const typescriptRuleResets = {
    ...react,
    ...eslint,
    ...security
};

export {
    eslint as typescriptEslintRules,
    react as typescriptReactRules,
    security as typescriptSecurityRules
}