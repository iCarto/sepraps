import {useState, useEffect} from "react";
import {useLocation, useParams} from "react-router-dom";

import {ProjectService} from "project/service";
import {useConfigModule} from "base/ui/module/provider";

import {PageLayout} from "base/ui/main";
import {ProjectSubPageMenu} from "project/menu";

const ViewProjectPage = () => {
    const {id} = useParams();
    const [project, setProject] = useState(null);
    const location = useLocation();

    const {addToModuleFilter, setModuleBasePath} = useConfigModule();

    useEffect(() => {
        setProject(null);
        setModuleBasePath(`/projects/${id}`);
        ProjectService.get(id).then(data => {
            addToModuleFilter({project: data.id});
            setProject(data);
        });
    }, [id, location.state?.lastRefreshDate]);

    return (
        <PageLayout
            menu={<ProjectSubPageMenu project={project} />}
            context={[project]}
            subPage={true}
        />
    );
};

export default ViewProjectPage;
