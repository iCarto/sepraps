import styled from "@mui/material/styles/styled";
import Accordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";

const AccordionSummary = styled(props => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{fontSize: "0.9rem"}} />}
        {...props}
    />
))(() => ({
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
        transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
        margin: 0,
    },
}));

const SubmenuAccordion = ({
    handleClick,
    accordionTitle,
    expanded,
    defaultExpanded = false,
    children,
}) => {
    return (
        <Accordion
            expanded={expanded}
            defaultExpanded={defaultExpanded}
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
            <AccordionSummary
                aria-controls="accordion-content"
                id="accordion-header"
                sx={{
                    margin: 0,
                    pl: 0,
                    backgroundColor: "grey.200",
                }}
                onClick={handleClick}
            >
                <Typography
                    variant="overline"
                    component="h3"
                    sx={{textTransform: "inherit"}}
                >
                    {accordionTitle}
                </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{padding: 0}}>{children}</AccordionDetails>
        </Accordion>
    );
};

export default SubmenuAccordion;
