import {styled, useTheme} from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";

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
    },
}));

const AccordionUndercoverLayout = ({
    accordionTitle,
    defaultExpanded = false,
    children,
}) => {
    const theme = useTheme();

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
                    marginTop: "12px",
                    padding: 0,
                    paddingLeft: 1,
                }}
            >
                <Typography
                    variant="overline"
                    component="h3"
                    sx={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: theme.palette.primary.dark,
                    }}
                >
                    {accordionTitle}
                </Typography>
            </AccordionSummary>
            <AccordionDetails
                sx={{paddingX: 1, border: `1px solid ${theme.palette.grey["50"]}`}}
            >
                {children}
            </AccordionDetails>
        </Accordion>
    );
};

export default AccordionUndercoverLayout;
