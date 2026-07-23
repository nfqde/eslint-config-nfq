import {codeQuality} from './code-quality';
import {complexity} from './complexity';
import {errorPrevention} from './error-prevention';
import {modernJavaScript} from './modern-javascript';
import {strictMode} from './strict-mode';
import {variables} from './variables';

export const commonEslintRules = {
    ...errorPrevention,
    ...codeQuality,
    ...modernJavaScript,
    ...complexity,
    ...variables,
    ...strictMode
};

export {
    codeQuality,
    complexity,
    errorPrevention,
    modernJavaScript,
    strictMode,
    variables
};