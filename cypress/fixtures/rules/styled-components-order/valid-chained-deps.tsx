// @ts-nocheck
const Component = () => (
    <Table>
        <TableHead>
            <TableRow>
                <TableCell>Data</TableCell>
                <ExpandableCell colSpan={2}>Details</ExpandableCell>
            </TableRow>
        </TableHead>
    </Table>
);

const Table = styled.table``;

const TableCell = styled.td``;

const ExpandableCell = styled(TableCell)`
    padding: 0;
`;

const TableRow = styled.tr`
    &:has(${ExpandableCell}) {
        cursor: auto;
    }
`;

const TableHead = styled.thead`
    & ${TableRow} {
        border-bottom: 1px solid red;
    }
`;
