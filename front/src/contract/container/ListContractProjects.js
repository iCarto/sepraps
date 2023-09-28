import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "base/user/provider";
import {AuthAction} from "base/user/components";

import {ProjectsList, ProjectsTable} from "project/presentational";
import {SectionHeading} from "base/ui/section/components";
import {MapProjects} from "base/map/components";
import {
    EntityAddButtonGroup,
    EntityChangeView,
} from "base/entity/components/presentational";

import {PaperContainer} from "base/shared/components";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {useList} from "base/entity/hooks";

const ListContractProjects = ({projects}) => {
    const [selectedElement, setSelectedElement] = useState(null);

    const navigate = useNavigate();
    const {view} = useList();
    const {ROLES} = useAuth();

    const handleClickOnCard = projectId => {
        navigate(`project/${projectId}`);
    };

    const onSelectProject = project => {
        setSelectedElement(project);
        navigate(`project/${project.id}`);
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
                    onSelectElement={onSelectProject}
                />
            );
        }
        return (
            <ProjectsTable
                projects={projects}
                selectedElement={selectedElement}
                onSelectElement={onSelectProject}
            />
        );
    };

    return (
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
                        <AuthAction roles={[ROLES.MANAGEMENT, ROLES.SUPERVISION]}>
                            <EntityAddButtonGroup />
                        </AuthAction>
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
    );
};

export default ListContractProjects;
