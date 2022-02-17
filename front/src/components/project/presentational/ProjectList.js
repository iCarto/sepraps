import PropTypes from "prop-types";

import {ProjectCard} from "./";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const ProjectList = ({projects}) => {
    const noProjectFound = projects.length === 0 || !projects;

    const projectItems = projects.map(project => {
        return <ProjectCard key={project.id} project={project} />;
    });
    return (
        <Grid
            component="ul"
            container
            spacing={3}
            sx={{display: "flex", justifyContent: "left", p: 0, listStyleType: "none"}}
        >
            {noProjectFound ? (
                <Container sx={{mt: 3, textAlign: "center"}}>
                    <Typography variant="h5">
                        Lo sentimos, no se han encontrado proyectos que coincidan con su
                        búsqueda.
                    </Typography>
                    <Typography variant="h5">
                        Introduzca otro texto para buscar de nuevo.
                    </Typography>
                </Container>
            ) : (
                projectItems
            )}
        </Grid>
    );
};

ProjectList.propTypes = {
    projects: PropTypes.array,
};

export default ProjectList;
