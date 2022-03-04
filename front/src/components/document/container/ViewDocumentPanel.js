import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useCopyToClipboard, useDownloadDocument, useNavigateWithReload} from "hooks";
import {DocumentService} from "service/api";

import {SidebarAction, SidebarPanel} from "layout";
import {DocumentSection} from "../presentational";
import {DialogLayout} from "components/common/presentational";

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
    const copyToClipBoard = useCopyToClipboard();

    const handleDownload = async () => {
        downloadDocument(
            folderElement.name,
            folderElement.path,
            folderElement.content_type
        );
    };

    const handleCopyLink = () => {
        copyToClipBoard(window.location);
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
        <SidebarAction
            key="copy-link-to-file"
            name="copy link to file"
            text="Copiar enlace"
            icon={<LinkIcon />}
            onClick={handleCopyLink}
        />,
        <SidebarAction
            key="remove-document"
            name="remove-document"
            text="Eliminar archivo"
            icon={<DeleteIcon />}
            onClick={handleDeleteDialog}
        />,
    ];

    return (
        <SidebarPanel
            sidebarTitle="Detalle del documento"
            closeSidebarClick={handleCloseSidebar}
            mainActionText="Descargar"
            mainActionClick={handleDownload}
            mainActionIcon={<DownloadIcon />}
            sidebarActions={sidebarActions}
        >
            <DocumentSection folderElement={folderElement} />
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
