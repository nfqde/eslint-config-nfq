// @ts-nocheck
const InfoPopup = ({children}: {children: React.ReactNode}) => (
    <Wrapper>
        <Info />
        <Popover>
            <PopoverContent>{children}</PopoverContent>
        </Popover>
    </Wrapper>
);

const Wrapper = styled.div``;

const Info = styled.div``;

const Popover = styled.div``;

const PopoverContent = styled.div``;
