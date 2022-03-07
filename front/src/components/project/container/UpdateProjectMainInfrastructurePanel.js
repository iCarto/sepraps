import {useState} from "react";
import {useOutletContext} from "react-router-dom";
import {useNavigateWithReload} from "hooks";
import {ProjectService} from "service/api";
import {project_view_adapter} from "model";

import {SidebarPanel} from "layout";
import {ProjectForm} from "../presentational";
import Alert from "@mui/material/Alert";

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
                setError(error.toString());
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
            {error && (
                <Alert severity="error" sx={{mb: 2}}>
                    {error}
                </Alert>
            )}
            <ProjectForm section="main_infrastructure" onSubmit={handleSubmit} />
        </SidebarPanel>
    );
};

export default UpdateProjectMainInfrastructurePanel;
