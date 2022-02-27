import {useOutletContext} from "react-router-dom";

import {SectionCard, SectionField} from "components/common/presentational";
import {Map} from "components/common/geo";

const ProjectInfrastructureSection = () => {
    let project;
    [project] = useOutletContext();

    return (
        <SectionCard title="Infraestructura principal">
            <SectionField
                label="Departamento:"
                value={project.main_infrastructure.locality.department_name}
            />
            <SectionField
                label="Distrito:"
                value={project.main_infrastructure.locality.district_name}
            />
            <SectionField
                label="Localidad:"
                value={project.main_infrastructure.locality.locality_name}
            />
            <SectionField
                label="Ubicación:"
                value={`${project.main_infrastructure.latitude}, ${project.main_infrastructure.longitude}`}
            />
            <SectionField
                label="Altitud:"
                value={`${project.main_infrastructure.altitude} metros`}
            />
            <Map
                markerPosition={{
                    lat: project.main_infrastructure.latitude,
                    lng: project.main_infrastructure.longitude,
                }}
                text={`${project.main_infrastructure.locality.locality_name}, ${project.main_infrastructure.locality.district_name}`}
            />
        </SectionCard>
    );
};

export default ProjectInfrastructureSection;
