import {cloneElement} from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AccordionLayout = ({accordionTitle, accordionIcon = null, children}) => {
    return (
        <Accordion
            disableGutters
            elevation={0}
            sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                "&:before": {
                    display: "none",
                },
            }}
        >
            <Tooltip title="Desplegar/Ocultar" followCursor>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="accordion-content"
                    id="accordion-header"
                    sx={{
                        display: "flex",
                        padding: 0,
                        borderBottom: "1px solid #ccc",
                        "& .MuiAccordionSummary-content": {
                            alignItems: "center",
                        },
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
            </Tooltip>
            <AccordionDetails sx={{pb: 0}}>{children}</AccordionDetails>
        </Accordion>
    );
};

export default AccordionLayout;
