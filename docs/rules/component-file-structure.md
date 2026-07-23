---
title: @nfq/component-file-structure
rule_type: suggestion
---

Enforces a consistent React component file layout. The rule checks the order of top-level blocks and requires a `displayName` assignment and a named export for the component.

## Rule Details

Expected block order (if present):
1. Imports
2. Optional file-level declarations (constants, helper functions)
3. Props typing used for the component parameter
4. Component implementation
5. `displayName`
6. Named export
7. Styled components and local helper types

Examples of **incorrect** code for this rule:

::: incorrect

```tsx
import React from 'react';
import styled from '@emotion/styled';

const Button = ({testId}: ComponentProps) => <Wrapper data-cy={testId} />;

interface ComponentProps {
    testId?: string;
}

Button.displayName = 'Button';

export {Button};

const Wrapper = styled.div``;
```

```tsx
import React from 'react';

interface ComponentProps {
    testId?: string;
}

const Button = ({testId}: ComponentProps) => <div data-cy={testId} />;

export {Button};
```

:::

Examples of **correct** code for this rule:

::: correct

```tsx
import React from 'react';
import styled from '@emotion/styled';

const DEFAULT_TEST_ID = 'Button';

interface ComponentProps {
    testId?: string;
}

const Button = ({testId = DEFAULT_TEST_ID}: ComponentProps) => (
    <Wrapper data-cy={testId} />
);

Button.displayName = 'Button';

export {Button};

const Wrapper = styled.div``;
```

:::
