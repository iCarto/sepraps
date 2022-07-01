import {ProjectCard} from ".";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

const ProjectsList = ({projects = [], onClick}) => {
    const noProjectFound = projects.length === 0 || !projects;

    const projectItems = projects.map(project => {
        return (
            <Grid item xs={12} sm={6} md={4} xl={3} key={project.id}>
                <ProjectCard project={project} onClick={onClick} />
            </Grid>
        );
    });

    return (
        <Grid container spacing={3}>
            {noProjectFound ? (
                <Container sx={{mt: 3, textAlign: "center"}}></Container>
            ) : (
                projectItems
            )}
        </Grid>
    );
};

export default ProjectsList;
