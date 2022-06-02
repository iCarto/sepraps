import {useState} from "react";
import {useNavigate, useOutletContext} from "react-router-dom";
import {AuthAction, useAuth} from "auth";

import {useProjectListView} from "components/project/provider";
import {SubPageLayout} from "layout";
import {
    AddProjectButton,
    ProjectList,
    ProjectListChangeView,
    ProjectsTable,
} from "components/project/presentational";
import {SectionHeading} from "components/common/presentational";
import {MapProjects} from "components/common/geo";

import Paper from "@mui/material/Paper";
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
                <Stack direction="row" justifyContent="space-between" sx={{mb: 3}}>
                    <SectionHeading>Proyectos del contrato</SectionHeading>
                    <Stack
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                    >
                        <AuthAction roles={[ROLES.EDIT, ROLES.MANAGEMENT]}>
                            <AddProjectButton
                                basePath={`/contracts/${contract.id}/projects`}
                            />
                        </AuthAction>
                        <ProjectListChangeView />
                    </Stack>
                </Stack>
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
