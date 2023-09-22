import {useEffect, useState} from "react";
import {useParams, useLocation} from "react-router-dom";
import {DeleteDocumentDialog, DocumentSection} from ".";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import DownloadIcon from "@mui/icons-material/Download";
import LinkIcon from "@mui/icons-material/Link";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import {useNavigateWithReload} from "base/navigation/hooks";
import {DocumentService} from "../service";
import {useDownloadDocument} from "../utilities";
import {useCopyToClipboard} from "base/shared/utilities";
import {SidebarAction, SidebarPanelLayout} from "base/ui/sidebar";
import {AuthAction} from "base/user/components";

const ViewDocumentPanel = ({
    onSetFeaturedImage = null,
    onSetFeaturedDocument = null,
}) => {
    const navigate = useNavigateWithReload();

    const params = useParams();
    const location = useLocation();

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
        onSetFeaturedImage(folderElement.id).then(response => {
            handleCloseSidebar(true);
        });
    };

    const handleSetFeaturedDocument = () => {
        onSetFeaturedDocument(folderElement.id).then(response => {
            handleCloseSidebar(true);
        });
    };

    const handleDeleteDialog = isOpen => {
        setIsDeleteDialogOpen(isOpen);
    };

    const handleCloseSidebar = (refresh = false) => {
        navigate(
            location.pathname
                .split("/")
                .slice(0, -1)
                .join("/")
                .replace("/detail", ""),
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
        onSetFeaturedImage &&
        folderElement &&
        folderElement.content_type.startsWith("image") ? (
            <SidebarAction
                key="set-featured-image"
                name="set featured image"
                text="Usar como imagen principal"
                icon={<ImageOutlinedIcon />}
                onClick={handleSetFeaturedImage}
            />
        ) : null,
        onSetFeaturedDocument && folderElement ? (
            <SidebarAction
                key="set-featured-document"
                name="set featured document"
                text="Usar como documento principal"
                icon={<InsertDriveFileOutlinedIcon />}
                onClick={handleSetFeaturedDocument}
            />
        ) : null,
        <AuthAction
            key="remove-document"
            roles={[]} // TODO: Bootstraped permissions
        >
            <SidebarAction
                name="remove-document"
                text="Eliminar"
                icon={<DeleteIcon color="error" />}
                onClick={handleDeleteDialog}
            />
        </AuthAction>,
    ];
    console.log({sidebarActions});

    return (
        <SidebarPanelLayout
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
        </SidebarPanelLayout>
    );
};

export default ViewDocumentPanel;
