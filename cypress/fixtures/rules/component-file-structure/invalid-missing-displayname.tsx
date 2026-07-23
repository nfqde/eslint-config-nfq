// @ts-nocheck
import React from 'react';
import styled from '@emotion/styled';

interface ComponentProps {
    testId?: string;
}

const Widget = ({testId = 'Widget'}: ComponentProps) => <Wrapper data-cy={testId} />;

export {Widget};

const Wrapper = styled.div``;
