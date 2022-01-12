import {useOutletContext} from "react-router-dom";

import {SectionCard, SectionField} from "components/common/presentational";
import LocationOn from "@mui/icons-material/LocationOn";

const ProjectProviderSection = () => {
    let project;
    [project] = useOutletContext();

    return (
        <SectionCard title="Prestador">
            <SectionField label="Nombre:" value={project.provider.name} />
            <SectionField
                label="Ubicación:"
                value={`${project.provider.locality_name}, ${project.provider.department_name} (${project.provider.district_name})`}
                labelIcon={LocationOn}
            />
        </SectionCard>
    );
};

export default ProjectProviderSection;
