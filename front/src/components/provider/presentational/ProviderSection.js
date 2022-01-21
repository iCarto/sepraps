import {SectionCard, SectionField} from "components/common/presentational";
import LocationOn from "@mui/icons-material/LocationOn";

const ProviderSection = ({provider}) => {
    return (
        <SectionCard title="Prestador">
            <SectionField label="Nombre:" value={provider.name} />
            <SectionField
                label="Ubicación:"
                value={`${provider.locality_name}, ${provider.department_name} (${provider.district_name})`}
                labelIcon={LocationOn}
            />
        </SectionCard>
    );
};

export default ProviderSection;
