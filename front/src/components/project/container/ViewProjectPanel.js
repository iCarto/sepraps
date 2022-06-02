import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useNavigateWithReload} from "hooks";
import {ProjectService} from "service/api";

import {ProjectCard} from "../presentational";
import {SidebarPanel} from "layout";

import LaunchIcon from "@mui/icons-material/Launch";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

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

    return (
        <SidebarPanel
            sidebarTitle="Resumen del proyecto"
            closeSidebarClick={handleCloseSidebar}
        >
            {project && (
                <>
                    <ProjectCard project={project} />
                    <Grid container justifyContent="center" sx={{mt: 2}}>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ml: 3}}
                            onClick={() => navigate(`/projects/${project?.id}/summary`)}
                            startIcon={<LaunchIcon />}
                        >
                            Ir al proyecto
                        </Button>
                    </Grid>
                </>
            )}
        </SidebarPanel>
    );
};

export default ViewProjectPanel;
