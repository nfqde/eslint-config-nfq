// @ts-nocheck
const InfoPopup = ({children}: {children: React.ReactNode}) => (
    <Wrapper>
        <Info />
        <Popover>
            <PopoverContent>{children}</PopoverContent>
        </Popover>
    </Wrapper>
);

const Popover = styled.div``;

const Wrapper = styled.div`
    &:hover ${Popover} {
        color: red;
    }
`;

const Info = styled.div``;

const PopoverContent = styled.div``;
