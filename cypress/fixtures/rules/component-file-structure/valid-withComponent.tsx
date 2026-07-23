// @ts-nocheck
import NextLink from 'next/link';
import {motion} from 'framer-motion';
import styled from 'styled-components';

interface ButtonProps {
    disabled?: boolean;
}

const Button = ({disabled}: ButtonProps) => <button disabled={disabled}>Click</button>;

Button.displayName = 'Button';

export {Button};

const ButtonWrapper = styled.button`
    display: inline-flex;
`;

const Link = ButtonWrapper.withComponent(motion.create(NextLink));
