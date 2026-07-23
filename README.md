<div id="top"></div>

# eslint-config-nfq

[![EsLint](https://github.com/nfqde/eslint-config-nfq/actions/workflows/eslint.yml/badge.svg)](https://github.com/nfqde/eslint-config-nfq/actions/workflows/eslint.yml)

---

- [eslint-config-nfq](#eslint-config-nfq)
  - [Description: ](#description-)
  - [Getting started](#getting-started)
    - [Installation](#installation)
    - [PeerDependencies](#peerdependencies)
  - [Usage](#usage)
  - [Custom rules](#custom-rules)
  - [Extending the config](#extending-the-config)
    - [Extend settings](#extend-settings)
    - [Extend globals](#extend-globals)
    - [Extend rules](#extend-rules)
  - [Support](#support)

---

## Description: [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This is the shared ESLint configuration used by .NFQ projects. It targets ESLint flat config, includes JavaScript, TypeScript, React, and Cypress overrides, and ships a small set of custom `@nfq/*` rules.

<p align="right">(<a href="#top">back to top</a>)</p>

---

## Getting started

### Installation

```sh
npm install -D @nfq/eslint-config
```

```sh
yarn add -D @nfq/eslint-config
```

```sh
pnpm add -D @nfq/eslint-config
```

### PeerDependencies

- eslint >= 9

<p align="right">(<a href="#top">back to top</a>)</p>

---

## Usage

Create `eslint.config.mjs` (flat config) and follow the structure used in this repo:

```js
import {defineConfig} from 'eslint/config';

import {NFQEslintConfig} from '@nfq/eslint-config';

export default defineConfig([
    {
        extends: [NFQEslintConfig],
        ignores: [
            'dist/**/*',
            'types/**/*'
        ]
    }
]);
```

This config provides:
- JS, TS, and Cypress overrides
- TypeScript parser and project discovery
- Shared plugins and settings
- Defaults for globals and common resolvers

<p align="right">(<a href="#top">back to top</a>)</p>

---

## Custom rules

All custom rules live under the `@nfq` namespace.

| Rule | Description |
| --- | --- |
| [@nfq/component-file-structure](docs/rules/component-file-structure.md) | Enforce React component file layout, displayName assignment, and named exports. |
| [@nfq/component-single-hook](docs/rules/component-single-hook.md) | Allow at most one hook call plus guard clauses and returns in component bodies. |
| [@nfq/cypress-mount-hook](docs/rules/cypress-mount-hook.md) | Enforce cy.mountHook(s) usage and required then chaining in Cypress tests. |
| [@nfq/hexagonal-dependency-direction](docs/rules/hexagonal-dependency-direction.md) | Enforce hexagonal dependency direction and boundary-specific imports. |
| [@nfq/no-empty-lines-in-objects](docs/rules/no-empty-lines-in-objects.md) | Disallow empty lines inside object literals. |
| [@nfq/no-empty-lines-in-types](docs/rules/no-empty-lines-in-types.md) | Disallow empty lines inside TypeScript interface and type literal bodies. |
| [@nfq/no-magic-numbers](docs/rules/no-magic-numbers.md) | Disallow magic numbers with configurable exceptions. |
| [@nfq/no-unbound-method](docs/rules/no-unbound-method.md) | Warn on unbound class methods used as callbacks and forbid constructor binding. |
| [@nfq/object-property-newline](docs/rules/object-property-newline.md) | Enforce object properties on separate lines, with configurable exceptions. |
| [@nfq/require-getcy](docs/rules/require-getcy.md) | Require cy.getCy instead of cy.get (except aliases). |
| [@nfq/sort-keys](docs/rules/sort-keys.md) | Require object keys to be sorted. |
| [@nfq/styled-components-order](docs/rules/styled-components-order.md) | Enforce styled component definition order and dependency order. |

<p align="right">(<a href="#top">back to top</a>)</p>

---

## Extending the config

You can extend settings, globals, and rules without redeclaring everything by importing the exported helpers.

### Extend settings

```js
import {NFQEslintConfig, settings} from '@nfq/eslint-config';

export default [
    ...NFQEslintConfig,
    {
        settings: {
            ...settings.settings,
            '@nfq': {
                ...settings.settings['@nfq'],
                ignoredProperties: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl']
            }
        }
    }
];
```

### Extend globals

```js
import {NFQEslintConfig, globals} from '@nfq/eslint-config';

export default [
    ...NFQEslintConfig,
    {
        languageOptions: {
            globals: {
                ...globals,
                MY_GLOBAL: 'readonly'
            }
        }
    }
];
```

### Extend rules

```js
import {NFQEslintConfig} from '@nfq/eslint-config';
import {nfq} from '@nfq/eslint-config/rules/common/plugins';

export default [
    ...NFQEslintConfig,
    {
        rules: {
            '@nfq/no-magic-numbers': [nfq['@nfq/no-magic-numbers'][0], {
                ...nfq['@nfq/no-magic-numbers'][1],
                ignoreFunctions: [...nfq['@nfq/no-magic-numbers'][1].ignoreFunctions, 'myFunction']
            }]
        }
    }
];
```

<p align="right">(<a href="#top">back to top</a>)</p>

---

## Support

Christoph Kruppe - [https://github.com/ckruppe] - c.kruppe@nfq.de

<p align="right">(<a href="#top">back to top</a>)</p>