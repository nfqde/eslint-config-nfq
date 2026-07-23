---
title: @nfq/hexagonal-dependency-direction
rule_type: problem
---

Enforces a hexagonal dependency direction inside the project boundary and validates boundary-specific import rules.

## Rule Details

Client direction: `domain → application → ui`
Server direction: `domain → errors → services → controllers`

### Client rules
- `client/domain` may only import from `client/domain` and `client/shared`.
- `client/application` may import from `client/domain`, `client/shared`, and `client/application`.
- `client/ui` may only import from `client/application/useCases`, `client/application/configs`, and `client/application/utils`, plus `client/shared` and `client/ui`.
- `client/application/services` classes must implement an adapter interface unless the file uses `makeAutoObservable`.

### Server rules
- `server/domain` may not import from other server layers, except `server/configs`.
- `server/errors` may import from `server/domain`, `server/errors`, and `server/configs`.
- `server/services` may import from `server/domain`, `server/errors`, `server/services`, `server/utils`, and `server/configs`.
- `server/controllers` may import from `server/domain`, `server/errors`, `server/services`, `server/utils`, `server/middleware`, and `server/configs`.

### API routes
- `pages/api` may only import from `server/controllers`, `server/utils`, or `server/middleware`.
- `pages/api` may be imported only by `client/application/services`.

## Settings

This rule reads aliases from `import/resolver.alias.map`. It runs only when the following aliases are defined:

`Domain`, `Application`, `UI`, `ApiRoutes`, `Controllers`, `ServerDomain`, `Services`.
