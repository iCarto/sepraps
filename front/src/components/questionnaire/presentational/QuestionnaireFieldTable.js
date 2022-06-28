import {useFormattedValue} from "../hooks";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import {BorderedTableCell as TableCell} from "components/common/presentational";
import {QuestionnaireFieldDownloadCSV} from "../presentational";

const headCells = [
    {
        id: "month",
        label: "Mes",
        width: 10,
    },
    {
        id: "real_value",
        label: "Absoluto",
        width: 12,
    },
    {
        id: "real_value_acc",
        label: "Absoluto",
        width: 12,
    },
];

const QuestionnaireFieldTable = ({field, data, downloadPath}) => {
    const formatValue = useFormattedValue();

    return (
        <Grid container spacing={1}>
            <Grid item>
                <TableContainer sx={{overflowX: "auto"}}>
                    <Table aria-labelledby="Table" sx={{tableLayout: "fixed"}}>
                        <colgroup>
                            {headCells.map(headCell => (
                                <col key={headCell.id} width={headCell.width + "%"} />
                            ))}
                        </colgroup>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" rowSpan={2}></TableCell>
                                <TableCell align="center" colSpan={2}>
                                    Real
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center">Mensual</TableCell>
                                <TableCell align="center">Acumulada</TableCell>
                            </TableRow>
                            <TableRow>
                                {headCells.map(headCell => (
                                    <TableCell key={headCell.id} align="center">
                                        {headCell.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data["year_month"].map((indexLabel, index) => {
                                return (
                                    <TableRow hover key={index}>
                                        <TableCell>{indexLabel}</TableCell>
                                        <TableCell align="right">
                                            {formatValue(
                                                data["real_values"][index],
                                                field.datatype
                                            )}
                                        </TableCell>
                                        <TableCell align="right">
                                            {formatValue(
                                                data["real_values_acc"][index],
                                                field.datatype
                                            )}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item container justifyContent="flex-end" alignItems="center">
                <QuestionnaireFieldDownloadCSV path={downloadPath} />
            </Grid>
        </Grid>
    );
};

export default QuestionnaireFieldTable;
