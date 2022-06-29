import {Fragment} from "react";
import {useQuestionnaireColors} from "../hooks";

import {QuestionnaireInstanceTableRow} from ".";
import {BorderedTableCell as TableCell} from "components/common/presentational";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const QuestionnaireInstanceTable = ({projectQuestionnaire, isProjectClosed}) => {
    const {getCellStyle, COLORS} = useQuestionnaireColors();
    const realCellStyle = getCellStyle(COLORS.REAL);
    const expectedCellStyle = getCellStyle(COLORS.EXPECTED);

    const headCells = projectQuestionnaire.questionnaire.fields.map(field => {
        return {
            id: field.code,
            label: field.label,
            include_expected_value: field.include_expected_value,
            width: 40 / projectQuestionnaire.questionnaire.fields.length,
        };
    });

    return (
        <TableContainer sx={{overflowX: "auto"}}>
            <Table aria-labelledby="Projects table" sx={{tableLayout: "fixed"}}>
                <colgroup>
                    <col key="month" width="20%" />
                    {headCells.map(headCell => (
                        <col
                            key={headCell.id}
                            width={headCell.width + "%"}
                            span={headCell.include_expected_value ? 2 : 1}
                        />
                    ))}
                    <col key="comments" width="30%" />
                    <col key="actions" width="10%" />
                </colgroup>
                <TableHead>
                    <TableRow>
                        <TableCell align="center" rowSpan={2}>
                            Mes
                        </TableCell>
                        {headCells.map(headCell => (
                            <TableCell
                                key={headCell.id}
                                align="center"
                                colSpan={headCell.include_expected_value ? 2 : 1}
                            >
                                {headCell.label}
                            </TableCell>
                        ))}
                        <TableCell align="center" rowSpan={2}>
                            Observaciones
                        </TableCell>
                        <TableCell align="center" rowSpan={2}></TableCell>
                    </TableRow>
                    <TableRow>
                        {headCells.map(headCell => (
                            <Fragment key={headCell.id}>
                                {headCell.include_expected_value ? (
                                    <TableCell
                                        key={headCell.id + "expected"}
                                        align="center"
                                        sx={expectedCellStyle}
                                    >
                                        Previsto
                                    </TableCell>
                                ) : null}
                                <TableCell
                                    key={headCell.id + "real"}
                                    align="center"
                                    sx={realCellStyle}
                                >
                                    Real
                                </TableCell>
                            </Fragment>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {projectQuestionnaire.questionnaire_instances.map(instance => (
                        <QuestionnaireInstanceTableRow
                            key={instance.id}
                            instance={instance}
                            projectQuestionnaire={projectQuestionnaire}
                            isProjectClosed={isProjectClosed}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default QuestionnaireInstanceTable;
