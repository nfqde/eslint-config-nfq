---
title: no-empty-lines-in-objects
rule_type: layout
---


This rule disallows empty lines inside object literals. It helps keep object formatting compact and reduces visual gaps between related properties.

## Rule Details

The rule reports blank lines between properties, between a property and the closing brace, and around comments inside object literals. It is fixable.

Examples of **incorrect** code for this rule:

::: incorrect

```js
const obj = {
    a: 1,

    b: 2
};
```

:::

::: incorrect

```js
const obj = {
    a: 1,
    // note

    b: 2
};
```

:::

Examples of **correct** code for this rule:

::: correct

```js
const obj = {
    a: 1,
    b: 2
};
```

:::

::: correct

```js
const obj = {
    a: 1,
    // note
    b: 2
};
```

:::

## Options

This rule has no options.

## When Not To Use It

If you prefer to allow visual spacing inside object literals, you can disable this rule.