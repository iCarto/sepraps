import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import LabelIcon from "@mui/icons-material/Label";

const SectionHeading = ({children, icon = null}) => {
    return (
        <Grid container alignItems="center">
            <LabelIcon sx={{color: theme => theme.palette["grey"]["300"], mr: 1}} />
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
