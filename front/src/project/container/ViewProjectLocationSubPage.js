import {useOutletContext} from "react-router-dom";

import {EntityViewSubPage} from "base/entity/components/container";
import {
    ViewOrUpdateProjectInfrastructureContent,
    ViewOrUpdateProjectLinkedLocalitiesContent,
} from ".";

const ViewProjectLocationSubPage = () => {
    let project;
    [project] = useOutletContext();

    const sections = [
        <ViewOrUpdateProjectInfrastructureContent project={project} />,
        <ViewOrUpdateProjectLinkedLocalitiesContent project={project} />,
    ];

    return project && <EntityViewSubPage sections={sections} />;
};

export default ViewProjectLocationSubPage;
