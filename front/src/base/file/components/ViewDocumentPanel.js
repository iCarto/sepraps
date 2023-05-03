import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useAuth} from "../../user/provider";
import {AuthAction} from "../../user/components";
import {DocumentService} from "../service";
import {useNavigateWithReload} from "../../navigation/hooks";
import {useDownloadDocument} from "../utilities";
import {useCopyToClipboard} from "../../shared/utilities";
import {ProjectService} from "project/service";

import {SidebarAction, SidebarPanel} from "base/ui/sidebar";
import {DeleteDocumentDialog, DocumentSection} from ".";

import DownloadIcon from "@mui/icons-material/Download";
import LinkIcon from "@mui/icons-material/Link";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

const ViewDocumentPanel = () => {
    const navigate = useNavigateWithReload();
    const {ROLES} = useAuth();

    const params = useParams();
    const {id: projectId} = useParams();

    const [folderElement, setFolderElement] = useState(null);
    const [loading, setLoading] = useState(false);

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    useEffect(() => {
        let path = params["*"];
        if (path) {
            setLoading(true);
            DocumentService.get(path).then(element => {
                setFolderElement(element);
                setLoading(false);
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
            {loading ? (
                <Grid item container justifyContent="center" xs={12}>
                    <CircularProgress color="inherit" size={20} />
                </Grid>
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
