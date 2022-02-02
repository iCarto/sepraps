import {useState} from "react";
import {useDownloadDocument} from "hooks";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DownloadIcon from "@mui/icons-material/Download";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import DeleteIcon from "@mui/icons-material/Delete";

const FolderTableRowMenu = ({folderElement}) => {
    const downloadDocument = useDownloadDocument();

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDownload = async () => {
        downloadDocument(
            folderElement.name,
            folderElement.path,
            folderElement.content_type
        );
        handleClose();
    };

    const handleDelete = () => {
        handleClose();
    };

    return (
        <div>
            <IconButton
                id="folder-row-button"
                aria-controls={open ? "folder-row-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="folder-row-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "folder-row-button",
                }}
            >
                <MenuItem onClick={handleDownload}>
                    <ListItemIcon>
                        {folderElement.content_type ? (
                            <DownloadIcon fontSize="small" />
                        ) : (
                            <FolderZipIcon fontSize="small" />
                        )}
                    </ListItemIcon>
                    <ListItemText>Descargar</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleDelete}>
                    <ListItemIcon>
                        <DeleteIcon color="error" />
                    </ListItemIcon>
                    <ListItemText color="error">Eliminar</ListItemText>
                </MenuItem>
            </Menu>
        </div>
    );
};

export default FolderTableRowMenu;
