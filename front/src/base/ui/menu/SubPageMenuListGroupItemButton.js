import {Link, useLocation, useResolvedPath} from "react-router-dom";

import useTheme from "@mui/material/styles/useTheme";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";

const SubPageMenuListGroupItemButton = ({to, text, icon = null, ...props}) => {
    const theme = useTheme();

    let resolved = useResolvedPath(to);
    let location = useLocation();

    const selected = location.pathname.startsWith(resolved.pathname);

    return (
        <>
            <ListItemButton
                component={Link}
                to={to}
                sx={{
                    borderLeft: selected
                        ? `5px solid ${theme.palette.menu.secondary.header.text}`
                        : null,
                    fontWeight: selected ? "bold" : "inherit",
                    paddingLeft: 4,
                }}
                {...props}
                selected={selected}
            >
                <ListItemIcon
                    style={{
                        minWidth: "20px",
                        color: theme.palette.menu.secondary.options.text,
                    }}
                >
                    <ArrowRightOutlinedIcon sx={{fontSize: "0.8rem"}} />
                </ListItemIcon>
                <ListItemText
                    sx={{
                        color: selected
                            ? theme.palette.menu.primary.header.text
                            : theme.palette.menu.secondary.options.text,
                    }}
                    primary={text}
                    primaryTypographyProps={{fontWeight: selected ? "bold" : "inherit"}}
                />
            </ListItemButton>
            <Divider sx={{borderColor: "#ededed"}} />
        </>
    );
};

export default SubPageMenuListGroupItemButton;
