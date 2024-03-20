import {useOutletContext} from "react-router-dom";

import {EntityViewSubPage} from "base/entity/components/container";
import {ListProviderProjects} from "provider/container";

const ViewProviderProjectsSubPage = () => {
    let provider;
    [provider] = useOutletContext();

    const sections = [<ListProviderProjects providerProjects={provider.projects} />];

    return provider && <EntityViewSubPage sections={sections} />;
};

export default ViewProviderProjectsSubPage;
