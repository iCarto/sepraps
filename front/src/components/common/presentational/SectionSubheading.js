import Typography from "@mui/material/Typography";

const SectionSubheading = ({heading}) => {
    return (
        <Typography variant="h6" color="grey.700" mb={2}>
            {heading}
        </Typography>
    );
};

export default SectionSubheading;
