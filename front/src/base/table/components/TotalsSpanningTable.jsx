import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Tooltip from "@mui/material/Tooltip";

const TotalsSpanningTable = ({dataRows, tableColumns, total, totalTooltip = ""}) => {
    return (
        <TableContainer sx={{overflowX: "auto"}}>
            <Table
                aria-labelledby="Data table"
                sx={{tableLayout: "fixed"}}
                size="small"
            >
                <colgroup>
                    {tableColumns?.map((headCell, index) => (
                        <col key={index} width={headCell.width + "%"} />
                    ))}
                </colgroup>
                <TableHead>
                    <TableRow>
                        {tableColumns?.map((headCell, headCellIndex) => {
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
                                        }}
                                        align={
                                            headCellIndex === 0
                                                ? "left"
                                                : headCellIndex ===
                                                  tableColumns.length - 1
                                                ? "right"
                                                : "center"
                                        }
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
                            <TableRow hover key={rowIndex}>
                                {tableColumns.map((headCell, cellIndex) => {
                                    return (
                                        <TableCell
                                            key={cellIndex}
                                            align={
                                                cellIndex === 0
                                                    ? "left"
                                                    : cellIndex ===
                                                      tableColumns.length - 1
                                                    ? "right"
                                                    : "center"
                                            }
                                        >
                                            {headCell.formatFunction
                                                ? headCell.formatFunction(row)
                                                : row[headCell.id]}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        );
                    })}
                    <TableCell
                        colSpan={3}
                        align="right"
                        sx={{backgroundColor: "grey.100", fontWeight: 600}}
                    >
                        Total
                    </TableCell>
                    <Tooltip title={totalTooltip}>
                        <TableCell
                            sx={{
                                display: "flex",
                                direction: "row",
                                justifyContent: "flex-end",
                                alignItems: "center",
                                backgroundColor: "grey.100",
                                fontWeight: 600,
                                color: totalTooltip ? "error.dark" : "inherit",
                            }}
                        >
                            {total}
                        </TableCell>
                    </Tooltip>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TotalsSpanningTable;
