import TableCell from "@mui/material/TableCell";

function TableCustomCell({id, TableCellProps, children}) {
    return (
        <TableCell key={id} {...TableCellProps}>
            {children}
        </TableCell>
    );
}

export default TableCustomCell;
