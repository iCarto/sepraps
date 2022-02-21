import {useEffect, useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {useNavigateWithReload} from "hooks";
import {ContractService, ProjectService} from "service/api";
import {createContract} from "model";

import {SidebarPanel} from "layout";
import {ProjectSection} from "../presentational";
import {ActionsMenu, DialogLayout} from "components/common/presentational";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
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

    const handleClosePanel = () => {
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
        ContractService.updateContract(updatedContract)
            .then(() => {
                navigate(`/contracts/${id}/projects`, true);
            })
            .catch(error => {
                console.log(error);
                setError(error.toString());
            });
    };

    const headerActions = project && (
        <ActionsMenu>
            <MenuItem
                key="go-to-project"
                name="go-to-project"
                aria-label="Go to project"
                onClick={() => {
                    navigate(`/projects/${project.id}`);
                }}
            >
                <ListItemIcon>
                    <LaunchIcon />
                </ListItemIcon>
                Ir al proyecto
            </MenuItem>
            <MenuItem
                key="remove-project"
                name="remove-project"
                aria-label="Remove project"
                onClick={handleRemoveProject}
            >
                <ListItemIcon>
                    <DeleteIcon />
                </ListItemIcon>
                Quitar proyecto
            </MenuItem>
        </ActionsMenu>
    );

    return (
        <SidebarPanel>
            <Box
                width="90%"
                margin={3}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                }}
            >
                <ProjectSection project={project} headerActions={headerActions} />
                {error && (
                    <Alert severity="error" sx={{mt: 2}}>
                        {error}
                    </Alert>
                )}
            </Box>
            <Grid container justifyContent="center">
                <Button variant="contained" onClick={handleClosePanel}>
                    Cerrar
                </Button>
            </Grid>

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
