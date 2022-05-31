import {useAuth} from "auth";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Logout from "@mui/icons-material/Logout";

const AccountMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const {user, logout} = useAuth();

    let navigate = useNavigate();

    const open = Boolean(anchorEl);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Box
                sx={{
                    margin: "1 1.5",
                }}
            >
                <Tooltip title="Perfil de usuario">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ml: 2, backgroundColor: "primary.light"}}
                        aria-controls={open ? "profile-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                    >
                        <Avatar
                            sx={{
                                width: 32,
                                height: 32,
                                backgroundColor: "#ffff",
                                color: "primary.main",
                            }}
                        ></Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="profile-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{horizontal: "right", vertical: "top"}}
                anchorOrigin={{horizontal: "right", vertical: "bottom"}}
            >
                <ListItem>
                    <Avatar />
                    {user.name}
                </ListItem>
                <Divider />
                <MenuItem
                    onClick={() => {
                        logout(() => navigate("/"));
                    }}
                >
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Cerrar sesión
                </MenuItem>
            </Menu>
        </>
    );
};

export default AccountMenu;
