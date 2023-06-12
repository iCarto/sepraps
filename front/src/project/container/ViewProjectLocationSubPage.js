import {useOutletContext} from "react-router-dom";

import {
    ProjectInfrastructureSection,
    ProjectLinkedLocalitiesSection,
} from "project/presentational/section";
import {EntityViewSubPage} from "base/entity/components/container";

const ViewProjectLocationSubPage = () => {
    let project;
    [project] = useOutletContext();

    const sections = [
        <ProjectInfrastructureSection project={project} />,
        <ProjectLinkedLocalitiesSection project={project} />,
    ];

    return project && <EntityViewSubPage sections={sections} />;
};

export default ViewProjectLocationSubPage;
