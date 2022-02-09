import {SectionCard, SectionField} from "components/common/presentational";

import LocationOn from "@mui/icons-material/LocationOn";

const ProviderSection = ({provider, hideButtons = null, ...props}) => {
    let actions = [];
    if (!hideButtons && provider) {
        actions.push("edit");
    } else if (!hideButtons && !provider) {
        actions.push("add");
    } else actions = null;

    return (
        <SectionCard title="Prestador" headerActions={actions} {...props}>
            <SectionField label="Nombre:" value={provider.name} />
            <SectionField
                label="Ubicación:"
                value={`${provider.locality.locality_name}, ${provider.locality.department_name} (${provider.locality.district_name})`}
                labelIcon={LocationOn}
            />
        </SectionCard>
    );
};

export default ProviderSection;
