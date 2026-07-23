import {componentFileStructure} from './component-file-structure';
import {componentSingleHook} from './component-single-hook';
import {cypressMountHook} from './cypress-mount-hook';
import {hexagonalDependencyDirection} from './hexagonal-dependency-direction';
import {noEmptyLinesInObjects} from './no-empty-lines-in-objects';
import {noEmptyLinesInTypes} from './no-empty-lines-in-types';
import {noMagicNumbers} from './no-magic-numbers';
import {noUnboundMethod} from './no-unbound-method';
import {objectPropertyNewline} from './object-property-newline';
import {requireGetCy} from './require-getcy';
import {sortKeys} from './sort-keys';
import {spreadTransientProps} from './spread-transient-props';
import {styledComponentsOrder} from './styled-components-order';

export const customRules = {
    rules: {
        'component-file-structure': componentFileStructure,
        'component-single-hook': componentSingleHook,
        'cypress-mount-hook': cypressMountHook,
        'hexagonal-dependency-direction': hexagonalDependencyDirection,
        'no-empty-lines-in-objects': noEmptyLinesInObjects,
        'no-empty-lines-in-types': noEmptyLinesInTypes,
        'no-magic-numbers': noMagicNumbers,
        'no-unbound-method': noUnboundMethod,
        'object-property-newline': objectPropertyNewline,
        'require-getcy': requireGetCy,
        'sort-keys': sortKeys,
        'spread-transient-props': spreadTransientProps,
        'styled-components-order': styledComponentsOrder
    }
};