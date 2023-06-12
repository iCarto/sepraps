import {useNavigate} from "react-router-dom";

import {CUSTOM_FONT_FAMILY} from "Theme";

import useTheme from "@mui/material/styles/useTheme";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const SubPageMenuHeaderButton = ({
    headerText = null,
    headerTitle = "",
    headerTag = null,
    isDropDown = false,
    isPopUpOpen = false,
    onClick = null,
    isSubMenu = false,
    to = "",
}) => {
    const theme = useTheme();
    const navigate = useNavigate();

    const disabled = !to && !isDropDown;

    const handleClick = event => {
        if (onClick) {
            onClick(event);
        }
        if (to) {
            navigate(to);
        }
    };

    const buttonStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        bgcolor: theme.palette.menu.secondary.header.background,
        color: theme.palette.menu.secondary.header.text,
        border: "none",
        minHeight: "120px",

        "&.Mui-disabled": {
            opacity: "unset",
        },
    };

    return (
        <ListItemButton
            sx={buttonStyle}
            id={isDropDown ? "dropdown-button" : "heading-button"}
            aria-controls={isDropDown ? "dropdown-menu" : "heading-menu"}
            aria-haspopup={isDropDown ? "true" : "false"}
            aria-expanded={isPopUpOpen}
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
                primary={headerText}
                primaryTypographyProps={{
                    whiteSpace: "normal",
                    lineHeight: 1.25,
                    fontSize: isSubMenu ? "1.2rem" : "1.5rem",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    fontFamily: CUSTOM_FONT_FAMILY,
                }}
                secondary={headerTitle}
                secondaryTypographyProps={{
                    lineHeight: 2,
                    color: theme.palette.menu.secondary.header.text,
                }}
            />
            {headerTag}
        </ListItemButton>
    );
};

export default SubPageMenuHeaderButton;
