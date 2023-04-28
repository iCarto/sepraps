import {Link, useLocation, useResolvedPath} from "react-router-dom";

import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuListItemIcon from "./MenuListItemIcon";
import Tooltip from "@mui/material/Tooltip";
import styled from "@mui/material/styles/styled";

const ListItemStyled = styled(ListItem, {
    shouldForwardProp: prop => prop !== "selected",
})(({selected = false, theme}) => ({
    color: selected ? theme.palette.primary.main : "inherit",
    backgroundColor: selected ? theme.palette.primary.lighter : "inherit",
    borderLeft: selected ? `3px solid ${theme.palette.primary.main}` : "inherit",
}));

const ListItemIconStyled = styled(ListItemIcon, {
    shouldForwardProp: prop => prop !== "selected",
})(({selected = false, theme}) => ({
    color: selected ? theme.palette.primary.main : "inherit",
    minWidth: 0,
}));

const MenuListItemLink = ({
    to,
    icon = null,
    text = "",
    textStyle = {},
    tooltipTitle = "",
    resolvedPathName = null,
    ...props
}) => {
    let resolved = useResolvedPath(resolvedPathName || to);
    let location = useLocation();

    const selected = location.pathname.startsWith(resolved.pathname);

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
        <ListItemStyled button component={Link} to={to} {...props} selected={selected}>
            {icon && (
                <MenuListItemIcon>
                    <Tooltip title={tooltipTitle} placement="bottom-end">
                        <ListItemIconStyled selected={selected}>
                            {icon}
                        </ListItemIconStyled>
                    </Tooltip>
                </MenuListItemIcon>
            )}
            <ListItemText
                primary={text}
                primaryTypographyProps={selectedOptionTextStyle}
            />
        </ListItemStyled>
    );
};

export default MenuListItemLink;
