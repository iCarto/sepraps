import {FieldReportProjectsForm} from "../form";
import {AddNewFullWidthButton} from "base/shared/components";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

const FieldReportProjectAgreementsSection = ({
    project,
    isFormOpen,
    onOpenForm,
    onCloseForm,
}) => {
    const section = "agreements";

    const handleOpenForm = () => {
        onOpenForm(section);
    };

    const handleCancelForm = () => {
        onCloseForm(section);
    };

    return (
        <>
            {isFormOpen ? (
                <FieldReportProjectsForm
                    project={project}
                    section={section}
                    onSubmit={undefined}
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
                    <AddNewFullWidthButton onClick={handleOpenForm} />
                </Grid>
            )}
        </>
    );
};

export default FieldReportProjectAgreementsSection;
