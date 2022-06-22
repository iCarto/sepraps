import {Link, useLocation, useResolvedPath} from "react-router-dom";
import {useTheme} from "@emotion/react";

import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuListItemIcon from "./MenuListItemIcon";
import Tooltip from "@mui/material/Tooltip";

const MenuListItemLink = ({
    to,
    icon = null,
    text = "",
    textStyle = {},
    tooltipTitle = "",
    ...props
}) => {
    const theme = useTheme();

    let resolved = useResolvedPath(to);
    let location = useLocation();

    const selected = location.pathname.startsWith(resolved.pathname);

    const selectedOptionStyle = {
        color: theme.palette.primary.main,
        bgcolor: theme.palette.primary.lighter,
        borderLeft: `3px solid ${theme.palette.primary.main}`,
    };

    const selectedOptionIconStyle = {
        color: theme.palette.primary.main,
    };

    const selectedOptionTextStyle = selected
        ? {
              ...textStyle,
              fontWeight: 500,
          }
        : {
              ...textStyle,
              color: "text.secondary",
          };

    return (
        <ListItem
            button
            component={Link}
            to={to}
            {...props}
            sx={selected && selectedOptionStyle}
        >
            {icon && (
                <MenuListItemIcon>
                    <Tooltip title={tooltipTitle} placement="bottom-end">
                        <ListItemIcon sx={selected && selectedOptionIconStyle}>
                            {icon}
                        </ListItemIcon>
                    </Tooltip>
                </MenuListItemIcon>
            )}
            <ListItemText
                primary={text}
                primaryTypographyProps={selectedOptionTextStyle}
            />
        </ListItem>
    );
};

export default MenuListItemLink;
