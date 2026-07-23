// @ts-nocheck
import {theme} from 'UI/theme/theme';

interface ServiceAdapter {
	getTheme(): string;
}

export class ThemeService implements ServiceAdapter {
	getTheme() {
		return theme;
	}
}
