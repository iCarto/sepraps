import {useState} from "react";
import {useOutletContext} from "react-router-dom";
import {useNavigateWithReload} from "hooks";
import {ProjectService} from "service/api";
import {createProject, project_view_adapter} from "model";

import {ProjectLinkedLocalitiesTable} from ".";
import {DialogLayout, SectionCard} from "components/common/presentational";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

const ProjectLinkedLocalitiesSection = ({isSidePanelOpen = null}) => {
    let project;
    [project] = useOutletContext();

    const navigate = useNavigateWithReload();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [localityToRemove, setLocalityToRemove] = useState(null);
    const [actionToPerform, setActionToPerform] = useState("");
    const [error, setError] = useState("");

    const handleActions = (localityId, action) => {
        setActionToPerform(action);
        switch (action) {
            case "remove":
                setLocalityToRemove(localityId);
                setIsDialogOpen(true);
                break;
            case "edit":
                handleEdit(localityId);
                break;
            default:
                break;
        }
    };

    const handleDialog = isOpen => {
        setIsDialogOpen(isOpen);
    };

    const handleEdit = localityCode => {
        navigate(`linked_localities/${localityCode}/edit`);
    };

    const handleConfirmRemoval = () => {
        let localityToRemoveIndex = project.linked_localities.findIndex(
            locality => locality.code === localityToRemove
        );

        project.linked_localities.splice(localityToRemoveIndex, 1);

        const updatedProject = createProject({
            ...project,
            linked_localities: [...project.linked_localities],
        });

        handleUpdateProject(updatedProject);
        setIsDialogOpen(false);
    };

    const handleUpdateProject = updatedProject => {
        ProjectService.updateProject(project_view_adapter({...updatedProject}))
            .then(() => {
                navigate(`/projects/${project.id}/location`, true);
            })
            .catch(error => {
                console.log(error);
                setError(error.toString());
            });
    };

    return (
        <SectionCard title="Localidades vinculadas" isSidePanelOpen={isSidePanelOpen}>
            <Grid item container xs={12} justifyContent="center">
                {project.linked_localities.length !== 0 ? (
                    <ProjectLinkedLocalitiesTable handleActions={handleActions} />
                ) : (
                    <Typography pt={3} style={{fontStyle: "italic"}}>
                        Este proyecto aún no tiene localidades vinculadas
                    </Typography>
                )}
            </Grid>
            <Grid item container xs={12} mt={3} justifyContent="center">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        navigate("linked_localities/new/add");
                    }}
                >
                    Añadir
                </Button>
            </Grid>
            <Grid item xs={12}>
                {error && (
                    <Alert severity="error" sx={{mt: 2, mb: 2}}>
                        {error}
                    </Alert>
                )}
            </Grid>
            {actionToPerform === "remove" && (
                <DialogLayout
                    dialogLabel="Remove linked locality"
                    dialogTitle="¿Quiere desvincular esta localidad del proyecto?"
                    dialogContentText="Si hace clic en Quitar, el contacto se borrará de la lista de localidades vinculadas al proyecto."
                    mainActionClick={handleConfirmRemoval}
                    mainActionText="Quitar"
                    handleDialog={handleDialog}
                    isDialogOpen={isDialogOpen}
                />
            )}
        </SectionCard>
    );
};

export default ProjectLinkedLocalitiesSection;
