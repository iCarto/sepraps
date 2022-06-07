import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const QuestionnaireInstanceHistoricalTable = ({projectQuestionnaire}) => {
    const tableRowStyle = {
        "&:last-child td, &:last-child th": {
            border: 0,
        },
        paddingRight: "12px",
    };

    const headCells = projectQuestionnaire.questionnaire.fields.map(field => {
        return {
            id: field.code,
            label: field.label,
            width: 60 % projectQuestionnaire.questionnaire.fields.length,
        };
    });

    return (
        <TableContainer sx={{overflowX: "auto"}}>
            <Table aria-labelledby="Projects table" sx={{tableLayout: "fixed"}}>
                <colgroup>
                    <col key="month" width="10%" />
                    {headCells.map(headCell => (
                        <col key={headCell.id} width={headCell.width + "%"} />
                    ))}
                    <col key="comments" width="30%" />
                </colgroup>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Mes</TableCell>
                        {headCells.map(headCell => (
                            <TableCell key={headCell.id} align="center" colSpan={2}>
                                {headCell.label}
                            </TableCell>
                        ))}
                        <TableCell align="center">Observaciones</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center"></TableCell>
                        {headCells.map(headCell => (
                            <>
                                <TableCell
                                    key={headCell.id + "expected"}
                                    align="center"
                                >
                                    Previsto
                                </TableCell>
                                <TableCell key={headCell.id + "real"} align="center">
                                    Real
                                </TableCell>
                            </>
                        ))}
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {projectQuestionnaire.questionnaire_instances.map(
                        (instance, index) => {
                            return (
                                <TableRow hover key={index} sx={tableRowStyle}>
                                    <TableCell>
                                        {instance.month + "/" + instance.year}
                                    </TableCell>
                                    {instance.values.map(value => (
                                        <>
                                            <TableCell
                                                key={value.id + "expected"}
                                                align="center"
                                            >
                                                {value.expected_value}
                                            </TableCell>
                                            <TableCell
                                                key={value.id + "real"}
                                                align="center"
                                            >
                                                {value.value}
                                            </TableCell>
                                        </>
                                    ))}
                                    <TableCell>{instance.comments}</TableCell>
                                </TableRow>
                            );
                        }
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default QuestionnaireInstanceHistoricalTable;
