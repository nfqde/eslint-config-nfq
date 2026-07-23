import {arrayFunc} from './array-func';
import {emotion} from './emotion';
import {importRules} from './import';
import {jsdoc} from './jsdoc';
import {nfq} from './nfq';
import {promise} from './promise';
import {redos} from './redos';
import {sanitize} from './sanitize';
import {security} from './security';
import {stylistic} from './stylistic';

export const commonPluginRules = {
    ...arrayFunc,
    ...emotion,
    ...importRules,
    ...jsdoc,
    ...nfq,
    ...promise,
    ...redos,
    ...sanitize,
    ...security,
    ...stylistic
};

export {
    arrayFunc,
    emotion,
    importRules,
    jsdoc,
    nfq,
    promise,
    redos,
    sanitize,
    security,
    stylistic
}