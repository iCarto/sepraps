import {useState} from "react";
import {useNavigate} from "react-router-dom";

import {useAuth} from "base/user/provider";
import {useList} from "base/entity/hooks";

import {AddNewButton, PaperContainer} from "base/shared/components";
import {SectionHeading} from "base/ui/section/components";
import {MapProjects} from "base/map/components";
import {EntityChangeView} from "base/entity/components/presentational";
import {
    ProjectSelectorDialog,
    ProjectsList,
    ProjectsTable,
} from "project/presentational";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const ListContractProjects = ({contract, projects}) => {
    const [selectedElement, setSelectedElement] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const navigate = useNavigate();
    const {view} = useList();
    const {ROLES} = useAuth();

    const handleClickOnCard = projectId => {
        navigate(`project/${projectId}`);
    };

    const handleSelectProject = project => {
        setSelectedElement(project);
        navigate(`project/${project.id}`);
    };

    const handleClickAddButton = () => {
        setIsDialogOpen(true);
    };
    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const getViewComponent = () => {
        if (view === "list") {
            return <ProjectsList projects={projects} onClick={handleClickOnCard} />;
        }
        if (view === "map") {
            return (
                <MapProjects
                    projects={projects}
                    selectedElement={selectedElement}
                    onSelectElement={handleSelectProject}
                />
            );
        }
        return (
            <ProjectsTable
                projects={projects}
                selectedElement={selectedElement}
                onSelectElement={handleSelectProject}
            />
        );
    };

    return (
        <>
            <PaperContainer justifyContent="space-between" alignItems="center">
                <Grid
                    item
                    container
                    alignItems="flex-start"
                    justifyContent="space-between"
                    sx={{flexDirection: {xs: "column", md: "row"}}}
                    mb={3}
                >
                    <Grid item md={6}>
                        <SectionHeading>Proyectos del contrato</SectionHeading>
                    </Grid>
                    <Grid item md={6} sx={{mt: {xs: 2, md: 0}}}>
                        <Stack direction="row" justifyContent="flex-end" spacing={1}>
                            {!contract.is_supervision_contract && (
                                <AddNewButton
                                    roles={[ROLES.MANAGEMENT, ROLES.SUPERVISION]}
                                    onClick={handleClickAddButton}
                                />
                            )}
                            <EntityChangeView views={["list", "table", "map"]} />
                        </Stack>
                    </Grid>
                </Grid>
                {projects.length ? (
                    getViewComponent()
                ) : (
                    <Container sx={{textAlign: "center"}}>
                        <Typography py={12} sx={{fontStyle: "italic"}}>
                            Este contrato aún no tiene proyectos asignados.
                        </Typography>
                    </Container>
                )}
            </PaperContainer>

            {isDialogOpen ? (
                <ProjectSelectorDialog
                    isDialogOpen={isDialogOpen}
                    onCloseDialog={handleCloseDialog}
                    contract={contract}
                    projects={projects}
                />
            ) : null}
        </>
    );
};

export default ListContractProjects;
