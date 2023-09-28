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
import {useMenuGenericRemoveAction} from "base/ui/menu/hooks";

const ProjectLinkedLocalitiesSection = ({project}) => {
    const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
    const [localityToRemove, setLocalityToRemove] = useState(null);
    const [error, setError] = useState("");

    const {ROLES} = useAuth();
    const navigate = useNavigateWithReload();

    const isProjectClosed = project.closed;

    const {action: removeAction, dialog: removeDialog} = useMenuGenericRemoveAction(
        project,
        "linked_localities",
        ProjectService,
        entityObject => project_view_adapter(entityObject),
        "code"
    );

    return (
        <SectionCard title="Localidades vinculadas">
            {project.linked_localities.length ? (
                <ProjectLinkedLocalitiesTable
                    localities={project.linked_localities}
                    elementActions={!isProjectClosed && [removeAction]}
                />
            ) : (
                <Stack alignItems="center" spacing={3}>
                    <Typography sx={{fontStyle: "italic"}}>
                        Este proyecto aún no tiene localidades vinculadas
                    </Typography>
                </Stack>
            )}
            {!isProjectClosed && (
                <Stack alignItems="center" spacing={3} sx={{mt: 2}}>
                    <AddNewButton
                        basePath="linked_localities/new/add"
                        roles={[ROLES.EDIT, ROLES.MANAGEMENT, ROLES.SUPERVISION]}
                    />
                </Stack>
            )}
            <AlertError error={error} />
            {removeDialog}
        </SectionCard>
    );
};

export default ProjectLinkedLocalitiesSection;
