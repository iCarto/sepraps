import {useNavigate} from "react-router-dom";

import {TextLink} from "base/navigation/components";
import {SectionFieldEditButton} from ".";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import SectionFieldHelpText from "./SectionFieldHelpText";

const Unit = ({unit}) => {
    return (
        <Typography
            variant="subtitle1"
            component="p"
            sx={{
                lineHeight: {xs: 1.85, sm: 1.65},
                ml: 1,
                overflowWrap: "break-word",
                whiteSpace: "pre-line;",
                fontSize: "0.8em",
                color: "grey",
            }}
        >
            {unit}
        </Typography>
    );
};

const SectionField = ({
    label = null,
    value = null,
    unit = "",
    labelIcon = null,
    containerWidth = "",
    valueCustomStyle = {},
    customValueStyle = null,
    linkPath = null,
    editButton = false,
    editButtonPath = "",
    helperTextValue = "",
}) => {
    const navigate = useNavigate();
    let labelWidth;
    let valueWidth;

    switch (`${containerWidth}`) {
        case "short":
            labelWidth = editButton ? 5 : 5;
            valueWidth = editButton ? 6 : 7;
            break;
        case "shortLabel":
            labelWidth = editButton ? 5 : 3;
            valueWidth = editButton ? 6 : 9;
            break;
        case "longLabel":
            labelWidth = editButton ? 6 : 7;
            valueWidth = editButton ? 5 : 5;
            break;
        default:
            labelWidth = editButton ? 4 : 4;
            valueWidth = editButton ? 7 : 8;
            break;
    }

    const labelStyle = {
        lineHeight: {xs: 1.5, sm: 1.25},
        mt: {xs: 0, sm: 1.5},
        textTransform: "uppercase",
        hyphens: "auto",
    };

    const valueStyle = {
        mt: {xs: 0, sm: 1.5},
        overflowWrap: "break-word",
        lineHeight: {xs: 1.5, sm: 1.25},
        fontWeight: "regular",
        ...valueCustomStyle,
    };

    const LabelIcon = labelIcon;

    const isValueValid = value || value === 0;

    const regularField = (
        <>
            <Typography
                variant="subtitle2"
                component="p"
                sx={{...valueStyle, ...customValueStyle} || valueStyle}
            >
                {value}
            </Typography>
            {helperTextValue && <SectionFieldHelpText text={helperTextValue} />}
            {unit && <Unit unit={unit} />}
        </>
    );

    const linkField = (
        <TextLink text={value} to={linkPath} textStyle={{fontSize: "14px"}} />
    );

    const emptyField = (
        <Typography
            variant="subtitle2"
            component="p"
            sx={{...valueStyle, fontStyle: "italic"}}
        >
            —
        </Typography>
    );

    return (
        <Grid container>
            <Grid
                item
                container
                alignItems="flex-start"
                xs="auto"
                sm={5}
                lg={labelWidth}
            >
                {labelIcon && (
                    <LabelIcon fontSize="small" sx={{mr: 1, color: "text.secondary"}} />
                )}
                {label && (
                    <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        sx={labelStyle}
                    >
                        {label}:
                    </Typography>
                )}
            </Grid>
            <Grid item container xs="auto" sm={7} lg={valueWidth} alignItems="flex-end">
                <Grid item>
                    {isValueValid ? (linkPath ? linkField : regularField) : emptyField}
                </Grid>
                {editButton ? (
                    <Grid item xs={1}>
                        <SectionFieldEditButton onClick={navigate(editButtonPath)} />
                    </Grid>
                ) : null}
            </Grid>
        </Grid>
    );
};

export default SectionField;
