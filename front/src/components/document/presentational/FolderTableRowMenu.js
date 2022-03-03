import {useState} from "react";
import {useDownloadDocument, useCopyToClipboard} from "hooks";

import {DocumentService} from "service/api";

import {DialogLayout} from "components/common/presentational";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DownloadIcon from "@mui/icons-material/Download";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import DeleteIcon from "@mui/icons-material/Delete";
import LinkIcon from "@mui/icons-material/Link";
import {RemoveDocumentDialog} from "../container";

const FolderTableRowMenu = ({folderElement, basePath, onUpdate}) => {
    const downloadDocument = useDownloadDocument();
    const copytToClipBoard = useCopyToClipboard();

    const [anchorEl, setAnchorEl] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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

    const handleCopyLink = () => {
        copytToClipBoard(window.location.origin + basePath + folderElement.path);
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
                <MenuItem onClick={handleCopyLink}>
                    <ListItemIcon>
                        <LinkIcon />
                    </ListItemIcon>
                    <ListItemText>Copiar enlace</ListItemText>
                </MenuItem>
                {folderElement.content_type && (
                    <MenuItem
                        onClick={() => {
                            setIsDeleteDialogOpen(true);
                        }}
                    >
                        <ListItemIcon>
                            <DeleteIcon color="error" />
                        </ListItemIcon>
                        <ListItemText>Eliminar</ListItemText>
                    </MenuItem>
                )}
            </Menu>
            <RemoveDocumentDialog
                folderElement={folderElement}
                onDeletedFolderElement={() => {
                    onUpdate();
                    handleClose();
                }}
                isDialogOpen={isDeleteDialogOpen}
                setIsDialogOpen={setIsDeleteDialogOpen}
            />
        </div>
    );
};

export default FolderTableRowMenu;
