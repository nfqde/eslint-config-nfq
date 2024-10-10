<div id="top"></div>

# eslint-config-nfq

[![EsLint](https://github.com/nfqde/eslint-config-nfq/actions/workflows/eslint.yml/badge.svg)](https://github.com/nfqde/eslint-config-nfq/actions/workflows/eslint.yml)

---

1. [Description](#description)
2. [Getting started](#getting-started)
    1. [Installation](#installation)
    2. [PeerDependencies](#peerdependencies)
3. [Usage](#usage)
4. [Props](#props)
5. [Support](#support)

---

## Description: [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This is a comprehensive ESLint configuration used by .NFQ. It includes a wide range of rules for JavaScript, TypeScript, React, and more.

<p align="right">(<a href="#top">back to top</a>)</p>

---

## Getting started

To setup the project locally follow the next steps:

### Installation

To install the package run
```sh
npm install <Project name>
```
if you are on yarn
```sh
yarn add <Project name>
```
or on pnpm
```sh
pnpm install <Project name>
```
   
### PeerDependencies:

The following PeerDependencies are needed so the component does work:

- @nfq/eslint-plugin >= 0.8.0
- @stylistic/eslint-plugin-ts >= 2
- @typescript-eslint/eslint-plugin >= 6
- @typescript-eslint/parser >= 6
- eslint-import-resolver-alias >= 1
- eslint-plugin-array-func >= 3
- eslint-plugin-better-styled-components >= 1
- eslint-plugin-import >= 2
- eslint-plugin-jsdoc >= 43
- eslint-plugin-jsx-a11y >= 6
- eslint-plugin-no-unsanitized >= 4
- eslint-plugin-node >= 11
- eslint-plugin-perf-standard >= 1
- eslint-plugin-promise >= 6
- eslint-plugin-react >= 7
- eslint-plugin-react-hooks >= 4
- eslint-plugin-react-hooks-ssr >= 0.1.5
- eslint-plugin-redos >= 4
- eslint-plugin-security >= 1
- eslint-plugin-sort-destructure-keys >= 1

<p align="right">(<a href="#top">back to top</a>)</p>

---

## Usage

After installing the package and its peer dependencies, you can use it in your ESLint configuration file:

```json
{
  "extends": [
    "@nfq"
  ]
}
```

<p align="right">(<a href="#top">back to top</a>)</p>

---

## Rules

This configuration includes a wide range of rules for JavaScript, TypeScript, React, and more. You can find the specific rules in the rules directory.

<p align="right">(<a href="#top">back to top</a>)</p>

---

## Support

Christoph Kruppe - [https://github.com/ckruppe] - c.kruppe@nfq.de  

<p align="right">(<a href="#top">back to top</a>)</p>