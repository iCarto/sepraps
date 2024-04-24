import {FieldReportProjectForm} from "../form";
import {FormContainer} from "base/form/components";
import {AddNewFullWidthButton, BulletList} from "base/shared/components";

import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import {UserAuthRequired} from "base/user/utilities";

const FieldReportProjectAgreementsSection = ({
    project,
    isFormOpen,
    onOpenForm,
    onCloseForm,
    onSubmit,
}) => {
    const section = "agreements";

    const handleOpenForm = () => {
        onOpenForm(section);
    };

    const handleCancelForm = () => {
        onCloseForm(section);
    };

    const handleSubmit = updatedProject => {
        onSubmit(updatedProject);
    };

    return (
        <>
            {isFormOpen ? (
                <FormContainer>
                    <FieldReportProjectForm
                        project={project}
                        section={section}
                        onSubmit={handleSubmit}
                        onCancel={handleCancelForm}
                    />
                </FormContainer>
            ) : project?.agreements?.length ? (
                <Grid container columnSpacing={1}>
                    <Grid item xs>
                        <BulletList items={project?.agreements} />
                    </Grid>
                    <UserAuthRequired user={project?.created_by}>
                        <Grid
                            item
                            xs={"auto"}
                            container
                            justifyContent="flex-end"
                            alignItems="center"
                        >
                            <IconButton onClick={handleOpenForm}>
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </Grid>
                    </UserAuthRequired>
                </Grid>
            ) : (
                <UserAuthRequired user={project?.created_by}>
                    <Grid mt={2} display={isFormOpen ? "none" : "inherit"}>
                        <AddNewFullWidthButton
                            onClick={handleOpenForm}
                            tooltip="Añadir acuerdo"
                        />
                    </Grid>
                </UserAuthRequired>
            )}
        </>
    );
};

export default FieldReportProjectAgreementsSection;
