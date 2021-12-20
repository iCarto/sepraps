import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";

const ProjectCard = ({project}) => {
    return <Typography variant="body2">{project.name}</Typography>;
};

ProjectCard.propTypes = {
    project: PropTypes.object.isRequired,
};

export default ProjectCard;
