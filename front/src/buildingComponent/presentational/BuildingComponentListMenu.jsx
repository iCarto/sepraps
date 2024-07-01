import {useState} from "react";
import {useNavigate} from "react-router";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import LowPriorityIcon from "@mui/icons-material/LowPriority";
import {OrderBuildingComponentsDialog} from "buildingComponent/container";

const BuildingComponentListMenu = ({projectId, bcMonitorings}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleOpenMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Tooltip title="Nuevo componente" placement="bottom-end">
                <IconButton aria-label="new-component" onClick={handleOpenMenu}>
                    <MoreVertIcon color="primary" />
                </IconButton>
            </Tooltip>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleCloseMenu}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <MenuItem
                    onClick={() => {
                        handleCloseMenu();
                        setDialogOpen(true);
                    }}
                >
                    <ListItemIcon>
                        <LowPriorityIcon />
                    </ListItemIcon>
                    <ListItemText>Ordenar componentes</ListItemText>
                </MenuItem>
            </Menu>
            <OrderBuildingComponentsDialog
                isDialogOpen={isDialogOpen}
                onCloseDialog={() => setDialogOpen(false)}
                bcMonitorings={bcMonitorings}
                projectId={projectId}
            />
        </div>
    );
};

export default BuildingComponentListMenu;
