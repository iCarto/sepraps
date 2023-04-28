import {useNavigate} from "react-router-dom";

import {CUSTOM_FONT_FAMILY} from "Theme";

import useTheme from "@mui/material/styles/useTheme";

import Paper from "@mui/material/Paper";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import {createElement} from "react";

const PageMenuHeading = ({
    headingPrimaryText = "",
    headingSecondaryText = "",
    headingIcon = null,
    to = null,
    children = null,
}) => {
    const theme = useTheme();
    const navigate = useNavigate();

    const buttonStyles = {
        bgcolor: theme.palette.secondary.dark,
        // bgcolor: theme.palette.secondary.lighter,
        color: "white",
        border: "none",
        mb: 1,

        "&.Mui-disabled": {
            opacity: "unset",
        },
    };

    const handleClick = () => {
        if (to) {
            navigate(to);
        }
    };

    const disabled = !to;

    const getIcon = () => {
        return createElement(headingIcon, {
            fontSize: "large",
            sx: {color: "white"},
        });
    };

    return (
        <Paper elevation={8} square sx={{borderRightColor: "white"}}>
            <ListItemButton
                sx={buttonStyles}
                onClick={handleClick}
                role={disabled ? "heading" : "button"}
                disabled={disabled}
            >
                <ListItemText
                    sx={{
                        display: "flex",
                        flexDirection: "column-reverse",
                        border: "none",
                    }}
                    primary={headingPrimaryText}
                    primaryTypographyProps={{
                        whiteSpace: "normal",
                        lineHeight: 1.25,
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        fontFamily: CUSTOM_FONT_FAMILY,
                    }}
                    secondary={headingSecondaryText}
                    secondaryTypographyProps={{
                        lineHeight: 2,
                        color: "white",
                    }}
                />
                {headingIcon && (
                    <ListItemIcon sx={{justifyContent: "flex-end"}}>
                        {getIcon()}
                    </ListItemIcon>
                )}
            </ListItemButton>
            {children}
        </Paper>
    );
};

export default PageMenuHeading;
