import React, {type ReactElement} from 'react';
import styled from 'styled-components';

type SegmentedProps = {
    value: string;
};

interface ComponentProps {
    children: ReactElement<SegmentedProps> | ReactElement<SegmentedProps>[];
}

const SegmentedControl = ({children}: ComponentProps) => (
    <Wrapper>{children}</Wrapper>
);

SegmentedControl.displayName = 'SegmentedControl';

export {SegmentedControl};

const Wrapper = styled.div`
    display: flex;
`;
