// @ts-nocheck
import {authenticate} from 'ApiRoutes/authenticate';
import type {Adapter} from 'Domain/Adapter';

export class ApiService implements Adapter {
	public call() {
		return authenticate;
	}
}
