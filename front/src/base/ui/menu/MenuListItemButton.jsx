import {useLocation, useNavigate, useResolvedPath} from "react-router-dom";

import {MenuListItemIcon} from ".";

import useTheme from "@mui/material/styles/useTheme";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";

/**
 * There may be 3 different types of buttons, each with different styles:
 * * Regular buttons
 * * Buttons in groups or sublists of buttons: the prop `isGroupItem` needs to be set to `true`
 * * Headings of groups or sublists of buttons: these are disabled and rendered with a role of "heading" instead of "button"
 *
 * Buttons usually act as links, navigating to the `to` url passed as prop, but they can be passed an `onClick` function instead.
 *
 */

const MenuListItemButton = ({
    to = "",
    icon = null,
    text = "",
    isGroupItem = false,
    tooltipTitle = "",
    onClick = null,
    ...props
}) => {
    const navigate = useNavigate();

    const theme = useTheme();

    let resolved = useResolvedPath(to);
    let location = useLocation();

    const selected = location.pathname === resolved.pathname;

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else navigate(to);
    };

    const regularButtonStyle = {
        borderLeft: selected ? `3px solid ${theme.palette.primary.main}` : "inherit",
        backgroundColor: selected ? theme.palette.secondary.dark : "inherit",
        color: "white",
    };

    const groupButtonStyle = {
        py: selected ? 1 : 0.5,
        pl: 3,
        borderLeft: selected ? `3px solid ${theme.palette.primary.main}` : "inherit",
        backgroundColor: selected ? theme.palette.secondary.dark : "inherit",
        color: selected ? "inherit" : theme.palette.secondary.light,
    };

    const groupHeadingStyle = {
        "&.Mui-disabled": {
            opacity: "unset",
        },
    };

    const iconStyle = {
        minWidth: "3rem",
        color: isGroupItem && !selected ? theme.palette.secondary.light : "white",
    };

    const textStyle = {
        fontWeight: selected ? "bold" : "inherit",
    };

    const getItemStyle = () => {
        if (isGroupItem) {
            return groupButtonStyle;
        } else return regularButtonStyle;
    };

    return (
        <ListItemButton
            component="li"
            sx={getItemStyle()}
            onClick={handleClick}
            {...props}
        >
            {icon && (
                <MenuListItemIcon>
                    <Tooltip title={tooltipTitle} placement="bottom-end">
                        <ListItemIcon sx={iconStyle}>{icon}</ListItemIcon>
                    </Tooltip>
                </MenuListItemIcon>
            )}
            <ListItemText
                primary={text}
                primaryTypographyProps={textStyle}
                sx={{color: theme.palette.menu.primary.options.text}}
            />
        </ListItemButton>
    );
};

export default MenuListItemButton;
