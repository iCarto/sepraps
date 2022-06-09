import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {AuthAction, useAuth} from "auth";
import {useCopyToClipboard, useDownloadDocument, useNavigateWithReload} from "hooks";
import {DocumentService} from "service/api";

import {SidebarAction, SidebarPanel} from "layout";
import {DocumentSection} from "../presentational";
import {DeleteDocumentDialog} from ".";

import DownloadIcon from "@mui/icons-material/Download";
import LinkIcon from "@mui/icons-material/Link";
import DeleteIcon from "@mui/icons-material/Delete";

const ViewDocumentPanel = () => {
    const navigate = useNavigateWithReload();
    const {ROLES} = useAuth();

    const params = useParams();
    const {projectId} = useParams();

    const [folderElement, setFolderElement] = useState(null);

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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

    const handleDeleteDialog = isOpen => {
        setIsDeleteDialogOpen(isOpen);
    };

    const handleCloseSidebar = (refresh = false) => {
        navigate(
            `/projects/${projectId}/documents/` +
                folderElement.path.split("/").slice(0, -1).join("/"),
            refresh
        );
    };

    const sidebarActions = [
        <SidebarAction
            key="copy-link-to-file"
            name="copy link to file"
            text="Copiar enlace"
            icon={<LinkIcon />}
            onClick={handleCopyLink}
        />,
        <AuthAction roles={[ROLES.EDIT, ROLES.MANAGEMENT]}>
            <SidebarAction
                key="remove-document"
                name="remove-document"
                text="Eliminar"
                icon={<DeleteIcon color="error" />}
                onClick={handleDeleteDialog}
            />
        </AuthAction>,
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
            <DeleteDocumentDialog
                folderElement={folderElement}
                onDeletedFolderElement={() => handleCloseSidebar(true)}
                isDialogOpen={isDeleteDialogOpen}
                setIsDialogOpen={setIsDeleteDialogOpen}
            />
        </SidebarPanel>
    );
};

export default ViewDocumentPanel;
