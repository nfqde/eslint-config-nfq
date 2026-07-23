// @ts-nocheck
import React from 'react';
import styled from '@emotion/styled';

const DEFAULT_TEST_ID = 'Widget';

interface ComponentProps {
    testId?: string;
}

const Widget = ({testId = DEFAULT_TEST_ID}: ComponentProps) => {
    if (!testId) {
        return null;
    }

    return <Wrapper data-cy={testId} />;
};

Widget.displayName = 'Widget';

export {Widget};

interface WrapperProps {
    $active?: boolean;
}

const Wrapper = styled.div<WrapperProps>``;
