import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useNavigateWithReload} from "base/navigation/hooks";

import {ProjectService} from "project/service";
import {SidebarPanelLayout} from "base/ui/sidebar";
import {ProjectSection} from "project/presentational/section";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import LaunchIcon from "@mui/icons-material/Launch";

const ViewProviderProjectPanel = () => {
    const navigate = useNavigateWithReload();
    const [project, setProject] = useState(null);

    const {idInfoPanel: projectId} = useParams();
    const {id: providerId} = useParams();

    useEffect(() => {
        ProjectService.get(projectId).then(project => {
            setProject(project);
        });
    }, [projectId]);

    const handleCloseSidebar = () => {
        navigate(`/providers/list/${providerId}/projects`);
    };

    const handleClickDetail = () => {
        navigate(`/projects/list/${project?.id}`);
    };

    return (
        <SidebarPanelLayout
            sidebarTitle="Datos básicos del proyecto"
            closeSidebarClick={handleCloseSidebar}
        >
            {project && <ProjectSection project={project} />}

            <Grid container justifyContent="center" sx={{mt: 2}}>
                <Button
                    variant="contained"
                    sx={{ml: 3}}
                    onClick={handleClickDetail}
                    startIcon={<LaunchIcon />}
                >
                    Ver detalle
                </Button>
            </Grid>
        </SidebarPanelLayout>
    );
};

export default ViewProviderProjectPanel;
