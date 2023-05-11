import {useState} from "react";
import {useAuth} from "base/user/provider";
import {ProjectService} from "project/service";
import {project_view_adapter} from "project/model";
import {useNavigateWithReload} from "base/navigation/hooks";

import {RemoveItemDialog} from "base/delete/components";
import {EntityAddButtonGroup} from "base/entity/components";
import {
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
} from "base/section/components";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import LinkOffIcon from "@mui/icons-material/LinkOff";

const ProjectProviderSection = ({project}) => {
    const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);

    const navigate = useNavigateWithReload();
    const {ROLES} = useAuth();

    const provider = project.provider;
    const isProjectClosed = project.closed;

    const secondaryActions = provider?.id
        ? [
              <SectionCardHeaderAction
                  key="edit"
                  name="edit"
                  text="Modificar"
                  icon={<EditIcon />}
                  onClick={() => {
                      navigate("provider/edit" + provider.id);
                  }}
                  roles={[ROLES.EDIT, ROLES.MANAGEMENT, ROLES.SUPERVISION]}
              />,
              <SectionCardHeaderAction
                  key="remove"
                  name="remove"
                  text="Quitar"
                  icon={<LinkOffIcon />}
                  onClick={() => {
                      setIsRemoveDialogOpen(true);
                  }}
                  roles={[ROLES.EDIT, ROLES.MANAGEMENT, ROLES.SUPERVISION]}
              />,
          ]
        : null;

    const handleRemoveProvider = () => {
        setIsRemoveDialogOpen(false);
        ProjectService.update(project_view_adapter({...project, provider: null})).then(
            () => {
                navigate("/projects/" + project.id + "/location", true);
            }
        );
    };

    return (
        <SectionCard
            title="Prestador"
            secondaryActions={!isProjectClosed && secondaryActions}
        >
            {provider?.id ? (
                <>
                    <SectionField
                        label="Nombre"
                        value={provider.name}
                        linkPath={`/providers/${provider.id}/summary`}
                    />
                    <SectionField
                        label="Ubicación"
                        value={`${provider.locality.name}, ${provider.locality.department_name} (${provider.locality.district_name})`}
                    />
                    <RemoveItemDialog
                        isDialogOpen={isRemoveDialogOpen}
                        setIsDialogOpen={setIsRemoveDialogOpen}
                        onRemove={handleRemoveProvider}
                    />
                </>
            ) : (
                <Stack alignItems="center" spacing={3}>
                    <Typography sx={{fontStyle: "italic"}}>
                        Este proyecto aún no tiene prestador
                    </Typography>
                    {!isProjectClosed && <EntityAddButtonGroup basePath="provider/" />}
                </Stack>
            )}
        </SectionCard>
    );
};

export default ProjectProviderSection;
