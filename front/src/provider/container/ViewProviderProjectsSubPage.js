import {useEffect, useState} from "react";
import {useOutletContext} from "react-router-dom";

import {EntityViewSubPage} from "base/entity/components/container";
import {ListProviderProjects} from "provider/container";
import {ProviderService} from "provider/service";

const ViewProviderProjectsSubPage = () => {
    let provider;
    [provider] = useOutletContext();

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        ProviderService.getProjectsList(provider.id).then(projects => {
            setProjects(projects);
        });
    }, [provider]);

    const sections = [<ListProviderProjects providerProjects={projects} />];

    return provider && <EntityViewSubPage sections={sections} />;
};

export default ViewProviderProjectsSubPage;
