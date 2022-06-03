import {Fragment} from "react";
import {useNavigate} from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
    ActionsMenu,
    BorderedTableCell as TableCell,
    MenuAction,
} from "components/common/presentational";
import EditIcon from "@mui/icons-material/Edit";

const QuestionnaireInstanceTable = ({projectQuestionnaire}) => {
    const navigate = useNavigate();

    const headCells = projectQuestionnaire.questionnaire.fields.map(field => {
        return {
            id: field.code,
            label: field.label,
            width: 40 / projectQuestionnaire.questionnaire.fields.length,
        };
    });

    const handleClick = instanceSelectedId => {
        navigate(
            `/projects/${projectQuestionnaire.projectId}/questionnaires/${projectQuestionnaire.questionnaire.code}/${instanceSelectedId}/edit`
        );
    };

    return (
        <TableContainer sx={{overflowX: "auto"}}>
            <Table aria-labelledby="Projects table" sx={{tableLayout: "fixed"}}>
                <colgroup>
                    <col key="month" width="20%" />
                    {headCells.map(headCell => (
                        <col key={headCell.id} width={headCell.width + "%"} span={2} />
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
                            <TableCell key={headCell.id} align="center" colSpan={2}>
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
                                <TableCell
                                    key={headCell.id + "expected"}
                                    align="center"
                                >
                                    Previsto
                                </TableCell>
                                <TableCell key={headCell.id + "real"} align="center">
                                    Real
                                </TableCell>
                            </Fragment>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {projectQuestionnaire.questionnaire_instances.map(
                        (instance, index) => {
                            return (
                                <TableRow hover key={index}>
                                    <TableCell>
                                        {instance.month + "/" + instance.year}
                                    </TableCell>
                                    {instance.values.map(value => (
                                        <Fragment key={value.id}>
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
                                        </Fragment>
                                    ))}
                                    <TableCell>{instance.comments}</TableCell>
                                    <TableCell>
                                        <ActionsMenu>
                                            <MenuAction
                                                name="edit-questionnaire"
                                                icon={<EditIcon />}
                                                text="Modificar"
                                                itemId={instance.id}
                                                handleClick={handleClick}
                                            />
                                        </ActionsMenu>
                                    </TableCell>
                                </TableRow>
                            );
                        }
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default QuestionnaireInstanceTable;
