import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LabelIcon from "@mui/icons-material/Label";

const SectionHeading = ({children, label = true}) => {
    return (
        <Grid
            container
            sx={{display: "flex", flexDirection: "row", flexWrap: "noWrap"}}
        >
            {label && (
                <LabelIcon
                    sx={{color: theme => theme.palette["grey"]["300"], mr: 1, mt: 0.5}}
                />
            )}
            <Typography
                variant="h6"
                color="grey.700"
                sx={{textTransform: "uppercase", fontWeight: "bold"}}
            >
                {children}
            </Typography>
        </Grid>
    );
};

export default SectionHeading;
