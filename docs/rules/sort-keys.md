---
title: @nfq/sort-keys
rule_type: suggestion
related_rules:
- sort-imports
- sort-vars
---


When declaring multiple properties, some developers prefer to sort property names alphabetically to more easily find and/or diff necessary properties at a later time. Others feel that it adds complexity and becomes burden to maintain.

## Rule Details

This rule checks all property definitions of object expressions and verifies that all properties are sorted alphabetically. It does not check object patterns in destructuring assignments.

This rule is fixable.

This rule is based on ESLint `sort-keys` with the autofix behavior from `eslint-plugin-sort-keys-fix`.

Examples of **incorrect** code for this rule:

::: incorrect

```js
/*eslint @nfq/sort-keys: "error"*/

const obj1 = {a: 1, c: 3, b: 2};
const obj2 = {a: 1, "c": 3, b: 2};

// Case-sensitive by default.
const obj3 = {a: 1, b: 2, C: 3};

// Non-natural order by default.
const obj4 = {1: a, 2: c, 10: b};

// This rule checks computed properties only when the key can be resolved statically.
// Static keys include literals and template literals without expressions.
const S = Symbol("s")
const obj5 = {a: 1, ["c"]: 3, b: 2};
const obj6 = {a: 1, [`c`]: 3, b: 2};
```

:::

Examples of **correct** code for this rule:

::: correct

```js
/*eslint @nfq/sort-keys: "error"*/

const obj1 = {a: 1, b: 2, c: 3};
const obj2 = {a: 1, "b": 2, c: 3};

// Case-sensitive by default.
const obj3 = {C: 3, a: 1, b: 2};

// Non-natural order by default.
const obj4 = {1: a, 10: b, 2: c};

// This rule checks computed properties only when the key can be resolved statically.
const obj5 = {a: 1, ["b"]: 2, c: 3};
const obj6 = {a: 1, [`b`]: 2, c: 3};

// This rule ignores computed properties with non-static keys.
const obj7 = {a: 1, [b]: 2, c: 3};
const obj8 = {a: 1, [c + d]: 3, b: 2};
const obj9 = {a: 1, ["c" + "d"]: 3, b: 2};
const obj10 = {a: 1, [`${c}`]: 3, b: 2};
const obj11 = {a: 1, [tag`c`]: 3, b: 2};

// This rule does not report unsorted properties that are separated by a spread property.
const obj12 = {b: 1, ...c, a: 2};
```

:::

## Options

```json
{
    "@nfq/sort-keys": ["error", "asc", {"caseSensitive": true, "natural": false}]
}
```

The 1st option is `"asc"` or `"desc"`.

* `"asc"` (default) - enforce properties to be in ascending order.
* `"desc"` - enforce properties to be in descending order.

The 2nd option is an object which has the following properties.

* `caseSensitive` - if `false`, enforce properties to be in case-insensitive order. Default is `true`.
* `methodsExtra` - if `true`, group methods and non-methods separately when sorting. In ascending order, methods come after non-methods. In descending order, methods come before non-methods. Default is `false`.
* `ignorePropTypes` - if `true`, skip sorting inside object literals assigned to `propTypes` and `defaultProps`. Default is `false`.
* `natural` - if `true`, enforce properties to be in natural order. Default is `false`. Natural order compares strings containing combinations of letters and numbers in the way a human would sort, so the number 10 comes after the number 3.

Example for a list:

With `natural` as `true`, the ordering would be
1
3
6
8
10

With `natural` as `false`, the ordering would be
1
10
3
6
8

### desc

Examples of **incorrect** code for the `"desc"` option:

::: incorrect

```js
/*eslint @nfq/sort-keys: ["error", "desc"]*/

const obj1 = {b: 2, c: 3, a: 1};
const obj2 = {"b": 2, c: 3, a: 1};

// Case-sensitive by default.
const obj3 = {C: 1, b: 3, a: 2};

// Non-natural order by default.
const obj4 = {10: b, 2: c, 1: a};
```

:::

Examples of **correct** code for the `"desc"` option:

::: correct

```js
/*eslint @nfq/sort-keys: ["error", "desc"]*/

const obj1 = {c: 3, b: 2, a: 1};
const obj2 = {c: 3, "b": 2, a: 1};

// Case-sensitive by default.
const obj3 = {b: 3, a: 2, C: 1};

// Non-natural order by default.
const obj4 = {2: c, 10: b, 1: a};
```

:::

### caseSensitive

Examples of **incorrect** code for the `{caseSensitive: false}` option:

::: incorrect

```js
/*eslint @nfq/sort-keys: ["error", "asc", {caseSensitive: false}]*/

const obj1 = {a: 1, c: 3, C: 4, b: 2};
const obj2 = {a: 1, C: 3, c: 4, b: 2};
```

:::

Examples of **correct** code for the `{caseSensitive: false}` option:

::: correct

```js
/*eslint @nfq/sort-keys: ["error", "asc", {caseSensitive: false}]*/

const obj1 = {a: 1, b: 2, c: 3, C: 4};
const obj2 = {a: 1, b: 2, C: 3, c: 4};
```

:::

### natural

Examples of **incorrect** code for the `{natural: true}` option:

::: incorrect

```js
/*eslint @nfq/sort-keys: ["error", "asc", {natural: true}]*/

const obj = {1: a, 10: c, 2: b};
```

:::

Examples of **correct** code for the `{natural: true}` option:

::: correct

```js
/*eslint @nfq/sort-keys: ["error", "asc", {natural: true}]*/

const obj = {1: a, 2: b, 10: c};
```

:::


### methodsExtra

Examples of **incorrect** code for the `{methodsExtra: true}` option:

::: incorrect

```js
/*eslint @nfq/sort-keys: ["error", "asc", {methodsExtra: true}]*/

const obj = {
    a: 1,
    method() {},
    b: 2
};
```

:::

Examples of **correct** code for the `{methodsExtra: true}` option:

::: correct

```js
/*eslint @nfq/sort-keys: ["error", "asc", {methodsExtra: true}]*/

const obj = {
    a: 1,
    b: 2,
    method() {}
};
```

:::

### ignorePropTypes

Examples of **correct** code for the `{ignorePropTypes: true}` option:

::: correct

```js
/*eslint @nfq/sort-keys: ["error", "asc", {ignorePropTypes: true}]*/

const Foo = {
    propTypes: {
        b: 1,
        a: 2
    },
    defaultProps: {
        z: 1,
        y: 2
    }
};
```

:::

### settings['@nfq'].ignoredProperties

If `settings['@nfq'].ignoredProperties` is set, objects that contain only those keys are validated against that exact order. Objects that include other keys use the normal sorting rules.

Examples of **incorrect** code when `settings['@nfq'].ignoredProperties = ['xs', 'sm', 'md']`:

::: incorrect

```js
const sizes = {sm: 1, xs: 2, md: 3};
```

:::

Examples of **correct** code when `settings['@nfq'].ignoredProperties = ['xs', 'sm', 'md']`:

::: correct

```js
const sizes = {xs: 2, sm: 1, md: 3};
```

:::

## When Not To Use It

If you don't want to notify about properties' order, then it's safe to disable this rule.

## Compatibility

* **JSCS:** [validateOrderInObjectKeys](https://jscs-dev.github.io/rule/validateOrderInObjectKeys)

