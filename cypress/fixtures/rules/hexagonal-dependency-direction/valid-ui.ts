// @ts-nocheck
import type {HookType} from 'Application/useCases/useThing';
import {getConfig} from 'Application/configs/appConfig';
import {toLabel} from 'Application/utils/labels';
import {Button} from 'UI/components/Button';
import {sharedValue} from 'Shared/constants';

const Example = () => ({
    Button,
    HookType,
    getConfig,
    sharedValue,
    toLabel
});

export {Example};
