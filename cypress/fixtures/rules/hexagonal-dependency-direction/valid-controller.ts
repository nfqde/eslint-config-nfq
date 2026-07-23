// @ts-nocheck
import {getThing} from 'Services/getThing';
import {makeError} from 'Errors/error';
import {middleware} from 'Middleware/auth';
import {log} from 'Utils/logger';

export const handler = () => ({getThing, makeError, middleware, log});
