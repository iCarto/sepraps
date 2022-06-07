import {useState} from "react";
import {useOutletContext} from "react-router-dom";
import {useNavigateWithReload} from "hooks";
import {ProjectService} from "service/api";
import {project_view_adapter} from "model";

import {SidebarPanel} from "layout";
import {ProjectLinkedLocalitiesForm} from "../presentational/location";
import {AlertError} from "components/common/presentational";

const AddProjectLinkedLocalitiesPanel = () => {
    const [error, setError] = useState("");
    const navigate = useNavigateWithReload();

    let project;
    [project] = useOutletContext();

    const handleSubmit = project => {
        ProjectService.updateProject(project_view_adapter({...project}))
            .then(() => {
                navigate(`/projects/${project.id}/location`, true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    const handleCloseSidebar = () => {
        navigate(`/projects/${project.id}/location`);
    };

    return (
        <SidebarPanel
            sidebarTitle="Añadir otra localidad"
            closeSidebarClick={handleCloseSidebar}
        >
            <AlertError error={error} />
            <ProjectLinkedLocalitiesForm project={project} onSubmit={handleSubmit} />
        </SidebarPanel>
    );
};

export default AddProjectLinkedLocalitiesPanel;
