import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useAuth} from "base/user/provider";
import {AuthAction} from "base/user/components";
import {DocumentService} from "base/file/service";
import {useNavigateWithReload} from "base/navigation/hooks";
import {useDownloadDocument} from "base/file/utilities";
import {useCopyToClipboard} from "base/shared/utilities";
import {ProjectService} from "project/service";

import {Spinner} from "base/shared/components";
import {SidebarAction, SidebarPanel} from "base/ui/sidebar";
import {DeleteDocumentDialog, DocumentSection} from "base/file/components";

import DownloadIcon from "@mui/icons-material/Download";
import LinkIcon from "@mui/icons-material/Link";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";

// TO-DO: Implement EntityViewPanel ?
const ViewDocumentPanel = () => {
    const [folderElement, setFolderElement] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const navigate = useNavigateWithReload();
    const {ROLES} = useAuth();

    const params = useParams();
    const {id: projectId} = useParams();

    useEffect(() => {
        let path = params["*"];
        if (path) {
            setIsLoading(true);
            DocumentService.get(path).then(element => {
                setFolderElement(element);
                setIsLoading(false);
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

    const handleSetFeaturedImage = () => {
        ProjectService.updateProjectWithPatch({
            id: projectId,
            featured_image: folderElement.id,
        }).then(response => {
            handleCloseSidebar(true);
        });
    };

    const handleDeleteDialog = isOpen => {
        setIsDeleteDialogOpen(isOpen);
    };

    const handleCloseSidebar = (refresh = false) => {
        navigate(
            `/projects/${projectId}/documents/` +
                folderElement.path
                    .split("/")
                    .slice(0, -1)
                    .join("/"),
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
        folderElement && folderElement.content_type.startsWith("image") ? (
            <SidebarAction
                key="set-project-featured-image"
                name="set project featured image"
                text="Usar como imagen principal"
                icon={<ImageOutlinedIcon />}
                onClick={handleSetFeaturedImage}
            />
        ) : null,
        <AuthAction
            key="remove-document"
            roles={[ROLES.EDIT, ROLES.MANAGEMENT, ROLES.SUPERVISION]}
        >
            <SidebarAction
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
            {isLoading ? (
                <Spinner />
            ) : (
                <DocumentSection folderElement={folderElement} />
            )}

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
