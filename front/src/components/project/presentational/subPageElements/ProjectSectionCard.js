import PropTypes from "prop-types";

import Paper from "@mui/material/Paper";

const ProjectSectionCard = props => {
    return (
        <Paper
            sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
            }}
        >
            {props.children}
        </Paper>
    );
};

ProjectSectionCard.propTypes = {
    children: PropTypes.node,
};

export default ProjectSectionCard;
