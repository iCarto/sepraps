import {useOutletContext} from "react-router-dom";

import {SectionCard, SectionField} from "components/common/presentational";

const ProjectInfrastructureSection = () => {
    let project;
    [project] = useOutletContext();

    return (
        <SectionCard title="Infraestructura principal">
            <SectionField
                label="Departamento:"
                value={project.main_infrastructure.department_name}
            />
            <SectionField
                label="Distrito:"
                value={project.main_infrastructure.district_name}
            />
            <SectionField
                label="Localidad:"
                value={project.main_infrastructure.locality_name}
            />
            <SectionField
                label="Ubicación:"
                value={`${project.main_infrastructure.latitude}, ${project.main_infrastructure.longitude} (${project.main_infrastructure.altitude})`}
            />
        </SectionCard>
    );
};

export default ProjectInfrastructureSection;
