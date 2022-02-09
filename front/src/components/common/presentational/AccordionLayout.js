import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";

const AccordionLayout = ({accordionDetails, accordionTitle}) => {
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
                        <ArrowForwardIosSharpIcon sx={{fontSize: "1.2rem"}} />
                    </Tooltip>
                }
                aria-controls="accordion-content"
                id="accordion-header"
                sx={{
                    pl: 0,
                    flexDirection: "row-reverse",
                    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                        transform: "rotate(90deg)",
                    },
                }}
            >
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
            <AccordionDetails>{accordionDetails}</AccordionDetails>
        </Accordion>
    );
};

export default AccordionLayout;
