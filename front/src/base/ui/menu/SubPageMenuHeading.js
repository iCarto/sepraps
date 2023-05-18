import {useNavigate} from "react-router-dom";

import {CUSTOM_FONT_FAMILY} from "Theme";

import useTheme from "@mui/material/styles/useTheme";

import Paper from "@mui/material/Paper";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";

const SubPagePageMenuHeading = ({
    to = "",
    headingPrimaryText = "",
    headingSecondaryText = "",
    headingTag = null,
    isSubMenu = false,
    children,
}) => {
    const theme = useTheme();
    const navigate = useNavigate();

    const buttonStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        bgcolor: theme.palette.menu.secondary.header.background,
        // bgcolor: theme.palette.secondary.lighter,
        color: theme.palette.menu.secondary.header.text,
        border: "none",
        minHeight: "120px",

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

    return (
        <Paper
            elevation={8}
            square
            sx={{
                borderRightColor: "white",
                borderTop: "5px solid " + theme.palette.menu.primary.header.text,
                mb: 1,
            }}
        >
            <ListItemButton
                sx={buttonStyle}
                onClick={handleClick}
                role={disabled ? "heading" : "button"}
                disabled={disabled}
            >
                <ListItemText
                    sx={{
                        display: "flex",
                        flexDirection: "column-reverse",
                        justifyContent: "flex-end",
                        border: "none",
                    }}
                    primary={headingPrimaryText}
                    primaryTypographyProps={{
                        whiteSpace: "normal",
                        lineHeight: 1.25,
                        fontSize: isSubMenu ? "1.2rem" : "1.5rem",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        fontFamily: CUSTOM_FONT_FAMILY,
                    }}
                    secondary={headingSecondaryText}
                    secondaryTypographyProps={{
                        lineHeight: 2,
                        color: theme.palette.menu.secondary.header.text,
                    }}
                />
                {headingTag}
            </ListItemButton>
            <Box sx={{bgcolor: theme.palette.menu.secondary.header.background}}>
                {children}
            </Box>
        </Paper>
    );
};

export default SubPagePageMenuHeading;
