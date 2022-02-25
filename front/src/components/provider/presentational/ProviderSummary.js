import {SectionCard, SectionField} from "components/common/presentational";
import LocationOn from "@mui/icons-material/LocationOn";

const ProviderSummary = ({provider}) => {
    return (
        <SectionCard title="Prestador">
            <SectionField label="Nombre:" value={provider.name} />
            <SectionField
                label="Ubicación:"
                value={`${provider.locality.locality_name}, ${provider.locality.department_name} (${provider.locality.district_name})`}
                labelIcon={LocationOn}
            />
        </SectionCard>
    );
};

export default ProviderSummary;
