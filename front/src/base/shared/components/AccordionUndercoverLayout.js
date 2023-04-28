import {cloneElement} from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

const AccordionUndercoverLayout = ({
    accordionTitle,
    accordionIcon = null,
    children,
}) => {
    return (
        <Accordion
            disableGutters
            elevation={0}
            sx={{
                mt: 1,
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
                    aria-controls="accordion-content"
                    id="accordion-header"
                    sx={{
                        padding: "0 12px 0 6px",
                        display: "flex",
                        width: "min-content",
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
            <AccordionDetails sx={{padding: 0}}>{children}</AccordionDetails>
        </Accordion>
    );
};

export default AccordionUndercoverLayout;
