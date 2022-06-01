import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {NumberUtil} from "utilities";

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

const QuestionnaireExpectedVsRealFieldTable = ({fieldLabel, data}) => {
    const tableRowStyle = {
        "&:last-child td, &:last-child th": {
            border: 0,
        },
        paddingRight: "12px",
    };

    return (
        <TableContainer sx={{overflowX: "auto"}}>
            <Table aria-labelledby="Projects table" sx={{tableLayout: "fixed"}}>
                <colgroup>
                    {headCells.map(headCell => (
                        <col key={headCell.id} width={headCell.width + "%"} />
                    ))}
                </colgroup>
                <TableHead>
                    <TableRow>
                        <TableCell align="center"></TableCell>
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
                        <TableCell align="center"></TableCell>
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
                            <TableRow hover key={index} sx={tableRowStyle}>
                                <TableCell>{indexLabel}</TableCell>
                                <TableCell align="right">
                                    {data["expected_values"][index]}
                                </TableCell>
                                <TableCell align="right">
                                    {NumberUtil.formatDecimal(
                                        data["expected_values_perc"][index]
                                    )}
                                </TableCell>
                                <TableCell align="right">
                                    {data["expected_values_acc"][index]}
                                </TableCell>
                                <TableCell align="right">
                                    {NumberUtil.formatDecimal(
                                        data["expected_values_acc_perc"][index]
                                    )}
                                </TableCell>
                                <TableCell align="right">
                                    {data["real_values"][index]}
                                </TableCell>
                                <TableCell align="right">
                                    {NumberUtil.formatDecimal(
                                        data["real_values_perc"][index]
                                    )}
                                </TableCell>
                                <TableCell align="right">
                                    {data["real_values_acc"][index]}
                                </TableCell>
                                <TableCell align="right">
                                    {NumberUtil.formatDecimal(
                                        data["real_values_acc_perc"][index]
                                    )}
                                </TableCell>
                                <TableCell align="right">
                                    {data["variation"][index]}
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
    );
};

export default QuestionnaireExpectedVsRealFieldTable;
