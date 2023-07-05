import {useNavigate} from "react-router-dom";

import {useAuth} from "base/user/provider";

import {AddNewButton, BulletList} from "base/shared/components";
import {SectionCard, SectionCardHeaderAction} from "base/ui/section/components";
import {useMenuGenericDeleteAction} from "base/ui/menu/hooks";
import {FieldReportService} from "fieldReport/service";

import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const FieldReportGoalsSection = ({fieldReport}) => {
    const navigate = useNavigate();
    const {ROLES} = useAuth();

    const handleClickDelete = index => {
        console.log("delete", index);
    };

    const {dialog: deleteDialog} = useMenuGenericDeleteAction(FieldReportService);

    const getSecondaryActions = index => {
        return [
            <SectionCardHeaderAction
                key="edit"
                name="edit"
                text="Modificar"
                icon={<EditIcon />}
                onClick={() => {
                    navigate(`goals/edit/${index}`);
                }}
                roles={[ROLES.EDIT, ROLES.MANAGEMENT, ROLES.SUPERVISION]}
            />,
            <SectionCardHeaderAction
                key="delete"
                name="delete"
                text="Eliminar"
                icon={<DeleteIcon color="error" />}
                onClick={() => handleClickDelete(index)}
                roles={[ROLES.EDIT, ROLES.MANAGEMENT, ROLES.SUPERVISION]}
            />,
        ];
    };

    return (
        <>
            {deleteDialog}
            <SectionCard title="Objetivos">
                <BulletList
                    items={fieldReport?.visit_goals}
                    getActions={getSecondaryActions}
                />
                <Stack alignItems="center" mt={2}>
                    <AddNewButton text="Añadir objetivo" basePath="goals/add/new" />
                </Stack>
            </SectionCard>
        </>
    );
};

export default FieldReportGoalsSection;
