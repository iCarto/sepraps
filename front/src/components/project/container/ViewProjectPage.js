import {useState, useEffect} from "react";
import {Outlet, useLocation, useParams} from "react-router-dom";
import {ProjectService} from "service/api";

import {PageWithMenuLayout} from "layout";
import {ProjectMenu} from "../presentational";
import {LocationProvider} from "components/common/provider";

const ViewProjectPage = () => {
    const {projectId} = useParams();
    const [project, setProject] = useState(null);
    const location = useLocation();

    useEffect(() => {
        ProjectService.getProject(projectId).then(data => {
            setProject(data);
        });
    }, [projectId, location.state?.lastRefreshDate]);

    return (
        <PageWithMenuLayout menu={<ProjectMenu project={project} />}>
            <LocationProvider>
                {project && <Outlet context={[project]} />}
            </LocationProvider>
        </PageWithMenuLayout>
    );
};

export default ViewProjectPage;
