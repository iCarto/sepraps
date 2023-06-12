import {useState} from "react";
import {useAuth} from "base/user/provider";
import {ProjectService} from "project/service";
import {project_view_adapter} from "project/model";
import {useNavigateWithReload} from "base/navigation/hooks";

import {RemoveItemDialog} from "base/delete/components";
import {AddNewButton} from "base/shared/components";
import {
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
} from "base/ui/section/components";

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
                      navigate("edit/" + provider.id);
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
                navigate("/projects/" + project.id + "/provider", true);
            }
        );
    };

    return (
        <SectionCard
            title="Prestador de servicios"
            secondaryActions={!isProjectClosed && secondaryActions}
        >
            {provider?.id ? (
                <>
                    <SectionField
                        label="Nombre"
                        value={provider.name}
                        linkPath={`/providers/${provider.id}/summary`}
                    />
                    <SectionField label="Tipo" value={`${provider.type_label}`} />
                    <SectionField
                        label="Legalmente constituida"
                        value={`${provider.is_legalized_label}`}
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
                        Este proyecto aún no tiene ningún prestador de servicios
                        asociado
                    </Typography>
                    {!isProjectClosed && <AddNewButton basePath={`add/existing`} />}
                </Stack>
            )}
        </SectionCard>
    );
};

export default ProjectProviderSection;
