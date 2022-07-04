import {useState} from "react";
import {useNavigate, useOutletContext} from "react-router-dom";
import {AuthAction, useAuth} from "auth";

import {useProjectListView} from "components/project/provider";
import {SubPageLayout} from "layout";
import {
    ProjectList,
    ProjectListChangeView,
    ProjectsTable,
} from "components/project/presentational";
import {SectionHeading} from "components/common/presentational";
import {MapProjects} from "components/common/geo";
import {AddContractProjectButtonGroup} from "../presentational";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const ViewContractProjectsSubPage = () => {
    const {ROLES} = useAuth();

    let contract;
    [contract] = useOutletContext();

    const [selectedElement, setSelectedElement] = useState(null);
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

    const {view} = useProjectListView();

    const navigate = useNavigate();

    const handleClickOnCard = projectId => {
        navigate(`project/${projectId}`);
    };

    const onSelectProject = project => {
        setSelectedElement(project);
        navigate(`project/${project.id}`);
    };

    const getIsSidePanelOpen = isOpen => {
        setIsSidePanelOpen(isOpen);
    };

    const getViewComponent = view => {
        if (view === "map") {
            return (
                <MapProjects
                    projects={contract.projects}
                    selectedElement={selectedElement}
                    onSelectElement={onSelectProject}
                />
            );
        }
        if (view === "list") {
            return (
                <ProjectList projects={contract.projects} onClick={handleClickOnCard} />
            );
        }
        return (
            <ProjectsTable
                projects={contract.projects}
                selectedElement={selectedElement}
                onSelectElement={onSelectProject}
            />
        );
    };

    return (
        <SubPageLayout
            outletContext={[contract]}
            getIsSidePanelOpen={getIsSidePanelOpen}
            isSidePanelOpen={isSidePanelOpen}
        >
            <Paper sx={{p: 3}}>
                <Grid
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
                            <AuthAction roles={[ROLES.MANAGEMENT, ROLES.SUPERVISION]}>
                                <AddContractProjectButtonGroup />
                            </AuthAction>
                            <ProjectListChangeView />
                        </Stack>
                    </Grid>
                </Grid>
                {contract.projects.length !== 0 ? (
                    getViewComponent(view)
                ) : (
                    <Container sx={{textAlign: "center"}}>
                        <Typography py={12} sx={{fontStyle: "italic"}}>
                            Este contrato aún no tiene proyectos asignados.
                        </Typography>
                    </Container>
                )}
            </Paper>
        </SubPageLayout>
    );
};

export default ViewContractProjectsSubPage;
