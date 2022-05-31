import {useState} from "react";
import {useAuth} from "auth";

import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const SectionActionsMenu = ({children}) => {
    const {hasRole} = useAuth();
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

    // Review if some of the children has permissions
    const hasPermission = children => {
        const roles = children.flatMap((child, i) => {
            return child.props.roles ? child.props.roles : [];
        });
        return roles.length === 0 || roles.some(role => hasRole(role));
    };

    return (
        children &&
        children.length &&
        hasPermission(children) && (
            <>
                <Tooltip title="Acciones">
                    <IconButton
                        onClick={handleOpenActionsMenu}
                        size="small"
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
        )
    );
};

export default SectionActionsMenu;
