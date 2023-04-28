import {Link, useLocation, useResolvedPath} from "react-router-dom";

import useTheme from "@mui/material/styles/useTheme";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";

const PageMenuListItemButton = ({to, text, icon = null, ...props}) => {
    const theme = useTheme();

    let resolved = useResolvedPath(to);
    let location = useLocation();

    const targetUrl = resolved.pathname.substring(1);
    const currentUrl = location.pathname;
    const currentUrlSlugs = currentUrl.split("/");
    const currentUrlFirstSlugs = [currentUrlSlugs[1], currentUrlSlugs[2]].join("/");
    const selected = currentUrlFirstSlugs === targetUrl;

    return (
        <>
            <ListItemButton
                component={Link}
                to={to}
                {...props}
                selected={selected}
                sx={{
                    bgcolor: theme.palette.menu.primary.header.background,
                    borderLeft: selected
                        ? `5px solid ${theme.palette.menu.primary.header.text}`
                        : null,
                    fontWeight: selected ? "bold" : "inherit",
                }}
            >
                {icon && (
                    <Tooltip title={text} placement="bottom-end">
                        <ListItemIcon
                            style={{
                                minWidth: "35px",
                                color: theme.palette.menu.primary.header.text,
                            }}
                        >
                            {icon}
                        </ListItemIcon>
                    </Tooltip>
                )}
                <ListItemText
                    sx={{color: theme.palette.menu.primary.header.text}}
                    primary={text}
                />
            </ListItemButton>
            <Divider />
        </>
    );
};

export default PageMenuListItemButton;
