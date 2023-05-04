import {useState} from "react";
import {useNavigate, useOutletContext} from "react-router-dom";
import {useAuth} from "base/user/provider";
import {AuthAction} from "base/user/components";

import {EntityViewSubPage} from "base/entity/pages";
import {useProjectListView} from "project/provider";
import {
    ProjectsList,
    ProjectListChangeView,
    ProjectsTable,
} from "project/presentational";
import {SectionHeading} from "base/section/components";
import {MapProjects} from "base/map/components";
import {EntityAddButtonGroup} from "base/entity/components";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const ViewContractProjectsSubPage = () => {
    const {ROLES} = useAuth();

    let contract;
    [contract] = useOutletContext();

    const [selectedElement, setSelectedElement] = useState(null);

    const {view} = useProjectListView();

    const navigate = useNavigate();

    const handleClickOnCard = projectId => {
        navigate(`project/${projectId}`);
    };

    const onSelectProject = project => {
        setSelectedElement(project);
        navigate(`project/${project.id}`);
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
                <ProjectsList
                    projects={contract.projects}
                    onClick={handleClickOnCard}
                />
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

    const sections = [
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
                            <EntityAddButtonGroup />
                        </AuthAction>
                        <ProjectListChangeView />
                    </Stack>
                </Grid>
            </Grid>
            {contract.projects.length ? (
                getViewComponent(view)
            ) : (
                <Container sx={{textAlign: "center"}}>
                    <Typography py={12} sx={{fontStyle: "italic"}}>
                        Este contrato aún no tiene proyectos asignados.
                    </Typography>
                </Container>
            )}
        </Paper>,
    ];

    return contract && <EntityViewSubPage sections={sections} />;
};

export default ViewContractProjectsSubPage;
