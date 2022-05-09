import {useEffect, useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {useNavigateWithReload} from "hooks";
import {ContractService, ProjectService} from "service/api";
import {contract_view_adapter} from "model";

import {ProjectSection} from "../../project/presentational";
import {SidebarAction, SidebarPanel} from "layout";
import {RemoveContractProjectDialog} from ".";

import Alert from "@mui/material/Alert";
import LaunchIcon from "@mui/icons-material/Launch";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const ViewContractProjectPanel = () => {
    const navigate = useNavigateWithReload();
    const [project, setProject] = useState(null);
    const [projectToRemove, setProjectToRemove] = useState(null);
    const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
    const [error, setError] = useState("");

    let contract;
    [contract] = useOutletContext();

    const {projectId} = useParams();
    const {id: contractId} = useParams();

    useEffect(() => {
        ProjectService.getProject(projectId).then(project => {
            setProject(project);
        });
    }, [projectId]);

    const handleCloseSidebar = () => {
        navigate(`/contracts/${contractId}/projects`);
    };

    const handleRemoveProject = () => {
        setProjectToRemove(project.id);
        setIsRemoveDialogOpen(true);
    };

    const handleUpdateContract = updatedContract => {
        ContractService.updateContract(contract_view_adapter({...updatedContract}))
            .then(() => {
                navigate(`/contracts/${contractId}/projects`, true);
            })
            .catch(error => {
                console.log(error);
                setError(error.toString());
            });
    };

    const sidebarActions = project
        ? [
              <SidebarAction
                  key="remove"
                  name="remove-project"
                  text="Quitar proyecto"
                  icon={<LinkOffIcon />}
                  onClick={handleRemoveProject}
              />,
          ]
        : null;

    return (
        <>
            <SidebarPanel
                sidebarTitle="Datos básicos del proyecto"
                sidebarActions={sidebarActions}
                closeSidebarClick={handleCloseSidebar}
            >
                {error ? (
                    <Alert severity="error" sx={{mb: 2}}>
                        {error}
                    </Alert>
                ) : null}
                <ProjectSection project={project} />
                <Grid container justifyContent="center" sx={{mt: 2}}>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ml: 3}}
                        onClick={() => navigate(`/projects/${project?.id}`)}
                        startIcon={<LaunchIcon />}
                    >
                        Ir al proyecto
                    </Button>
                </Grid>
            </SidebarPanel>
            <RemoveContractProjectDialog
                projectToRemove={projectToRemove}
                contract={contract}
                onRemoval={handleUpdateContract}
                isDialogOpen={isRemoveDialogOpen}
                setIsDialogOpen={setIsRemoveDialogOpen}
            />
        </>
    );
};

export default ViewContractProjectPanel;
