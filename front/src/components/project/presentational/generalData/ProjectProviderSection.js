import {useOutletContext} from "react-router-dom";

import {DetailCard, SectionField} from "components/common/presentational";
import LocationOn from "@mui/icons-material/LocationOn";

const ProjectProviderSection = () => {
    const project = useOutletContext();

    return (
        <DetailCard title="Prestador">
            <SectionField label="Nombre:" value={project[0].provider.name} />
            <SectionField
                label="Ubicación:"
                value={`${project[0].provider.locality_name}, ${project[0].provider.department_name} (${project[0].provider.district_name})`}
                labelIcon={LocationOn}
            />
        </DetailCard>
    );
};

export default ProjectProviderSection;
