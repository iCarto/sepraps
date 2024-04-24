import {ProjectService} from "project/service";
import {project_view_adapter} from "project/model";

import {useMenuGenericRemoveFromListAction} from "base/ui/menu/hooks";
import {ProjectLinkedLocalitiesTable} from "project/presentational/location";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const ProjectLinkedLocalitiesSection = ({project}) => {
    const isProjectClosed = project.closed;

    const {
        action: removeAction,
        dialog: removeDialog,
    } = useMenuGenericRemoveFromListAction(
        project,
        "linked_localities",
        ProjectService,
        entityObject => project_view_adapter(entityObject),
        "code"
    );

    return (
        <>
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
            {removeDialog}
        </>
    );
};

export default ProjectLinkedLocalitiesSection;
