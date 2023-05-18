import {useState} from "react";
import {useAuth} from "base/user/provider";
import {useNavigateWithReload} from "base/navigation/hooks";
import {ProjectService} from "project/service";
import {createProject, project_view_adapter} from "project/model";

import {SectionCard} from "base/ui/section/components";
import {RemoveItemDialog} from "base/delete/components";
import {AlertError} from "base/error/components";
import {AddNewButton} from "base/shared/components";
import {ProjectLinkedLocalitiesTable} from "project/presentational/location";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const ProjectLinkedLocalitiesSection = ({project}) => {
    const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
    const [localityToRemove, setLocalityToRemove] = useState(null);
    const [error, setError] = useState("");

    const {ROLES} = useAuth();
    const navigate = useNavigateWithReload();

    const isProjectClosed = project.closed;

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
        ProjectService.update(project_view_adapter({...updatedProject}))
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
            {project.linked_localities.length ? (
                <ProjectLinkedLocalitiesTable
                    localities={project.linked_localities}
                    handleActions={!isProjectClosed && handleActions}
                />
            ) : (
                <Stack alignItems="center" spacing={3}>
                    <Typography sx={{fontStyle: "italic"}}>
                        Este proyecto aún no tiene localidades vinculadas
                    </Typography>
                    {!isProjectClosed && (
                        <AddNewButton
                            basePath="linked_localities/new/add"
                            roles={[ROLES.EDIT, ROLES.MANAGEMENT, ROLES.SUPERVISION]}
                        />
                    )}
                </Stack>
            )}
            <AlertError error={error} />
            <RemoveItemDialog
                isDialogOpen={isRemoveDialogOpen}
                setIsDialogOpen={setIsRemoveDialogOpen}
                onRemove={handleUpdateProject}
                itemToRemove={localityToRemove}
                createEntityObject={createProject}
                entity={project}
                subEntityList={project.linked_localities}
                subEntityName={"linked_localities"}
            />
        </SectionCard>
    );
};

export default ProjectLinkedLocalitiesSection;
