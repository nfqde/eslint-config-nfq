export {};

/**
 *
 * @param name
 */
const fixture = (name: string) => `cypress/fixtures/rules/hexagonal-dependency-direction/${name}`;

const aliasSettings = {
    'import/resolver': {
        alias: {
            map: [
                ['Application', './src/client/application/'],
                ['Domain', './src/client/domain/'],
                ['Shared', './src/client/shared/'],
                ['Fonts', './src/client/ui/assets/fonts/'],
                ['Images', './src/client/ui/assets/images/'],
                ['UI', './src/client/ui/'],
                ['ApiRoutes', './src/pages/api/'],
                ['Controllers', './src/server/controllers/'],
                ['Errors', './src/server/errors/'],
                ['Queries', './src/server/queries/'],
                ['ServerDomain', './src/server/domain/'],
                ['Middleware', './src/server/middleware/'],
                ['Services', './src/server/services/'],
                ['ServerConfigs', './src/server/configs/'],
                ['Utils', './src/server/utils/'],
                ['Tests', './cypress/']
            ]
        }
    }
};

const aliasSettingsMissing = {
    'import/resolver': {
        alias: {
            map: [
                ['Application', './src/client/application/'],
                ['Domain', './src/client/domain/'],
                ['UI', './src/client/ui/'],
                ['Controllers', './src/server/controllers/'],
                ['ServerDomain', './src/server/domain/'],
                ['Services', './src/server/services/']
            ]
        }
    }
};

describe('hexagonal-dependency-direction', () => {
    it('accepts UI allowed imports', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'hexagonal-dependency-direction',
        valid: [
            {
                filename: '__virtual__/src/client/ui/Example.tsx',
                name: 'ui allowed',
                settings: aliasSettings,
                sourceFilename: fixture('valid-ui.ts')
            }
        ]
    }));

    it('accepts UI domain imports', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'hexagonal-dependency-direction',
        valid: [
            {
                filename: '__virtual__/src/client/ui/modules/statistics/utils.ts',
                name: 'ui domain allowed',
                settings: aliasSettings,
                sourceFilename: fixture('valid-ui-domain-import.ts')
            }
        ]
    }));

    it('accepts server controller imports', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'hexagonal-dependency-direction',
        valid: [
            {
                filename: '__virtual__/src/server/controllers/handler.ts',
                name: 'server controller allowed',
                settings: aliasSettings,
                sourceFilename: fixture('valid-controller.ts')
            }
        ]
    }));

    it('accepts api imports', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'hexagonal-dependency-direction',
        valid: [
            {
                filename: '__virtual__/src/pages/api/handler.ts',
                name: 'api allowed',
                settings: aliasSettings,
                sourceFilename: fixture('valid-api.ts')
            }
        ]
    }));

    it('accepts client service api imports', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'hexagonal-dependency-direction',
        valid: [
            {
                filename: '__virtual__/src/client/application/services/api.ts',
                name: 'client service api import',
                settings: aliasSettings,
                sourceFilename: fixture('valid-client-service-api.ts')
            }
        ]
    }));

    it('accepts domain config import', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'hexagonal-dependency-direction',
        valid: [
            {
                filename: '__virtual__/src/server/domain/config.ts',
                name: 'domain config import',
                settings: aliasSettings,
                sourceFilename: fixture('valid-domain-config.ts')
            }
        ]
    }));

    it('accepts application shared imports', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'hexagonal-dependency-direction',
        valid: [
            {
                filename: '__virtual__/src/client/application/useCases/Thing.ts',
                name: 'application shared import',
                settings: aliasSettings,
                sourceFilename: fixture('valid-application-shared-import.ts')
            }
        ]
    }));

    it('accepts service implements', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'hexagonal-dependency-direction',
        valid: [
            {
                filename: '__virtual__/src/client/application/services/Service.ts',
                name: 'service implements',
                settings: aliasSettings,
                sourceFilename: fixture('valid-service-implements.ts')
            }
        ]
    }));

    it('accepts mobx store', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'hexagonal-dependency-direction',
        valid: [
            {
                filename: '__virtual__/src/client/application/services/Store.ts',
                name: 'mobx store',
                settings: aliasSettings,
                sourceFilename: fixture('valid-mobx-store.ts')
            }
        ]
    }));

    it('reports domain import', () => cy.runRuleTester({
        invalid: [
            {
                errors: [{messageId: 'domainImport'}],
                filename: '__virtual__/src/client/domain/Thing.ts',
                name: 'domain import',
                settings: aliasSettings,
                sourceFilename: fixture('invalid-domain-import.ts')
            }
        ],
        ruleName: 'hexagonal-dependency-direction',
        valid: []
    }));

    it('reports ui import', () => cy.runRuleTester({
        invalid: [
            {
                errors: [{messageId: 'uiApplicationImport'}],
                filename: '__virtual__/src/client/ui/Bad.tsx',
                name: 'ui import',
                settings: aliasSettings,
                sourceFilename: fixture('invalid-ui-import.ts')
            }
        ],
        ruleName: 'hexagonal-dependency-direction',
        valid: []
    }));

    it('reports server service import', () => cy.runRuleTester({
        invalid: [
            {
                errors: [{messageId: 'serverDirection'}],
                filename: '__virtual__/src/server/services/Thing.ts',
                name: 'server service import',
                settings: aliasSettings,
                sourceFilename: fixture('invalid-service-import.ts')
            }
        ],
        ruleName: 'hexagonal-dependency-direction',
        valid: []
    }));

    it('reports api import', () => cy.runRuleTester({
        invalid: [
            {
                errors: [{messageId: 'apiImport'}],
                filename: '__virtual__/src/pages/api/bad.ts',
                name: 'api import',
                settings: aliasSettings,
                sourceFilename: fixture('invalid-api-import.ts')
            }
        ],
        ruleName: 'hexagonal-dependency-direction',
        valid: []
    }));

    it('reports client api import', () => cy.runRuleTester({
        invalid: [
            {
                errors: [{messageId: 'clientApiImport'}],
                filename: '__virtual__/src/client/application/useCases/bad.ts',
                name: 'client api import',
                settings: aliasSettings,
                sourceFilename: fixture('invalid-client-api-import.ts')
            }
        ],
        ruleName: 'hexagonal-dependency-direction',
        valid: []
    }));

    it('reports client server config import', () => cy.runRuleTester({
        invalid: [
            {
                errors: [{messageId: 'crossBoundary'}],
                filename: '__virtual__/src/client/application/services/ClientService.ts',
                name: 'client server config import',
                settings: aliasSettings,
                sourceFilename: fixture('invalid-client-server-config-import.ts')
            }
        ],
        ruleName: 'hexagonal-dependency-direction',
        valid: []
    }));

    it('reports service missing class', () => cy.runRuleTester({
        invalid: [
            {
                errors: [{messageId: 'missingServiceClass'}],
                filename: '__virtual__/src/client/application/services/NoClass.ts',
                name: 'service no class',
                settings: aliasSettings,
                sourceFilename: fixture('invalid-service-no-class.ts')
            }
        ],
        ruleName: 'hexagonal-dependency-direction',
        valid: []
    }));

    it('reports service missing implements', () => cy.runRuleTester({
        invalid: [
            {
                errors: [{messageId: 'missingServiceImplements'}],
                filename: '__virtual__/src/client/application/services/NoImplements.ts',
                name: 'service no implements',
                settings: aliasSettings,
                sourceFilename: fixture('invalid-service-no-implements.ts')
            }
        ],
        ruleName: 'hexagonal-dependency-direction',
        valid: []
    }));

    it('accepts application configs UI import', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'hexagonal-dependency-direction',
        valid: [
            {
                filename: '__virtual__/src/client/application/configs/themeConfig.ts',
                name: 'application configs ui import',
                settings: aliasSettings,
                sourceFilename: fixture('valid-application-configs-ui-import.ts')
            }
        ]
    }));

    it('reports application service UI import', () => cy.runRuleTester({
        invalid: [
            {
                errors: [{messageId: 'crossBoundary'}],
                filename: '__virtual__/src/client/application/services/ThemeService.ts',
                name: 'application service ui import',
                settings: aliasSettings,
                sourceFilename: fixture('invalid-application-service-ui-import.ts')
            }
        ],
        ruleName: 'hexagonal-dependency-direction',
        valid: []
    }));

    it('no-ops when required aliases are missing', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'hexagonal-dependency-direction',
        valid: [
            {
                filename: '__virtual__/src/client/domain/Thing.ts',
                name: 'missing aliases skip',
                settings: aliasSettingsMissing,
                sourceFilename: fixture('invalid-domain-import.ts')
            }
        ]
    }));
});