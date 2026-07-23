// @ts-nocheck
import React from 'react';
import styled from '@emotion/styled';

const Widget = ({testId = 'Widget'}: ComponentProps) => <Wrapper data-cy={testId} />;

interface ComponentProps {
    testId?: string;
}

Widget.displayName = 'Widget';

export {Widget};

const Wrapper = styled.div``;
