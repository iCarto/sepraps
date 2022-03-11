import {useState} from "react";
import {useNavigate, useOutletContext} from "react-router-dom";
import {
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
} from "components/common/presentational";
import {RemoveProjectProviderDialog} from "components/provider/container";
import {
    AddProviderButtonGroup,
    ProviderContactsSection,
} from "components/provider/presentational";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LocationOn from "@mui/icons-material/LocationOn";
import EditIcon from "@mui/icons-material/Edit";
import LinkOffIcon from "@mui/icons-material/LinkOff";

const ProviderSection = () => {
    const navigate = useNavigate();
    let project;
    [project] = useOutletContext();
    const provider = project.provider;

    const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);

    const headerActions = provider?.id
        ? [
              <SectionCardHeaderAction
                  key="edit"
                  name="edit"
                  text="Modificar"
                  icon={<EditIcon />}
                  onClick={() => {
                      navigate("provider/" + provider.id + "/edit");
                  }}
              />,
              <SectionCardHeaderAction
                  key="remove"
                  name="remove"
                  text="Quitar"
                  icon={<LinkOffIcon />}
                  onClick={() => {
                      setIsRemoveDialogOpen(true);
                  }}
              />,
          ]
        : null;

    return (
        <SectionCard title="Prestador" secondaryActions={headerActions}>
            {provider?.id ? (
                <>
                    <SectionField label="Nombre:" value={provider.name} />
                    <SectionField
                        label="Ubicación:"
                        value={`${provider.locality.locality_name}, ${provider.locality.department_name} (${provider.locality.district_name})`}
                        labelIcon={LocationOn}
                    />
                    <ProviderContactsSection provider={provider} />
                    <RemoveProjectProviderDialog
                        project={project}
                        isDialogOpen={isRemoveDialogOpen}
                        setIsDialogOpen={setIsRemoveDialogOpen}
                    />
                </>
            ) : (
                <Stack alignItems="center" spacing={2}>
                    <Typography style={{fontStyle: "italic"}}>
                        El proyecto no tiene ningún prestador asignado
                    </Typography>
                    <AddProviderButtonGroup />
                </Stack>
            )}
        </SectionCard>
    );
};

export default ProviderSection;
