import {styled} from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";

// TO-DO: Merge with AccordionUndercoverLayout.js
const Accordion = styled(props => (
    <MuiAccordion disableGutters elevation={0} {...props} />
))(({theme}) => ({
    "&:not(:last-child)": {
        borderBottom: 0,
    },
    "&:before": {
        display: "none",
    },
}));

const AccordionSummary = styled(props => (
    <MuiAccordionSummary
        expandIcon={
            <ArrowForwardIosSharpIcon sx={{fontSize: "0.9rem", color: "#00357a"}} />
        }
        {...props}
    />
))(({theme}) => ({
    flexDirection: "row-reverse",
    backgroundColor: theme.palette.grey["50"],
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
        transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
        marginLeft: theme.spacing(1),
        marginTop: 0,
        marginBottom: 0,
    },
}));

const CollapsableListItem = ({accordionSummary, defaultExpanded = false, children}) => {
    return (
        <Accordion
            defaultExpanded={defaultExpanded}
            disableGutters
            elevation={0}
            square
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
                    padding: 0,
                    paddingLeft: 1,
                }}
            >
                {accordionSummary}
            </AccordionSummary>
            <AccordionDetails sx={{paddingX: 1}}>{children}</AccordionDetails>
        </Accordion>
    );
};

export default CollapsableListItem;
