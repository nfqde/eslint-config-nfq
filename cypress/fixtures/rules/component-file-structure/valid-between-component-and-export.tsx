import React from 'react';
import styled from '@emotion/styled';

interface WidgetProps {
    label: string;
}

const Widget = ({label}: WidgetProps) => (
    <Wrapper>{label}</Wrapper>
);

const INTERMEDIATE_VALUE = 'ok';
const helper = () => INTERMEDIATE_VALUE;

Widget.displayName = 'Widget';

export {Widget};

const Wrapper = styled.div``;
