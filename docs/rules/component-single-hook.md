---
title: @nfq/component-single-hook
rule_type: suggestion
---

Enforces a minimal component body structure: at most one hook call, optional guard clauses, and return statements. This keeps components focused and encourages moving logic into custom hooks.

## Rule Details

If a component contains a return statement, only the following statements are allowed in its body:
- a single hook call
- guard clauses (`if (...) return ...`)
- return statements

Wrapper calls like `observer`, `memo`, or `forwardRef` are allowed around component definitions.

Examples of **incorrect** code for this rule:

::: incorrect

```tsx
const Widget = () => {
    const data = useData();
    const count = 1;

    return <div />;
};
```

```tsx
const Widget = () => {
    const data = useData();
    const extra = useExtra();

    return <div />;
};
```

:::

Examples of **correct** code for this rule:

::: correct

```tsx
const Widget = () => {
    const data = useData();

    if (!data) {
        return null;
    }

    return data ? <div /> : null;
};
```

```tsx
const Widget = observer(() => {
    const store = useStore();

    return <div />;
});
```

:::
