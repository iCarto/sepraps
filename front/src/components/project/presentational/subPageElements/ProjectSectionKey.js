import PropTypes from "prop-types";

import Typography from "@mui/material/Typography";

const ProjectSectionKey = props => {
    return (
        <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{
                mr: {xs: 1, md: 3},
                textTransform: "uppercase",
            }}
        >
            {props.children}
        </Typography>
    );
};

ProjectSectionKey.propTypes = {
    children: PropTypes.node,
};

export default ProjectSectionKey;
