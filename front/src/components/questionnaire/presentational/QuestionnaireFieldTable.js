import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

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

const QuestionnaireFieldTable = ({fieldLabel, data}) => {
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
                        <TableCell align="center" colSpan={2}>
                            Real
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center"></TableCell>
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
                    {data["index"].map((indexLabel, index) => {
                        return (
                            <TableRow hover key={index} sx={tableRowStyle}>
                                <TableCell>{indexLabel}</TableCell>
                                <TableCell align="right">
                                    {data["real_values"][index]}
                                </TableCell>
                                <TableCell align="right">
                                    {data["real_values_acc"][index]}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default QuestionnaireFieldTable;
