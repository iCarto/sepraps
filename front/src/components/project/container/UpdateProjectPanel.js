import {useState} from "react";
import {useOutletContext} from "react-router-dom";
import {useNavigateWithReload} from "hooks";
import {ProjectService} from "service/api";
import {project_view_adapter} from "model";

import {SidebarPanel} from "layout";
import {ProjectForm} from "../presentational";
import {AlertError} from "components/common/presentational";

const UpdateProjectPanel = () => {
    const [error, setError] = useState("");
    const navigate = useNavigateWithReload();

    let project;
    [project] = useOutletContext();

    const handleSubmit = project => {
        ProjectService.updateProject(project_view_adapter({...project}))
            .then(() => {
                navigate(`/projects/${project.id}/summary`, true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    const handleCloseSidebar = () => {
        navigate(`/projects/${project.id}/summary`);
    };

    return (
        <SidebarPanel
            sidebarTitle="Modificar proyecto"
            closeSidebarClick={handleCloseSidebar}
        >
            <AlertError error={error} />
            <ProjectForm
                updatedSection="generaldata"
                onSubmit={handleSubmit}
                project={project}
            />
        </SidebarPanel>
    );
};

export default UpdateProjectPanel;
