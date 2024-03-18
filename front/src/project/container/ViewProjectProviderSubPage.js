import {useOutletContext} from "react-router-dom";

import {ViewOrUpdateProjectProviderContent} from ".";
import {EntityViewSubPage} from "base/entity/components/container";

const ViewProjectProviderSubPage = () => {
    let project;
    [project] = useOutletContext();

    const sections = [<ViewOrUpdateProjectProviderContent project={project} />];

    return project && <EntityViewSubPage sections={sections} />;
};

export default ViewProjectProviderSubPage;
