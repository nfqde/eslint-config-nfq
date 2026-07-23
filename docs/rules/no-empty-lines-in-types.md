---
title: no-empty-lines-in-types
rule_type: layout
---


This rule disallows empty lines inside TypeScript interface bodies and type literals. It keeps type definitions compact and consistent.

## Rule Details

The rule reports blank lines between members, between a member and the closing brace, and around comments inside interfaces and type literals. It is fixable.

Examples of **incorrect** code for this rule:

::: incorrect

```ts
interface User {

    id: string;
}
```

:::

::: incorrect

```ts
type User = {
    id: string;

    name: string;
};
```

:::

Examples of **correct** code for this rule:

::: correct

```ts
interface User {
    id: string;
}
```

:::

::: correct

```ts
type User = {
    id: string;
    name: string;
};
```

:::

## Options

This rule has no options.

## When Not To Use It

If you prefer to allow visual spacing inside type bodies, you can disable this rule.