---
title: @nfq/styled-components-order
rule_type: suggestion
---

Styled components should be defined in the same order that they are rendered in JSX. This helps keep component definitions aligned with render flow. The rule only compares styled components that are used in JSX in the same file.

If a styled component is referenced inside another styled component's template literal, the referenced component must be defined before the one that uses it. This dependency order is enforced even when it contradicts render order.

## Rule Details

Examples of **incorrect** code for this rule:

::: incorrect

```tsx
const InfoPopup = ({children}: {children: React.ReactNode}) => (
    <Wrapper>
        <Info />
        <Popover>
            <PopoverContent>{children}</PopoverContent>
        </Popover>
    </Wrapper>
);

const PopoverContent = styled.div``;

const Wrapper = styled.div``;

const Popover = styled.div``;

const Info = styled.div``;
```

```tsx
const Wrapper = styled.div`
    &:hover ${Popover} {
        color: red;
    }
`;

const Popover = styled.div``;
```

:::

Examples of **correct** code for this rule:

::: correct

```tsx
const InfoPopup = ({children}: {children: React.ReactNode}) => (
    <Wrapper>
        <Info />
        <Popover>
            <PopoverContent>{children}</PopoverContent>
        </Popover>
    </Wrapper>
);

const Wrapper = styled.div``;

const Info = styled.div``;

const Popover = styled.div``;

const PopoverContent = styled.div``;
```

```tsx
const Popover = styled.div``;

const Wrapper = styled.div`
    &:hover ${Popover} {
        color: red;
    }
`;
```

:::
