import {useState} from "react";

import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ActionsMenu = ({children}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const openSettingsMenu = Boolean(anchorEl);

    const handleOpenActionsMenu = event => {
        setAnchorEl(event.target);
    };

    const handleCloseActionsMenu = () => {
        setAnchorEl(null);
    };

    const paperProps = {
        elevation: 0,
        sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
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
    };

    return (
        <>
            <Tooltip title="Acciones">
                <IconButton
                    onClick={handleOpenActionsMenu}
                    aria-controls={openSettingsMenu ? "actions" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openSettingsMenu ? "true" : undefined}
                >
                    <MoreVertIcon />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id="actions"
                open={openSettingsMenu}
                onClose={handleCloseActionsMenu}
                onClick={handleCloseActionsMenu}
                PaperProps={paperProps}
                transformOrigin={{
                    horizontal: "right",
                    vertical: "top",
                }}
                anchorOrigin={{
                    horizontal: "right",
                    vertical: "bottom",
                }}
            >
                {children}
            </Menu>
        </>
    );
};

export default ActionsMenu;
