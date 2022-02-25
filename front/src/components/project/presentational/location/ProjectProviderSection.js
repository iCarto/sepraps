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

import Typography from "@mui/material/Typography";
import LocationOn from "@mui/icons-material/LocationOn";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";

const ProviderSection = () => {
    const navigate = useNavigate();
    let project;
    [project] = useOutletContext();
    const provider = project.provider;

    const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);

    const headerActions = provider.id
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
                  icon={<DeleteIcon />}
                  onClick={() => {
                      setIsRemoveDialogOpen(true);
                  }}
              />,
          ]
        : null;

    return (
        <SectionCard title="Prestador" secondaryActions={headerActions}>
            {provider.id ? (
                <>
                    <SectionField label="Nombre:" value={provider.name} />
                    <SectionField
                        label="Ubicación:"
                        value={`${provider.locality.locality_name}, ${provider.locality.department_name} (${provider.locality.district_name})`}
                        labelIcon={LocationOn}
                    />
                    <ProviderContactsSection provider={provider} />
                </>
            ) : (
                <Grid container direction="column" alignItems="center">
                    <Grid item>
                        <Typography style={{fontStyle: "italic"}}>
                            El proyecto no tiene un prestador asignado
                        </Typography>
                    </Grid>
                    <Grid item>
                        <AddProviderButtonGroup />
                    </Grid>
                </Grid>
            )}
            <RemoveProjectProviderDialog
                project={project}
                isDialogOpen={isRemoveDialogOpen}
                setIsDialogOpen={setIsRemoveDialogOpen}
            />
        </SectionCard>
    );
};

export default ProviderSection;
