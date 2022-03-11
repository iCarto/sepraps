import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const SectionField = ({
    label = null,
    value = "",
    labelIcon = null,
    containerWidth = "",
    valueFontStyle = "inherit",
}) => {
    let labelWidth;
    let valueWidth;

    switch (`${containerWidth}`) {
        case "short":
            labelWidth = 5;
            valueWidth = 7;
            break;
        default:
            labelWidth = 4;
            valueWidth = 8;
            break;
    }

    const LabelIcon = labelIcon;

    return (
        <Grid container spacing={3}>
            <Grid
                item
                xs="auto"
                sm={5}
                lg={labelWidth}
                sx={{
                    display: "flex",
                    alignItems: "flex-start",
                }}
            >
                {labelIcon && (
                    <LabelIcon fontSize="small" sx={{mr: 1, color: "text.secondary"}} />
                )}
                <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{
                        lineHeight: {xs: 1.5, sm: 1.25},
                        mb: {xs: 0, sm: 1.5},
                        textTransform: "uppercase",
                        hyphens: "auto",
                    }}
                >
                    {label}
                </Typography>
            </Grid>
            <Grid item xs="auto" sm={7} lg={valueWidth}>
                <Typography
                    variant="subtitle1"
                    sx={{
                        lineHeight: {xs: 1.5, sm: 1.25},
                        mb: {xs: 0, sm: 1.5},
                        overflowWrap: "break-word",
                        fontStyle: valueFontStyle,
                    }}
                >
                    {value}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default SectionField;
