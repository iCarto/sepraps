import {useOutletContext} from "react-router-dom";

import {DetailCard, SectionField} from "components/common/presentational";

const ProjectInfrastructureSection = () => {
    const project = useOutletContext();

    return (
        <DetailCard title="Infraestructura principal">
            <SectionField
                label="Departamento:"
                value={project[0].main_infrastructure.department_name}
            />
            <SectionField
                label="Distrito:"
                value={project[0].main_infrastructure.district_name}
            />
            <SectionField
                label="Localidad:"
                value={project[0].main_infrastructure.locality_name}
            />
            <SectionField
                label="Ubicación:"
                value={`${project[0].main_infrastructure.latitude}, ${project[0].main_infrastructure.longitude} (${project[0].main_infrastructure.altitude})`}
            />
        </DetailCard>
    );
};

export default ProjectInfrastructureSection;
