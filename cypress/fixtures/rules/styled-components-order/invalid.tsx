// @ts-nocheck
const InfoPopup = ({children}: {children: React.ReactNode}) => (
    <Wrapper>
        <Info />
        <Popover>
            <PopoverContent>{children}</PopoverContent>
        </Popover>
    </Wrapper>
);

const PopoverContent = styled.div``;

const Wrapper = styled.div``;

const Popover = styled.div``;

const Info = styled.div``;
