import {useAuth} from "base/user/provider";
import {ProjectService} from "project/service";
import {project_view_adapter} from "project/model";
import {useNavigateWithReload} from "base/navigation/hooks";

import {RemoveItemDialog} from "base/delete/components";
import {AddNewButton} from "base/shared/components";
import {SectionField} from "base/ui/section/components";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const ProjectProviderSection = ({
    project,
    isRemoveDialogOpen,
    onClickNew,
    onCloseDialog,
}) => {
    const navigate = useNavigateWithReload();
    const {ROLES} = useAuth();

    const provider = project.provider;
    const isProjectClosed = project.closed;

    const handleRemoveProvider = () => {
        onCloseDialog();
        ProjectService.update(project_view_adapter({...project, provider: null})).then(
            () => {
                navigate("/projects/list/" + project.id + "/provider", true);
            }
        );
    };

    return provider?.id ? (
        <>
            <SectionField
                label="Nombre"
                value={provider.name}
                linkPath={`/providers/list/${provider.id}`}
            />
            <SectionField label="Tipo" value={`${provider.type_label}`} />
            <SectionField
                label="Legalmente constituida"
                value={`${provider.is_legalized_label}`}
            />
            <RemoveItemDialog
                isDialogOpen={isRemoveDialogOpen}
                setIsDialogOpen={onCloseDialog}
                onRemove={handleRemoveProvider}
            />
        </>
    ) : (
        <Stack alignItems="center" spacing={3}>
            <Typography sx={{fontStyle: "italic"}}>
                Este proyecto aún no tiene ningún prestador de servicios asociado
            </Typography>
            {!isProjectClosed && (
                <AddNewButton
                    onClick={onClickNew}
                    roles={[ROLES.EDIT, ROLES.MANAGEMENT, ROLES.SUPERVISION]}
                />
            )}
        </Stack>
    );
};

export default ProjectProviderSection;
