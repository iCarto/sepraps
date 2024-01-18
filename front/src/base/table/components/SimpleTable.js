import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Tooltip from "@mui/material/Tooltip";

export const TABLE_ROW_STYLE = {
    "&:last-child td, &:last-child th": {
        borderTop: "solid 1px #c0c4c2",
        fontWeight: "bold",
        backgroundColor: "grey.50",
    },
};

const SimpleTable = ({dataRows, tableColumns}) => {
    return (
        <TableContainer sx={{overflowX: "auto"}}>
            <Table
                aria-labelledby="Data table"
                sx={{tableLayout: "fixed"}}
                size="small"
            >
                <colgroup>
                    {tableColumns.map((headCell, index) => (
                        <col key={index} width={headCell.width + "%"} />
                    ))}
                </colgroup>
                <TableHead>
                    <TableRow>
                        {tableColumns.map(headCell => {
                            return (
                                <Tooltip
                                    key={headCell.id}
                                    title={headCell.title || ""}
                                    disableHoverListener={!headCell.title}
                                >
                                    <TableCell
                                        key={headCell.id}
                                        sx={{
                                            color: "grey.600",
                                            paddingRight: 1,
                                            textAlign: "center",
                                        }}
                                    >
                                        {headCell.label}
                                    </TableCell>
                                </Tooltip>
                            );
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataRows?.map((row, rowIndex) => {
                        return (
                            <TableRow key={rowIndex} sx={TABLE_ROW_STYLE}>
                                {tableColumns.map((headCell, cellIndex) => {
                                    return (
                                        <TableCell key={cellIndex} align="center">
                                            {headCell.formatFunction
                                                ? headCell.formatFunction(row)
                                                : row[headCell.id]}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SimpleTable;
