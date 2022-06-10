import {useState} from "react";
import {useOutletContext} from "react-router-dom";
import {AuthAction, useAuth} from "auth";
import {useNavigateWithReload} from "hooks";
import {ProjectService} from "service/api";
import {project_view_adapter} from "model";

import {SectionCard} from "components/common/presentational";
import {ProjectLinkedLocalitiesTable} from ".";
import {RemoveProjectLinkedLocalityDialog} from "components/project/container";
import {AlertError} from "components/common/presentational";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const ProjectLinkedLocalitiesSection = () => {
    const {ROLES} = useAuth();

    let project;
    [project] = useOutletContext();

    const isProjectClosed = project.closed;

    const navigate = useNavigateWithReload();

    const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
    const [localityToRemove, setLocalityToRemove] = useState(null);
    const [error, setError] = useState("");

    const handleActions = (localityId, action) => {
        switch (action) {
            case "remove":
                setLocalityToRemove(localityId);
                setIsRemoveDialogOpen(true);
                break;
            case "edit":
                handleEdit(localityId);
                break;
            default:
                break;
        }
    };

    const handleEdit = localityCode => {
        navigate(`linked_localities/${localityCode}/edit`);
    };

    const handleUpdateProject = updatedProject => {
        ProjectService.updateProject(project_view_adapter({...updatedProject}))
            .then(() => {
                navigate(`/projects/${project.id}/location`, true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
        setIsRemoveDialogOpen(false);
    };

    return (
        <SectionCard title="Localidades vinculadas">
            <Grid item container xs={12} justifyContent="center">
                {project.linked_localities.length !== 0 ? (
                    <ProjectLinkedLocalitiesTable
                        localities={project.linked_localities}
                        handleActions={!isProjectClosed && handleActions}
                    />
                ) : (
                    <Typography pt={3} pb={6} sx={{fontStyle: "italic"}}>
                        Este proyecto aún no tiene localidades vinculadas
                    </Typography>
                )}
            </Grid>
            {!isProjectClosed && (
                <AuthAction roles={[ROLES.EDIT, ROLES.MANAGEMENT]}>
                    <Grid item container xs={12} justifyContent="center">
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
                </AuthAction>
            )}
            <AlertError error={error} />
            <RemoveProjectLinkedLocalityDialog
                project={project}
                localityToRemove={localityToRemove}
                onRemoval={handleUpdateProject}
                isDialogOpen={isRemoveDialogOpen}
                setIsDialogOpen={setIsRemoveDialogOpen}
            />
        </SectionCard>
    );
};

export default ProjectLinkedLocalitiesSection;
