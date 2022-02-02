import Typography from "@mui/material/Typography";

const SectionTitle = props => {
    return (
        <Typography
            variant="h6"
            color="grey.700"
            sx={{textTransform: "uppercase", fontWeight: "bold"}}
        >
            {props.children}
        </Typography>
    );
};

export default SectionTitle;
