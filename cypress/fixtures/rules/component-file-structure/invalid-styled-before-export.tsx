// @ts-nocheck
import React from 'react';
import styled from '@emotion/styled';

interface ComponentProps {
    testId?: string;
}

const Widget = ({testId = 'Widget'}: ComponentProps) => <Wrapper data-cy={testId} />;

Widget.displayName = 'Widget';

const Wrapper = styled.div``;

export {Widget};
