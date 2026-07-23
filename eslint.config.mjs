import {defineConfig} from 'eslint/config';

// eslint-disable-next-line import/extensions
import {NFQEslintConfig} from './dist/index.js';

export default defineConfig([
    {
        extends: [NFQEslintConfig],
        ignores: [
            'types/**/*',
            'dist/**/*',
            'cypress/fixtures/rules/**/*'
        ]
    }
]);