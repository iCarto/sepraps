import {Fragment} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "auth";
import {useExpectedCellStyle, useFormattedValue} from "../hooks";

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
import Tooltip from "@mui/material/Tooltip";
import ErrorIcon from "@mui/icons-material/Error";

const QuestionnaireInstanceTable = ({projectQuestionnaire}) => {
    const navigate = useNavigate();
    const formatValue = useFormattedValue();
    const expectedCellStyle = useExpectedCellStyle();
    const {ROLES, hasRole} = useAuth();

    const headCells = projectQuestionnaire.questionnaire.fields.map(field => {
        return {
            id: field.code,
            label: field.label,
            include_expected_value: field.include_expected_value,
            width: 40 / projectQuestionnaire.questionnaire.fields.length,
        };
    });

    const handleClick = instanceSelectedId => {
        navigate(
            `/projects/${projectQuestionnaire.projectId}/questionnaires/${projectQuestionnaire.questionnaire.code}/${instanceSelectedId}/edit`
        );
    };

    const hasFieldExpectedValue = fieldCode => {
        return projectQuestionnaire.questionnaire.fields.find(
            field => field.code === fieldCode
        ).include_expected_value;
    };

    const isInstanceMonthBefore = instance => {
        const now = new Date();
        return (
            instance.year <= now.getFullYear() && instance.month < now.getMonth() + 1
        );
    };

    const isInstanceMonthAfter = instance => {
        const now = new Date();
        return (
            instance.year >= now.getFullYear() && instance.month > now.getMonth() + 1
        );
    };

    const isInstanceEditable = instance => {
        const hasEditPermission = [ROLES.SUPERVISION].some(role => hasRole(role));
        return !isInstanceMonthAfter(instance) && hasEditPermission;
    };

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
                                <TableCell key={headCell.id + "real"} align="center">
                                    Real
                                </TableCell>
                            </Fragment>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {projectQuestionnaire.questionnaire_instances.map(
                        (instance, index) => (
                            <TableRow
                                hover
                                key={index}
                                sx={
                                    isInstanceMonthAfter(instance)
                                        ? expectedCellStyle
                                        : {}
                                }
                            >
                                <TableCell>
                                    {instance.month + "/" + instance.year}
                                </TableCell>
                                {instance.values.map(value => {
                                    const hasExpectedValue = hasFieldExpectedValue(
                                        value.code
                                    );
                                    return (
                                        <Fragment key={value.id}>
                                            {hasExpectedValue ? (
                                                <TableCell
                                                    key={value.id + "expected"}
                                                    align="center"
                                                    sx={expectedCellStyle}
                                                >
                                                    {formatValue(
                                                        value.expected_value,
                                                        value.datatype
                                                    )}
                                                </TableCell>
                                            ) : null}
                                            <TableCell
                                                key={value.id + "real"}
                                                align="center"
                                            >
                                                {isInstanceMonthBefore(instance) &&
                                                !value?.value ? (
                                                    <Tooltip title="Datos mensuales sin registrar">
                                                        <ErrorIcon color="error" />
                                                    </Tooltip>
                                                ) : (
                                                    formatValue(
                                                        value.value,
                                                        value.datatype
                                                    )
                                                )}
                                            </TableCell>
                                        </Fragment>
                                    );
                                })}
                                <TableCell>{instance.comments}</TableCell>
                                <TableCell>
                                    {isInstanceEditable(instance) ? (
                                        <ActionsMenu>
                                            <MenuAction
                                                name="edit-questionnaire"
                                                icon={<EditIcon />}
                                                text="Modificar"
                                                itemId={instance.id}
                                                handleClick={handleClick}
                                            />
                                        </ActionsMenu>
                                    ) : null}
                                </TableCell>
                            </TableRow>
                        )
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default QuestionnaireInstanceTable;
