import Typography from "@mui/material/Typography";

const SectionSubheading = ({heading, style = {}}) => {
    return (
        <Typography
            variant="h6"
            color="grey.700"
            mb={2}
            sx={{...style, fontWeight: "normal"}}
        >
            {heading}
        </Typography>
    );
};

export default SectionSubheading;
