import Typography from "@mui/material/Typography";

const SectionHeading = ({children}) => {
    return (
        <Typography
            variant="h6"
            color="grey.700"
            sx={{textTransform: "uppercase", fontWeight: "bold"}}
        >
            {children}
        </Typography>
    );
};

export default SectionHeading;
