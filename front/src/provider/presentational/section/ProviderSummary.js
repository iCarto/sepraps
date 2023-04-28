import {SectionCard, SectionField} from "base/section/components";
import LocationOn from "@mui/icons-material/LocationOn";

const ProviderSummary = ({provider}) => {
    return (
        <SectionCard title="Prestador">
            <SectionField label="Nombre:" value={provider.name} />
            <SectionField
                label="Ubicación:"
                value={`${provider.locality.name}, ${provider.locality.department_name} (${provider.locality.district_name})`}
                labelIcon={LocationOn}
            />
        </SectionCard>
    );
};

export default ProviderSummary;
