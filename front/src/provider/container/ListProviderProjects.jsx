import {useState} from "react";
import {useNavigate} from "react-router-dom";

import {useList} from "base/entity/hooks";

import {PaperContainer} from "base/shared/components";
import {SectionHeading} from "base/ui/section/components";
import {EntityChangeView} from "base/entity/components/presentational";
import {ProjectsList, ProjectsTable} from "project/presentational";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const ListProviderProjects = ({providerProjects}) => {
    const [selectedElement, setSelectedElement] = useState(null);

    const navigate = useNavigate();
    const {view} = useList();

    const handleClickOnCard = projectId => {
        navigate(`info/${projectId}`);
    };

    const handleSelectProject = project => {
        setSelectedElement(project);
        navigate(`info/${project.id}`);
    };

    const getViewComponent = () => {
        if (view === "list") {
            return (
                <ProjectsList projects={providerProjects} onClick={handleClickOnCard} />
            );
        }
        return (
            <ProjectsTable
                projects={providerProjects}
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
                        <SectionHeading>
                            Proyectos del prestador de servicios
                        </SectionHeading>
                    </Grid>
                    <Grid
                        item
                        container
                        md={6}
                        sx={{mt: {xs: 2, md: 0}}}
                        justifyContent="flex-end"
                    >
                        <EntityChangeView views={["list", "table"]} />
                    </Grid>
                </Grid>

                {providerProjects.length ? (
                    getViewComponent()
                ) : (
                    <Container sx={{textAlign: "center"}}>
                        <Typography py={12} sx={{fontStyle: "italic"}}>
                            Este prestador no está asignado a ningún proyecto.
                        </Typography>
                    </Container>
                )}
            </PaperContainer>
        </>
    );
};

export default ListProviderProjects;
