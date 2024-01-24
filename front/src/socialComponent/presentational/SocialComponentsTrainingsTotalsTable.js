import {TABLE_ROW_STYLE} from "base/table/components";
import {useTrainingTotalsTable} from "socialComponent/data";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Tooltip from "@mui/material/Tooltip";

const SocialComponentsTrainingsTotalsTable = ({trainingData, small = false}) => {
    const {tableColumns} = useTrainingTotalsTable();

    return (
        <TableContainer sx={{overflowX: "auto"}}>
            <Table
                aria-labelledby="Data table"
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
                    {trainingData?.id?.map((row, rowIndex) => (
                        <TableRow key={rowIndex} hover sx={TABLE_ROW_STYLE}>
                            {tableColumns.map((headCell, cellIndex) => (
                                <TableCell key={cellIndex} align="center">
                                    {headCell.formatFunction
                                        ? headCell.formatFunction(
                                              trainingData[headCell.id][rowIndex]
                                          )
                                        : trainingData[headCell.id][rowIndex]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SocialComponentsTrainingsTotalsTable;
