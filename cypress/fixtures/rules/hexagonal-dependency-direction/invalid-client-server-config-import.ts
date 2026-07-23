// @ts-nocheck
import {agencyMap} from 'ServerConfigs/agencyMap';

interface ClientServiceAdapter {
	getConfig(): string;
}

export class ClientService implements ClientServiceAdapter {
	getConfig() {
		return agencyMap;
	}
}
