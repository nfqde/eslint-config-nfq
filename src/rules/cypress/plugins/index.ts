import {cypress} from './cypress';
import {nfqPluginRules} from './nfq';

export const cypressPluginRules = {
    ...cypress,
    ...nfqPluginRules
};

export {cypress as cypressRules, nfqPluginRules as cypressNfqRules};