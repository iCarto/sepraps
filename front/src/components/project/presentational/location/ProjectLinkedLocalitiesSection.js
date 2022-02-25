import {SectionCard} from "components/common/presentational";

import {ProjectLinkedLocalitiesTable} from ".";

const ProjectLinkedLocalitiesSection = () => {
    return (
        <SectionCard title="Localidades vinculadas">
            <ProjectLinkedLocalitiesTable />
        </SectionCard>
    );
};

export default ProjectLinkedLocalitiesSection;
