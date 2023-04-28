import {useState, useEffect} from "react";
import {Outlet, useLocation, useParams} from "react-router-dom";
import {ProjectService} from "project/service";

import {PageWithMenuLayout} from "base/ui/main";
import {ProjectSubPageMenu} from "project/menu";
import {LocationProvider} from "sepraps/location/provider";

const ViewProjectPage = () => {
    const {projectId} = useParams();
    const [project, setProject] = useState(null);
    const location = useLocation();

    useEffect(() => {
        ProjectService.get(projectId).then(data => {
            setProject(data);
        });
    }, [projectId, location.state?.lastRefreshDate]);

    return (
        <PageWithMenuLayout menu={<ProjectSubPageMenu project={project} />}>
            <LocationProvider>
                {project && <Outlet context={[project]} />}
            </LocationProvider>
        </PageWithMenuLayout>
    );
};

export default ViewProjectPage;
