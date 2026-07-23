---
title: @nfq/no-unbound-method
rule_type: problem
related_rules:
- @typescript-eslint/unbound-method
---

Passing an unbound class method that uses `this` often loses the correct `this` value. This rule warns when such a method is passed as a callback and suggests using a decorator like `@autobind`. It also forbids binding in the constructor.

This rule requires type information and only runs correctly for TypeScript projects configured with `parserOptions.project`.

## Rule Details

Examples of **incorrect** code for this rule:

::: incorrect

```ts
class Test {
    value = 0;

    method() {
        return this.value;
    }

    constructor() {
        this.method = this.method.bind(this);
    }

    register(handler: () => number) {
        handler();
    }

    setup() {
        this.register(this.method);
    }
}
```

```ts
class Test {
    value = 0;

    method() {
        return this.value;
    }

    setup() {
        const handler = this.method;
        return handler;
    }
}
```

```tsx
class Test {
    value = 0;

    method() {
        return this.value;
    }

    render() {
        return <Button onClick={this.method} />;
    }
}
```

:::

Examples of **correct** code for this rule:

::: correct

```ts
class Test {
    value = 0;

    @autobind
    method() {
        return this.value;
    }

    register(handler: () => number) {
        handler();
    }

    setup() {
        this.register(this.method);
    }
}
```

```ts
class Test {
    value = 0;

    method() {
        return this.value;
    }

    register(handler: () => number) {
        handler();
    }

    setup() {
        this.register(this.method.bind(this));
    }
}
```

```tsx
class Test {
    value = 0;

    method() {
        return this.value;
    }

    render() {
        return <Button onClick={() => this.method()} />;
    }
}
```

```ts
import {makeAutoObservable} from 'mobx';

class Test {
    value = 0;

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true});
    }

    method() {
        return this.value;
    }

    register(handler: () => number) {
        handler();
    }

    setup() {
        this.register(this.method);
    }
}
```

:::

## Options

```json
{
    "@nfq/no-unbound-method": ["error", {"decoratorNames": ["autobind"]}]
}
```

- `decoratorNames`: Array of decorator names that satisfy the rule. Default is `["autobind"]`.

## When Not To Use It

If you never pass class methods as callbacks or you already enforce another binding strategy, you can disable this rule.
