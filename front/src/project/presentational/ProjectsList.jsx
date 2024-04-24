import {ProjectCard} from "project/presentational";
import {EntityNoItemsComponent} from "base/entity/components/presentational";
import Grid from "@mui/material/Grid";

const ProjectsList = ({projects = [], onClick}) => {
    const noProjectFound = projects.length === 0 || !projects;

    const projectCards = projects.map(project => {
        return (
            <Grid item xs={12} sm={6} md={4} xl={3} key={project.id}>
                <ProjectCard entity={project} onClick={onClick} />
            </Grid>
        );
    });

    return noProjectFound ? (
        <EntityNoItemsComponent />
    ) : (
        <Grid container spacing={3}>
            {projectCards}
        </Grid>
    );
};

export default ProjectsList;
