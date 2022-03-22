import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {cloneElement} from "react";
import Grid from "@mui/material/Grid";

const AccordionLayout = ({accordionTitle, accordionIcon = null, children}) => {
    return (
        <Accordion
            disableGutters
            elevation={0}
            sx={{
                "&:before": {
                    display: "none",
                },
                borderBottom: "1px solid #ccc",
                borderRadius: "0px !important",
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
                    p: 0,
                }}
            >
                <Grid container alignItems="center">
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
                            textTransform: "uppercase",
                        }}
                    >
                        {accordionTitle}
                    </Typography>
                </Grid>
            </AccordionSummary>
            <AccordionDetails sx={{pb: 0}}>{children}</AccordionDetails>
        </Accordion>
    );
};

export default AccordionLayout;
