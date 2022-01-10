import PropTypes from "prop-types";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const SectionField = ({label, value, labelIcon, containerWidth}) => {
    let labelWidth;
    let valueWidth;

    switch (`${containerWidth}`) {
        case "short":
            labelWidth = 6;
            valueWidth = 6;
            break;
        default:
            labelWidth = 3;
            valueWidth = 9;
            break;
    }

    const LabelIcon = labelIcon;
    return (
        <Grid container spacing={1}>
            <Grid
                item
                xs="auto"
                sm={3}
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
                    }}
                >
                    {label}
                </Typography>
            </Grid>
            <Grid item xs="auto" sm={9} lg={valueWidth}>
                <Typography
                    variant="subtitle1"
                    sx={{
                        lineHeight: {xs: 1.5, sm: 1.25},
                        mb: {xs: 0, sm: 1.5},
                    }}
                >
                    {value}
                </Typography>
            </Grid>
        </Grid>
    );
};

SectionField.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.any,
    labelIcon: PropTypes.any,
    containerWidth: PropTypes.any,
};

export default SectionField;
