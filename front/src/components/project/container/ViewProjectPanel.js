import {useEffect, useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {useNavigateWithReload} from "hooks";
import {ProjectService} from "service/api";

import {ProjectSection} from "../presentational";
import {SidebarAction, SidebarPanel} from "layout";

import LaunchIcon from "@mui/icons-material/Launch";

const ViewProjectPanel = () => {
    const navigate = useNavigateWithReload();
    const [project, setProject] = useState(null);

    const {projectId} = useParams();

    useEffect(() => {
        ProjectService.getProject(projectId).then(project => {
            setProject(project);
        });
    }, [projectId]);

    const handleCloseSidebar = () => {
        navigate(`/projects`);
    };

    const sidebarActions = project
        ? [
              <SidebarAction
                  key="go-to"
                  name="go to project"
                  text="Ir al proyecto"
                  icon={<LaunchIcon />}
                  onClick={() => {
                      navigate(`/projects/${project.id}`);
                  }}
              />,
          ]
        : null;

    return (
        <SidebarPanel
            sidebarTitle="Resumen del proyecto"
            sidebarActions={sidebarActions}
            closeSidebarClick={handleCloseSidebar}
        >
            <ProjectSection project={project} />
        </SidebarPanel>
    );
};

export default ViewProjectPanel;
