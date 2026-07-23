// @ts-nocheck
const TableCell = styled('td', {shouldForwardProp: prop => !prop.startsWith('$')})`
    width: 100%;
`;
