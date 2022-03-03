import {useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {useNavigateWithReload} from "hooks";
import {ProjectService} from "service/api";
import {project_view_adapter} from "model";

import {SidebarPanel} from "layout";
import {ProjectForm} from "../presentational";
import Alert from "@mui/material/Alert";

const UpdateProjectPanel = () => {
    const {section} = useParams();

    const [error, setError] = useState("");
    const navigate = useNavigateWithReload();

    let project;
    [project] = useOutletContext();

    const handleSubmit = project => {
        ProjectService.updateProject(project_view_adapter({...project}))
            .then(() => {
                navigate(`/projects/${project.id}`, true);
            })
            .catch(error => {
                console.log(error);
                setError(error.toString());
            });
    };

    const handleCloseSidebar = () => {
        navigate(`/projects/${project.id}`);
    };

    let sidebarTitle = "";

    switch (section) {
        case "location":
            sidebarTitle = "Modificar infraestructura principal";
            break;
        case "financing":
            sidebarTitle = "Modificar financiador";
            break;
        default:
            sidebarTitle = "Modificar proyecto";
            break;
    }

    return (
        <SidebarPanel
            sidebarTitle={sidebarTitle}
            closeSidebarClick={handleCloseSidebar}
        >
            {error && (
                <Alert severity="error" sx={{mb: 2}}>
                    {error}
                </Alert>
            )}
            <ProjectForm section={section} onSubmit={handleSubmit} />
        </SidebarPanel>
    );
};

export default UpdateProjectPanel;
