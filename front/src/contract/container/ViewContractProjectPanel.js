import {useEffect, useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {useNavigateWithReload} from "base/navigation/hooks";

import {ContractService} from "contract/service";
import {ProjectService} from "project/service";
import {contract_view_adapter, createContract} from "contract/model";
import {SidebarPanelLayout, SidebarRemoveAction} from "base/ui/sidebar";

import {RemoveItemDialog} from "base/delete/components";
import {ProjectSection} from "project/presentational/section";
import {AlertError} from "base/error/components";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import LaunchIcon from "@mui/icons-material/Launch";

const ViewContractProjectPanel = () => {
    const navigate = useNavigateWithReload();
    const [project, setProject] = useState(null);
    const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
    const [error, setError] = useState("");

    let contract;
    [contract] = useOutletContext();

    const {idInfoPanel: projectId} = useParams();
    const {id: contractId} = useParams();

    useEffect(() => {
        ProjectService.get(projectId).then(project => {
            setProject(project);
        });
    }, [projectId]);

    const handleCloseSidebar = () => {
        navigate(`/contracts/list/${contractId}/projects`);
    };

    const handleClickDetail = () => {
        navigate(`/projects/list/${project?.id}`);
    };

    const handleClickRemove = () => {
        setIsRemoveDialogOpen(true);
    };

    const handleRemove = () => {
        const removedIndex = contract.projects.findIndex(
            project => project.id === parseInt(projectId)
        );
        const newContractProjects = contract.projects;
        newContractProjects.splice(removedIndex, 1);
        const updatedContract = createContract({
            ...contract,
            projects: newContractProjects,
        });
        ContractService.update(contract_view_adapter({...updatedContract}))
            .then(() => {
                navigate(`/contracts/list/${contractId}/projects`, true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    return (
        <SidebarPanelLayout
            sidebarTitle="Datos básicos del proyecto"
            closeSidebarClick={handleCloseSidebar}
            sidebarActions={[<SidebarRemoveAction onClick={handleClickRemove} />]}
        >
            <AlertError error={error} />
            {project && <ProjectSection project={project} />}

            <Grid container justifyContent="center" sx={{mt: 2}}>
                <Button
                    variant="contained"
                    color="inherit"
                    sx={{ml: 3}}
                    onClick={handleClickDetail}
                    startIcon={<LaunchIcon />}
                >
                    Ir al detalle
                </Button>
            </Grid>
            <RemoveItemDialog
                isDialogOpen={isRemoveDialogOpen}
                setIsDialogOpen={setIsRemoveDialogOpen}
                onRemove={handleRemove}
            />
        </SidebarPanelLayout>
    );
};

export default ViewContractProjectPanel;
