import PropTypes from "prop-types";

import {SectionTitle} from ".";
import Paper from "@mui/material/Paper";

const SectionCard = ({title, ...props}) => {
    return (
        <Paper
            sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                overflow: "auto",
                textOverflow: "ellipsis",
            }}
        >
            <SectionTitle>{title}</SectionTitle>
            {props.children}
        </Paper>
    );
};

SectionCard.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
};

export default SectionCard;
