import PropTypes from "prop-types";

import Typography from "@mui/material/Typography";

const SectionTitle = props => {
    return (
        <Typography
            component="h2"
            variant="h6"
            color="grey.700"
            gutterBottom
            sx={{textTransform: "uppercase", fontWeight: "bold", mb: {md: 1, lg: 2}}}
        >
            {props.children}
        </Typography>
    );
};

SectionTitle.propTypes = {
    children: PropTypes.node,
};

export default SectionTitle;
