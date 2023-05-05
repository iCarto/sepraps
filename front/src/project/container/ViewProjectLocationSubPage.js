import {useOutletContext} from "react-router-dom";

import {
    ProjectInfrastructureSection,
    ProjectLinkedLocalitiesSection,
    ProjectProviderSection,
} from "project/presentational/section";

import {EntityViewSubPage} from "base/entity/pages";

const ViewProjectLocationSubPage = () => {
    let project;
    [project] = useOutletContext();

    const sections = [
        <ProjectInfrastructureSection project={project} />,
        <ProjectProviderSection project={project} />,
        <ProjectLinkedLocalitiesSection project={project} />,
    ];

    return project && <EntityViewSubPage sections={sections} />;
};

export default ViewProjectLocationSubPage;
