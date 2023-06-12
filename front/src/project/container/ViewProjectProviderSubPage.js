import {useOutletContext} from "react-router-dom";

import {ProjectProviderSection} from "project/presentational/section";
import {EntityViewSubPage} from "base/entity/components/container";

const ViewProjectProviderSubPage = () => {
    let project;
    [project] = useOutletContext();

    const sections = [<ProjectProviderSection project={project} />];

    return project && <EntityViewSubPage sections={sections} />;
};

export default ViewProjectProviderSubPage;
