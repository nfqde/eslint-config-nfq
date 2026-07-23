import {nfqRules} from './nfq';
import {tsEslint} from './ts-eslint';

export const tsRules = {
    ...tsEslint,
    ...nfqRules
};

export {nfqRules as tsNfqRules, tsEslint as tsEslintRules};