import {FieldReportProjectForm} from "../form";
import {AddNewFullWidthButton} from "base/shared/components";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

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
                <FieldReportProjectForm
                    project={project}
                    section={section}
                    onSubmit={handleSubmit}
                    onCancel={handleCancelForm}
                />
            ) : project?.[section] ? (
                <Grid container columnSpacing={1}>
                    <Grid item xs>
                        <Typography variant="body1" color="text.primary">
                            {project[section]}
                        </Typography>
                    </Grid>
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
                </Grid>
            ) : (
                <Grid mt={2} display={isFormOpen ? "none" : "inherit"}>
                    <AddNewFullWidthButton
                        onClick={handleOpenForm}
                        tooltip="Añadir antecedentes"
                    />
                </Grid>
            )}
        </>
    );
};

export default FieldReportProjectHistorySection;
