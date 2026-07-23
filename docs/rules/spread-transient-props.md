---
title: @nfq/spread-transient-props
rule_type: problem
---

Requires spreading the shared `transient` options object into an object literal when it is passed as the second argument to emotion's `styled()` function.

The SWC emotion plugin (used via `compiler.emotion` in Next.js) can only inject the component `target` — which is required for component selectors like `${Component} { ... }` — when the options argument is an object literal at the call site. When the bare `transient` identifier is passed, the transform is skipped and using the component as a selector throws at runtime:

> Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.

This rule is autofixable.

## Rule Details

Examples of **incorrect** code for this rule:

::: incorrect

```ts
const TableRow = styled('tr', transient)`
    height: 100%;
`;
```

:::

Examples of **correct** code for this rule:

::: correct

```ts
const TableRow = styled('tr', {...transient})`
    height: 100%;
`;
```

```ts
const TableCell = styled('td', {shouldForwardProp: prop => !prop.startsWith('$')})`
    width: 100%;
`;
```

:::
