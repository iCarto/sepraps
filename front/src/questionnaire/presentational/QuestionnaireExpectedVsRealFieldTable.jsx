import {NumberUtil} from "base/format/utilities";
import {useQuestionnaireColors, useFormattedValue} from "../hooks";

import {QuestionnaireFieldDownloadCSV} from ".";
import {BorderedTableCell as TableCell} from "base/table/components";
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
        style: "",
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
    const {getCellStyle, COLORS} = useQuestionnaireColors();

    const formatValue = useFormattedValue();
    const realCellStyle = getCellStyle(COLORS.REAL);
    const expectedCellStyle = getCellStyle(COLORS.EXPECTED);

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
                                <TableCell
                                    align="center"
                                    colSpan={4}
                                    sx={expectedCellStyle}
                                >
                                    Previsto
                                </TableCell>
                                <TableCell
                                    align="center"
                                    colSpan={4}
                                    sx={realCellStyle}
                                >
                                    Real
                                </TableCell>
                                <TableCell align="center" colSpan={2}>
                                    Variación
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    align="center"
                                    colSpan={2}
                                    sx={expectedCellStyle}
                                >
                                    Mensual
                                </TableCell>
                                <TableCell
                                    align="center"
                                    colSpan={2}
                                    sx={expectedCellStyle}
                                >
                                    Acumulada
                                </TableCell>
                                <TableCell
                                    align="center"
                                    colSpan={2}
                                    sx={realCellStyle}
                                >
                                    Mensual
                                </TableCell>
                                <TableCell
                                    align="center"
                                    colSpan={2}
                                    sx={realCellStyle}
                                >
                                    Acumulada
                                </TableCell>
                                <TableCell align="center" colSpan={2}>
                                    Acumulada
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                {headCells.map(headCell => (
                                    <TableCell
                                        key={headCell.id}
                                        align="center"
                                        sx={() => {
                                            let style = null;
                                            if (
                                                headCell.id.startsWith(COLORS.EXPECTED)
                                            ) {
                                                style = COLORS.EXPECTED;
                                            }
                                            if (headCell.id.startsWith(COLORS.REAL)) {
                                                style = COLORS.REAL;
                                            }
                                            return getCellStyle(style);
                                        }}
                                    >
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
                                        <TableCell align="right" sx={expectedCellStyle}>
                                            {formatValue(
                                                data["expected_values"][index],
                                                field.datatype
                                            )}
                                        </TableCell>
                                        <TableCell align="right" sx={expectedCellStyle}>
                                            {NumberUtil.formatDecimal(
                                                data["expected_values_perc"][index]
                                            )}
                                        </TableCell>
                                        <TableCell align="right" sx={expectedCellStyle}>
                                            {formatValue(
                                                data["expected_values_acc"][index],
                                                field.datatype
                                            )}
                                        </TableCell>
                                        <TableCell align="right" sx={expectedCellStyle}>
                                            {NumberUtil.formatDecimal(
                                                data["expected_values_acc_perc"][index]
                                            )}
                                        </TableCell>
                                        <TableCell align="right" sx={realCellStyle}>
                                            {formatValue(
                                                data["real_values"][index],
                                                field.datatype
                                            )}
                                        </TableCell>
                                        <TableCell align="right" sx={realCellStyle}>
                                            {NumberUtil.formatDecimal(
                                                data["real_values_perc"][index]
                                            )}
                                        </TableCell>
                                        <TableCell align="right" sx={realCellStyle}>
                                            {formatValue(
                                                data["real_values_acc"][index],
                                                field.datatype
                                            )}
                                        </TableCell>
                                        <TableCell align="right" sx={realCellStyle}>
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
