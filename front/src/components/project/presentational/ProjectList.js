import PropTypes from "prop-types";

import {ProjectCard} from "./";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const ProjectList = ({projects, onClick, isSidebarPanelOpen = false}) => {
    const noProjectFound = projects.length === 0 || !projects;

    const projectItems = projects.map(project => {
        return (
            <Grid key={project.id} item xs={12} sm={6} md={4} xl={3}>
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

ProjectList.propTypes = {
    projects: PropTypes.array,
};

export default ProjectList;
