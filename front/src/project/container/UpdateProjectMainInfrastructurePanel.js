import {useState} from "react";
import {useOutletContext} from "react-router-dom";
import {useNavigateWithReload} from "base/navigation/hooks";
import {ProjectService} from "project/service";
import {project_view_adapter} from "project/model";

import {SidebarPanel} from "base/ui/sidebar";
import {ProjectForm} from "project/presentational/form";
import {AlertError} from "base/error/components";

const UpdateProjectMainInfrastructurePanel = () => {
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
            sidebarTitle="Modificar infraestructura principal"
            closeSidebarClick={handleCloseSidebar}
        >
            <AlertError error={error} />
            <ProjectForm
                updatedSection="main_infrastructure"
                onSubmit={handleSubmit}
                project={project}
            />
        </SidebarPanel>
    );
};

export default UpdateProjectMainInfrastructurePanel;
