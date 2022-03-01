import {useEffect, useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {useNavigateWithReload} from "hooks";
import {ContractService, ProjectService} from "service/api";
import {contract_view_adapter, createContract} from "model";

import {SidebarAction, SidebarPanel} from "layout";
import {ProjectSection} from "../presentational";
import {DialogLayout} from "components/common/presentational";

import Alert from "@mui/material/Alert";
import DeleteIcon from "@mui/icons-material/Delete";
import LaunchIcon from "@mui/icons-material/Launch";

const ViewProjectPanel = () => {
    const navigate = useNavigateWithReload();
    const [project, setProject] = useState(null);
    const [projectToRemove, setProjectToRemove] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [error, setError] = useState("");

    let contract;
    [contract] = useOutletContext();

    const {projectId} = useParams();
    const {id} = useParams();

    useEffect(() => {
        ProjectService.getProject(projectId).then(project => {
            setProject(project);
        });
    }, [projectId]);

    const handleCloseSidebar = () => {
        navigate(`/contracts/${id}/projects`);
    };

    const handleDialog = isOpen => {
        setIsDialogOpen(isOpen);
    };

    const handleRemoveProject = () => {
        setProjectToRemove(project.id);
        setIsDialogOpen(true);
    };

    const handleConfirmRemoval = () => {
        let projectToRemoveIndex = contract.projects.findIndex(
            project => project.id === projectToRemove
        );

        contract.projects.splice(projectToRemoveIndex, 1);

        const updatedContract = createContract({
            ...contract,
            projects: [...contract.projects],
        });

        handleUpdateContract(updatedContract);
        setIsDialogOpen(false);
    };

    const handleUpdateContract = updatedContract => {
        ContractService.updateContract(contract_view_adapter({...updatedContract}))
            .then(() => {
                navigate(`/contracts/${id}/projects`, true);
            })
            .catch(error => {
                console.log(error);
                setError(error.toString());
            });
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
              <SidebarAction
                  key="remove"
                  name="remove-project"
                  text="Quitar proyecto"
                  icon={<DeleteIcon />}
                  onClick={handleRemoveProject}
              />,
          ]
        : null;

    return (
        <SidebarPanel
            sidebarTitle="Datos básicos del proyecto"
            sidebarActions={sidebarActions}
            closeSidebarClick={handleCloseSidebar}
        >
            {error && (
                <Alert severity="error" sx={{mb: 2}}>
                    {error}
                </Alert>
            )}
            <ProjectSection project={project} />
            <DialogLayout
                dialogLabel="Remove project"
                dialogTitle="¿Quiere quitar este proyecto del contrato?"
                dialogContentText="Si hace clic en Quitar, el proyecto se borrará de la lista de proyectos de este contrato."
                mainActionClick={handleConfirmRemoval}
                mainActionText="Quitar"
                handleDialog={handleDialog}
                isDialogOpen={isDialogOpen}
            />
        </SidebarPanel>
    );
};

export default ViewProjectPanel;
