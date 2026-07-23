import {nfqPluginRules} from './nfq';
import {reactRules} from './react';
import {reactA11y} from './react-a11y';
import {reactHooks} from './react-hooks';

export const reactPluginRules = {
    ...nfqPluginRules,
    ...reactRules,
    ...reactA11y,
    ...reactHooks
};

export {
    nfqPluginRules,
    reactRules,
    reactA11y,
    reactHooks
}