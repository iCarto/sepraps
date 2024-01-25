import {TABLE_ROW_STYLE} from "base/table/components";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Tooltip from "@mui/material/Tooltip";

const TotalsTable = ({dataRows, tableColumns, small = false}) => {
    console.log(dataRows, tableColumns);
    return (
        <TableContainer sx={{overflowX: "auto"}}>
            <Table
                aria-labelledby="Totals table"
                sx={{tableLayout: "fixed"}}
                size={small ? "small" : "medium"}
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
                                        sx={{paddingRight: 1, textAlign: "center"}}
                                    >
                                        {headCell.label}
                                    </TableCell>
                                </Tooltip>
                            );
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataRows?.id?.map((row, rowIndex) => (
                        <TableRow key={rowIndex} hover sx={TABLE_ROW_STYLE}>
                            {tableColumns.map((headCell, cellIndex) => {
                                return (
                                    <TableCell key={cellIndex} align="center">
                                        {headCell.formatFunction
                                            ? headCell.formatFunction(
                                                  dataRows[headCell.id][rowIndex]
                                              )
                                            : dataRows[headCell.id][rowIndex]}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TotalsTable;
