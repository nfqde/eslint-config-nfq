// @ts-nocheck
import styled from '@emotion/styled';

import {getPLineHeight, getPSize} from './utils';

import type {FontSize} from './utils';

export interface H1Props {
    $isLight?: boolean;
}

export const H1 = styled.h1<H1Props>`
    color: ${({$isLight, theme}) => ($isLight ? theme.colors.textPrimaryInv : null)};
    font-family: ${({theme}) => theme.fonts.OnAir};
    font-size: 6rem;
    font-weight: normal;
    line-height: 8.4rem;
    margin: 0;
    padding: 0;
`;

export interface H2Props {
    $isLight?: boolean;
}

export const H2 = styled.h2<H2Props>`
    color: ${({$isLight, theme}) => ($isLight ? theme.colors.textPrimaryInv : null)};
    font-family: ${({theme}) => theme.fonts.OnAir};
    font-size: 4rem;
    font-weight: normal;
    line-height: 5.6rem;
    margin: 0;
    padding: 0;
`;

export interface H3Props {
    $isLight?: boolean;
}

export const H3 = styled.h3<H3Props>`
    color: ${({$isLight, theme}) => ($isLight ? theme.colors.textPrimaryInv : null)};
    font-family: ${({theme}) => theme.fonts.OnAir};
    font-size: 2.8rem;
    font-weight: normal;
    line-height: 3.9rem;
    margin: 0;
    padding: 0;
`;

export interface PProps {
    $align?: 'center' | 'left' | 'right';
    $isLight?: boolean;
    $size?: FontSize;
}

export const P = styled.p<PProps>`
    color: ${({$isLight, theme}) => ($isLight ? theme.colors.textPrimaryInv : null)};
    font-family: ${({theme}) => theme.fonts.OnAir};
    font-size: ${getPSize};
    line-height: ${getPLineHeight};
    margin: 0;
    padding: 0;
    text-align: ${({$align}) => $align ?? 'inherit' as const};
`;

export interface LabelProps {
    $align?: 'center' | 'left' | 'right';
    $isLight?: boolean;
    $size?: FontSize;
}

export const Label = styled.label<LabelProps>`
    color: ${({$isLight, theme}) => ($isLight ? theme.colors.textPrimaryInv : null)};
    font-family: ${({theme}) => theme.fonts.OnAir};
    font-size: ${getPSize};
    line-height: ${getPLineHeight};
    margin: 0;
    padding: 0;
    text-align: ${({$align}) => $align ?? 'inherit' as const};
`;

export interface ToplineProps {
    spacing?: number;
}

export const Topline = styled(P)<ToplineProps>`
    color: ${({theme}) => theme.colors.textSecondary};
    letter-spacing: ${({spacing = 0.2}) => `${spacing}rem`};
    text-transform: uppercase;
`;
