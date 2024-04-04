import {useState} from "react";
import {useNavigate} from "react-router-dom";

import {useAuth} from "base/user/provider";
import {useList} from "base/entity/hooks";

import {PaperContainer, Spinner} from "base/shared/components";
import {SectionHeading} from "base/ui/section/components";
import {EntityChangeView, EntityListMap} from "base/entity/components/presentational";
import {ProjectsList, ProjectsTable} from "project/presentational";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {AlertError} from "base/error/components";
import {discriminators, useProjectLayer} from "project/geo";
import {ProjectService} from "project/service";

const ListFinancingProgramProjects = ({
    financingProgram,
    projects,
    error = null,
    isLoading = false,
}) => {
    const [selectedElement, setSelectedElement] = useState(null);

    const navigate = useNavigate();
    const {view} = useList();
    const {ROLES} = useAuth();

    const handleClickOnCard = projectId => {
        navigate(`info/${projectId}`);
    };

    const handleSelectProject = project => {
        setSelectedElement(project);
        navigate(`info/${project.id}`);
    };

    const handleSelectMapProject = projectId => {
        // TODO: review because for table and list selected element is the project object
        // and in map is project id
        setSelectedElement(projectId);
        navigate(`info/${projectId}`);
    };

    const getViewComponent = () => {
        if (view === "list") {
            return <ProjectsList projects={projects} onClick={handleClickOnCard} />;
        }
        if (view === "map") {
            return (
                <EntityListMap
                    service={ProjectService}
                    customLoader={ProjectService.getFeatures({
                        financing_program: financingProgram.id,
                    })}
                    layerHook={useProjectLayer}
                    layerDefaultDiscriminator={discriminators.PROJECT_TYPE}
                    selectedElement={selectedElement}
                    onSelectElement={handleSelectMapProject}
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
                <AlertError error={error} />
                <Grid
                    item
                    container
                    alignItems="flex-start"
                    justifyContent="space-between"
                    sx={{flexDirection: {xs: "column", md: "row"}}}
                    mb={3}
                >
                    <Grid item md={6}>
                        <SectionHeading>Proyectos del programa</SectionHeading>
                    </Grid>
                    <Grid item md={6} sx={{mt: {xs: 2, md: 0}}}>
                        <Stack direction="row" justifyContent="flex-end" spacing={1}>
                            <EntityChangeView views={["list", "table", "map"]} />
                        </Stack>
                    </Grid>
                </Grid>
                {isLoading ? (
                    <Spinner />
                ) : projects.length ? (
                    getViewComponent()
                ) : (
                    <Container sx={{textAlign: "center"}}>
                        <Typography py={12} sx={{fontStyle: "italic"}}>
                            Este programa de financiación aún no tiene proyectos
                            asignados.
                        </Typography>
                    </Container>
                )}
            </PaperContainer>
        </>
    );
};

export default ListFinancingProgramProjects;
