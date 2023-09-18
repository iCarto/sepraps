import {FieldReportProjectForm} from "../form";
import {FormContainer} from "base/form/components";
import {AddNewFullWidthButton} from "base/shared/components";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import {UserAuthRequired} from "base/user/utilities";

// TO-DO: Extract this and FieldReportProjectAgreementsSection.js to one abstract component
const FieldReportProjectHistorySection = ({
    project,
    isFormOpen,
    onOpenForm,
    onCloseForm,
    onSubmit,
}) => {
    const section = "history";

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
            ) : project?.[section] ? (
                <Grid container columnSpacing={1}>
                    <Grid item xs>
                        <Typography variant="body1" color="text.primary">
                            {project[section]}
                        </Typography>
                    </Grid>
                    <UserAuthRequired user={project?.created_by}>
                        <Grid
                            item
                            xs={"auto"}
                            container
                            justifyContent="flex-end"
                            alignItems="flex-start"
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
                            tooltip="Añadir antecedentes"
                        />
                    </Grid>
                </UserAuthRequired>
            )}
        </>
    );
};

export default FieldReportProjectHistorySection;
