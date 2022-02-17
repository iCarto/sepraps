import {useNavigate} from "react-router-dom";
import {
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
} from "components/common/presentational";
import ProviderContactSection from "./ProviderContactsSection";

import Typography from "@mui/material/Typography";
import LocationOn from "@mui/icons-material/LocationOn";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const ProviderSection = ({provider, hideButtons = null}) => {
    const navigate = useNavigate();

    const headerActions = provider.id
        ? [
              <SectionCardHeaderAction
                  key="edit"
                  name="edit"
                  title="Modificar"
                  icon={<EditIcon />}
                  onClick={() => {
                      navigate("provider/edit");
                  }}
              />,
          ]
        : [
              <SectionCardHeaderAction
                  key="add"
                  name="add"
                  title="Añadir"
                  icon={<AddCircleOutlineIcon />}
                  onClick={() => {
                      navigate("provider/add");
                  }}
              />,
          ];

    return (
        <SectionCard
            title="Prestador"
            headerActions={!hideButtons ? headerActions : null}
        >
            {provider.id ? (
                <>
                    <SectionField label="Nombre:" value={provider.name} />
                    <SectionField
                        label="Ubicación:"
                        value={`${provider.locality.locality_name}, ${provider.locality.department_name} (${provider.locality.district_name})`}
                        labelIcon={LocationOn}
                    />
                    <ProviderContactSection provider={provider} />
                </>
            ) : (
                <Typography style={{fontStyle: "italic"}}>
                    No se ha asignado prestador al proyecto todavía
                </Typography>
            )}
        </SectionCard>
    );
};

export default ProviderSection;
