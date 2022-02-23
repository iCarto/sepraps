import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useCopyToClipboard, useDownloadDocument, useNavigateWithReload} from "hooks";
import {DocumentService} from "service/api";

import {SidebarPanel} from "layout";
import {DocumentSection} from "../presentational";
import {DialogLayout} from "components/common/presentational";

import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import ListItemIcon from "@mui/material/ListItemIcon";
import DownloadIcon from "@mui/icons-material/Download";
import LinkIcon from "@mui/icons-material/Link";
import DeleteIcon from "@mui/icons-material/Delete";

const ViewDocumentPanel = () => {
    const navigate = useNavigateWithReload();
    const params = useParams();

    const [folderElement, setFolderElement] = useState(null);

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const {id: projectId} = useParams();

    useEffect(() => {
        let path = params["*"];
        if (path) {
            DocumentService.get(path).then(element => {
                setFolderElement(element);
            });
        }
    }, [params]);

    const downloadDocument = useDownloadDocument();
    const copytToClipBoard = useCopyToClipboard();

    const handleDownload = async () => {
        downloadDocument(
            folderElement.name,
            folderElement.path,
            folderElement.content_type
        );
        handleCloseSidebar();
    };

    const handleCopyLink = () => {
        copytToClipBoard(window.location.origin + folderElement.path);
        handleCloseSidebar();
    };

    const handleDelete = () => {
        setIsDeleteDialogOpen(false);
        DocumentService.delete(folderElement.path);
        handleCloseSidebar();
    };

    const handleDeleteDialog = isOpen => {
        setIsDeleteDialogOpen(isOpen);
    };

    const handleCloseSidebar = () => {
        navigate(
            `/projects/${projectId}/documents/` +
                folderElement.path
                    .split("/")
                    .slice(0, -1)
                    .join("/")
        );
    };

    // SIDEBAR ACTIONS TO BE USED IN SIDEBARPANEL WHEN COMMON STRUCTURE IS IMPLEMENTED
    const sidebarActions = [
        <MenuItem
            key="copy-link-to-file"
            name="copy link to file"
            aria-label="Copy link to file"
            onClick={handleCopyLink}
        >
            <ListItemIcon>
                <LinkIcon />
            </ListItemIcon>
            Copiar enlace
        </MenuItem>,
        <MenuItem
            key="remove-Document"
            name="remove-Document"
            aria-label="Remove Document"
            onClick={handleDeleteDialog}
        >
            <ListItemIcon>
                <DeleteIcon />
            </ListItemIcon>
            Eliminar archivo
        </MenuItem>,
    ];

    return (
        <SidebarPanel
            sidebarTitle="Detalle del documento"
            closeSidebarClick={handleCloseSidebar}
            sidebarActions={sidebarActions}
        >
            <DocumentSection folderElement={folderElement} />
            <Button
                variant="contained"
                color="primary"
                sx={{ml: 2}}
                endIcon={<DownloadIcon />}
                onClick={handleDownload}
            >
                Descargar
            </Button>
            <DialogLayout
                dialogLabel="Delete document"
                dialogTitle="¿Quiere eliminar este archivo?"
                dialogContentText="Si hace clic en Eliminar, el archivo se eliminará y no se podrá recuperar."
                mainActionClick={handleDelete}
                mainActionText="Eliminar"
                handleDialog={handleDeleteDialog}
                isDialogOpen={isDeleteDialogOpen}
            />
        </SidebarPanel>
    );
};

export default ViewDocumentPanel;
