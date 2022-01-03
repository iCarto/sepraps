import PropTypes from "prop-types";

import Typography from "@mui/material/Typography";

const ProjectSectionTitle = props => {
    return (
        <Typography
            component="h2"
            variant="h6"
            color="primary"
            gutterBottom
            sx={{textTransform: "uppercase"}}
        >
            {props.children}
        </Typography>
    );
};

ProjectSectionTitle.propTypes = {
    children: PropTypes.node,
};

export default ProjectSectionTitle;
