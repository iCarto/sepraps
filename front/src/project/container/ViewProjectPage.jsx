import {useState, useEffect} from "react";
import {useLocation, useParams} from "react-router-dom";

import {NotificationService} from "notification/service";
import {ProjectService} from "project/service";
import {useConfigModule} from "base/ui/module/provider";

import {PageLayout} from "base/ui/main";
import {ProjectSubPageMenu} from "project/menu";

const ViewProjectPage = () => {
    const {id} = useParams();

    const [project, setProject] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const location = useLocation();

    const {addToModuleFilter, setModuleBasePath} = useConfigModule();

    useEffect(() => {
        setProject(null);
        setModuleBasePath(`/projects/list/${id}`);
        ProjectService.get(id)
            .then(data => {
                addToModuleFilter({project: data.id});
                setProject(data);
            })
            .catch(error => console.log(error));
        NotificationService.get({project: id})
            .then(data => {
                setNotifications(data);
            })
            .catch(error => console.log(error));
    }, [id, location.state?.lastRefreshDate]);

    return (
        <PageLayout
            menu={<ProjectSubPageMenu project={project} />}
            context={[project, notifications]}
            subPage={true}
        />
    );
};

export default ViewProjectPage;
