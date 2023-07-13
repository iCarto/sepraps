import {FieldReportProjectForm} from "../form";
import {AddNewFullWidthButton, BulletList} from "base/shared/components";

import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

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
                <FieldReportProjectForm
                    project={project}
                    section={section}
                    onSubmit={handleSubmit}
                    onCancel={handleCancelForm}
                />
            ) : project?.agreements?.length ? (
                <Grid container columnSpacing={1}>
                    <Grid item xs>
                        <BulletList items={project?.agreements} />
                    </Grid>
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
                </Grid>
            ) : (
                <Grid mt={2} display={isFormOpen ? "none" : "inherit"}>
                    <AddNewFullWidthButton
                        onClick={handleOpenForm}
                        tooltip="Añadir acuerdo"
                    />
                </Grid>
            )}
        </>
    );
};

export default FieldReportProjectAgreementsSection;
