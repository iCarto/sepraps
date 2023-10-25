import {useNavigate} from "react-router-dom";

import {TextLink} from "base/navigation/components";
import {SectionFieldEditButton} from ".";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import SectionFieldHelpText from "./SectionFieldHelpText";
import Tooltip from "@mui/material/Tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const Unit = ({unit}) => {
    return (
        <Typography
            variant="subtitle1"
            component="span"
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
    helperText = "",
    tooltipText = null,
}) => {
    const navigate = useNavigate();
    let labelWidth;
    let valueWidth;

    switch (`${containerWidth}`) {
        case "long":
            labelWidth = 9;
            valueWidth = editButton ? 2 : 3;
            break;
        case "short":
            labelWidth = editButton ? 5 : 6;
            valueWidth = 6;
            break;
        default:
            labelWidth = 5;
            valueWidth = editButton ? 6 : 7;
            break;
    }

    const labelStyle = {
        lineHeight: {xs: 1.5, sm: 1.25},
        mt: {xs: 0, sm: 1.5},
        hyphens: "auto",
    };

    const valueStyle = {
        mt: {xs: 0, sm: 1.5},
        overflowWrap: "break-word",
        lineHeight: {xs: 1.5, sm: 1.25},
        fontWeight: "regular",
        ...valueCustomStyle,
    };

    const regularField = (
        <>
            <Typography
                variant="subtitle2"
                component="span"
                sx={{...valueStyle, ...customValueStyle} || valueStyle}
            >
                {value}
            </Typography>
            {helperText && <SectionFieldHelpText text={helperText} />}
            {unit && <Unit unit={unit} />}
        </>
    );

    const linkField = (
        <TextLink text={value} to={linkPath} textStyle={{fontSize: "14px"}} />
    );

    const emptyField = (
        <Typography
            variant="subtitle2"
            component="span"
            sx={{...valueStyle, fontStyle: "italic"}}
        >
            —
        </Typography>
    );

    const LabelIcon = labelIcon;
    const isValueValid = value || value === 0;
    const typeOfField = linkPath ? linkField : regularField;

    return (
        <Grid container columnSpacing={containerWidth === "long" ? 2 : 1} sx={{my: 1}}>
            <Grid
                item
                container
                xs="auto"
                sm={5}
                lg={labelWidth}
                alignItems="flex-start"
            >
                {tooltipText && (
                    <Tooltip title={tooltipText} arrow enterDelay={500}>
                        <InfoOutlinedIcon
                            sx={{mr: 1, color: "grey.500", fontSize: "0.9rem"}}
                        />
                    </Tooltip>
                )}
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
            <Grid item container xs="auto" sm={6} lg={valueWidth} alignItems="flex-end">
                <Grid
                    item
                    sx={{
                        border: 1,
                        borderRadius: 1,
                        borderStyle: "solid",
                        borderColor: "grey.300",
                        backgroundColor: "grey.100",
                        p: 1,
                        width: "100%",
                    }}
                >
                    {isValueValid ? typeOfField : emptyField}
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
