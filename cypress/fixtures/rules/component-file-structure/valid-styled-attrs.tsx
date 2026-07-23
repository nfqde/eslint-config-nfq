import React from 'react';
import styled from 'styled-components';

interface ComponentProps {
    opacity?: number;
}

const CompareAssets = ({opacity}: ComponentProps) => (
    <Wrapper $opacity={opacity} />
);

CompareAssets.displayName = 'CompareAssets';

export {CompareAssets};

interface WrapperProps {
    $opacity?: number;
}

const Wrapper = styled.div.attrs<WrapperProps>(({$opacity}) => ({
    style: {
        opacity: $opacity ?? 1
    }
}))<WrapperProps>`
    height: 100%;
`;
