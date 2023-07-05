import {useAuth} from "base/user/provider";
import {useNavigate} from "react-router-dom";
import {useMenuGenericDeleteAction} from "base/ui/menu/hooks";
import {FieldReportService} from "fieldReport/service";

import {FieldReportProjectForm} from "../form";
import {AddNewFullWidthButton, BulletList} from "base/shared/components";
import {SectionCardHeaderAction} from "base/ui/section/components";

import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// TO-DO: Implement editing single agreement
const FieldReportProjectAgreementsSection = ({
    project,
    isFormOpen,
    onOpenForm,
    onCloseForm,
}) => {
    const section = "agreements";

    const navigate = useNavigate();
    const {ROLES} = useAuth();

    const handleSubmit = fieldReport => {
        console.log("handleSubmit", fieldReport);
        // FieldReportService.update(fieldReport_view_adapter({...fieldReport}))
        //     .then(() => {
        //         navigate(basePath, true);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         setError(error);
        //     });
    };

    const handleOpenForm = () => {
        onOpenForm(section);
    };

    const handleCancelForm = () => {
        onCloseForm(section);
    };

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
            {isFormOpen ? (
                <FieldReportProjectForm
                    project={project}
                    section={section}
                    onSubmit={handleSubmit}
                    onCancel={handleCancelForm}
                />
            ) : project?.agreements ? (
                <BulletList
                    items={project?.agreements}
                    getActions={getSecondaryActions}
                />
            ) : (
                <Grid mt={2} display={isFormOpen ? "none" : "inherit"}>
                    <AddNewFullWidthButton onClick={handleOpenForm} />
                </Grid>
            )}
        </>
    );
};

export default FieldReportProjectAgreementsSection;
