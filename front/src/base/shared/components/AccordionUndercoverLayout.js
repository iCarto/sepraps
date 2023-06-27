import {styled} from "@mui/material/styles";
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
))(({theme}) => ({
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
        transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionUndercoverLayout = ({
    accordionTitle,
    defaultExpanded = false,
    children,
}) => {
    return (
        <Accordion
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
                    marginTop: "12px",
                    padding: 0,
                }}
            >
                <Typography variant="overline" component="h3">
                    {accordionTitle}
                </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{padding: 0}}>{children}</AccordionDetails>
        </Accordion>
    );
};

export default AccordionUndercoverLayout;
