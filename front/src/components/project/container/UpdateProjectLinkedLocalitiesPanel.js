import {useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {useNavigateWithReload} from "hooks";
import {ProjectService} from "service/api";
import {project_view_adapter} from "model";

import {SidebarPanel} from "layout";
import {ProjectLinkedLocalitiesForm} from "../presentational/location";
import Alert from "@mui/material/Alert";

const UpdateProjectLinkedLocalitiesPanel = () => {
    const [error, setError] = useState("");
    const {action, localityCode} = useParams();
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

    const selectedLocality =
        action === "edit"
            ? project.linked_localities.find(
                  linked_locality => linked_locality.code === localityCode
              )
            : null;

    return (
        <SidebarPanel
            sidebarTitle={
                project.linked_localities.length !== 0
                    ? "Modificar localidad"
                    : "Añadir localidad"
            }
            closeSidebarClick={handleCloseSidebar}
        >
            {error && (
                <Alert severity="error" sx={{mb: 2}}>
                    {error}
                </Alert>
            )}
            <ProjectLinkedLocalitiesForm
                project={project}
                onSubmit={handleSubmit}
                locality={selectedLocality}
            />
        </SidebarPanel>
    );
};

export default UpdateProjectLinkedLocalitiesPanel;
