import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {cloneElement} from "react";

const AccordionLayout = ({accordionTitle, accordionIcon = null, children}) => {
    return (
        <Accordion
            disableGutters
            elevation={0}
            sx={{
                "&:before": {
                    display: "none",
                },
            }}
        >
            <AccordionSummary
                expandIcon={
                    <Tooltip title="Clic para desplegar">
                        <ExpandMoreIcon />
                    </Tooltip>
                }
                aria-controls="accordion-content"
                id="accordion-header"
                sx={{
                    borderBottom: "1px solid #ccc",
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                }}
            >
                {accordionIcon &&
                    cloneElement(accordionIcon, {
                        fontSize: "small",
                        sx: {color: "text.secondary"},
                    })}
                <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{
                        pl: 1,
                        lineHeight: 1,
                        textTransform: "uppercase",
                    }}
                >
                    {accordionTitle}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>{children}</AccordionDetails>
        </Accordion>
    );
};

export default AccordionLayout;
