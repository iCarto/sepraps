import {NumberUtil} from "utilities";
import {useFormattedValue} from "../hooks";
import {QuestionnaireFieldDownloadCSV} from "../presentational";

import {BorderedTableCell as TableCell} from "components/common/presentational";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";

const headCells = [
    {
        id: "month",
        label: "Mes",
        width: 10,
    },
    {
        id: "expected_value",
        label: "Absoluto",
        width: 12,
    },
    {
        id: "expected_value_perc",
        label: "%",
        width: 6,
    },
    {
        id: "expected_value_acc",
        label: "Absoluto",
        width: 12,
    },
    {
        id: "expected_value_acc_perc",
        label: "%",
        width: 6,
    },
    {
        id: "real_value",
        label: "Absoluto",
        width: 12,
    },
    {
        id: "real_value_perc",
        label: "%",
        width: 6,
    },
    {
        id: "real_value_acc",
        label: "Absoluto",
        width: 12,
    },
    {
        id: "real_value_acc_perc",
        label: "%",
        width: 6,
    },
    {
        id: "variation",
        label: "Absoluto",
        width: 12,
    },
    {
        id: "variation_acc",
        label: "%",
        width: 6,
    },
];

const QuestionnaireExpectedVsRealFieldTable = ({field, data, downloadPath}) => {
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
                                <TableCell align="center" colSpan={4}>
                                    Previsto
                                </TableCell>
                                <TableCell align="center" colSpan={4}>
                                    Real
                                </TableCell>
                                <TableCell align="center" colSpan={2}>
                                    Variación
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center" colSpan={2}>
                                    Mensual
                                </TableCell>
                                <TableCell align="center" colSpan={2}>
                                    Acumulada
                                </TableCell>
                                <TableCell align="center" colSpan={2}>
                                    Mensual
                                </TableCell>
                                <TableCell align="center" colSpan={2}>
                                    Acumulada
                                </TableCell>
                                <TableCell align="center" colSpan={2}>
                                    Acumulada
                                </TableCell>
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
                            {data["index"].map((indexLabel, index) => {
                                return (
                                    <TableRow hover key={index}>
                                        <TableCell>{indexLabel}</TableCell>
                                        <TableCell align="right">
                                            {formatValue(
                                                data["expected_values"][index],
                                                field.datatype
                                            )}
                                        </TableCell>
                                        <TableCell align="right">
                                            {NumberUtil.formatDecimal(
                                                data["expected_values_perc"][index]
                                            )}
                                        </TableCell>
                                        <TableCell align="right">
                                            {formatValue(
                                                data["expected_values_acc"][index],
                                                field.datatype
                                            )}
                                        </TableCell>
                                        <TableCell align="right">
                                            {NumberUtil.formatDecimal(
                                                data["expected_values_acc_perc"][index]
                                            )}
                                        </TableCell>
                                        <TableCell align="right">
                                            {formatValue(
                                                data["real_values"][index],
                                                field.datatype
                                            )}
                                        </TableCell>
                                        <TableCell align="right">
                                            {NumberUtil.formatDecimal(
                                                data["real_values_perc"][index]
                                            )}
                                        </TableCell>
                                        <TableCell align="right">
                                            {formatValue(
                                                data["real_values_acc"][index],
                                                field.datatype
                                            )}
                                        </TableCell>
                                        <TableCell align="right">
                                            {NumberUtil.formatDecimal(
                                                data["real_values_acc_perc"][index]
                                            )}
                                        </TableCell>
                                        <TableCell align="right">
                                            {formatValue(
                                                data["variation"][index],
                                                field.datatype
                                            )}
                                        </TableCell>
                                        <TableCell align="right">
                                            {NumberUtil.formatDecimal(
                                                data["variation_perc"][index]
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

export default QuestionnaireExpectedVsRealFieldTable;
