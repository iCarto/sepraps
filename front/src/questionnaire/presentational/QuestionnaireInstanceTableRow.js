import {Fragment} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "base/user/provider";
import {DateUtil} from "base/format/utilities";
import {useQuestionnaireColors, useFormattedValue} from "../hooks";

import TableRow from "@mui/material/TableRow";

import {BorderedTableCell as TableCell} from "base/table/components";
import {MenuAction} from "base/ui/menu";
import {MenuActions} from "base/ui/menu";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import ErrorIcon from "@mui/icons-material/Error";

const QuestionnaireInstanceTableRow = ({
    instance,
    projectQuestionnaire,
    isProjectClosed,
}) => {
    const navigate = useNavigate();
    const formatValue = useFormattedValue();
    const {getCellStyle, COLORS} = useQuestionnaireColors();
    const realCellStyle = getCellStyle(COLORS.REAL);
    const expectedCellStyle = getCellStyle(COLORS.EXPECTED);
    const extendedCellStyle = getCellStyle(COLORS.EXTENDED);

    const {ROLES, hasRole} = useAuth();

    const handleClick = () => {
        navigate(
            `/projects/list/${projectQuestionnaire.projectId}/questionnaires/${projectQuestionnaire.questionnaire.code}/${instance.id}/edit`
        );
    };

    const isPastInstance = instance => {
        const now = DateUtil.getFirstDayOfCurrentMonth();
        const instanceDate = new Date(instance.year, instance.month - 1, 1);
        return now.getTime() - instanceDate.getTime() > 0;
    };

    const isFutureInstance = instance => {
        const now = DateUtil.getFirstDayOfCurrentMonth();
        const instanceDate = new Date(instance.year, instance.month - 1, 1);
        return instanceDate.getTime() - now.getTime() > 0;
    };

    const isInstanceEditable = instance => {
        const hasEditPermission = [ROLES.SUPERVISION].some(role => hasRole(role));
        return (
            (!isProjectClosed && !isFutureInstance(instance)) ||
            (!isProjectClosed && hasEditPermission)
        );
    };

    return (
        <TableRow hover sx={isFutureInstance(instance) ? {fontStyle: "italic"} : {}}>
            <TableCell>{instance.month + "/" + instance.year}</TableCell>
            {projectQuestionnaire.questionnaire.fields.map(field => {
                const hasExpectedValue = field.include_expected_value;
                const value = instance.values.find(
                    instanceValue => instanceValue.code === field.code
                );
                return (
                    <Fragment key={value.id}>
                        {hasExpectedValue ? (
                            <TableCell
                                key={value.id + "expected"}
                                align="center"
                                sx={
                                    instance.extended
                                        ? extendedCellStyle
                                        : expectedCellStyle
                                }
                            >
                                {formatValue(value.expected_value, value.datatype)}
                            </TableCell>
                        ) : null}
                        <TableCell
                            key={value.id + "real"}
                            align="center"
                            sx={value?.value ? realCellStyle : {}}
                        >
                            {isPastInstance(instance) && !value?.value ? (
                                <Tooltip title="Datos mensuales sin registrar">
                                    <ErrorIcon color="error" />
                                </Tooltip>
                            ) : (
                                formatValue(value.value, value.datatype)
                            )}
                        </TableCell>
                    </Fragment>
                );
            })}
            <TableCell>{instance.comments}</TableCell>
            <TableCell>
                {isInstanceEditable(instance) ? (
                    <MenuActions>
                        <MenuAction
                            key="edit-questionnaire"
                            icon={<EditIcon />}
                            text="Modificar"
                            element={instance.id}
                            handleClick={handleClick}
                        />
                    </MenuActions>
                ) : null}
            </TableCell>
        </TableRow>
    );
};

export default QuestionnaireInstanceTableRow;
