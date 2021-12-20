import PropTypes from "prop-types";
import {ProjectCard} from ".";
import Grid from "@mui/material/Grid";

const ProjectList = ({projects}) => {
    const projectItems = projects.map(project => {
        return <ProjectCard key={project.id} project={project} />;
    });
    return (
        <Grid component="ul" container spacing={3} sx={{padding: 0}}>
            {projectItems}
        </Grid>
    );
};

ProjectList.propTypes = {
    projects: PropTypes.array,
};

export default ProjectList;
