import {useState, useEffect} from "react";
import {useLocation, useOutletContext} from "react-router-dom";
import {useAuth} from "base/user/provider";
import {AuthAction} from "base/user/components";

import {useDownloadDocument} from "base/file/utilities";
import {DocumentService} from "base/file/service";
import {useFolderView} from "base/file/provider";
import {Spinner} from "base/shared/components";
import {
    FileUploadSection,
    FolderBreadcrumb,
    FolderChangeViewButtonGroup,
    FolderList,
    FolderTable,
} from "base/file/components";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";
import Tooltip from "@mui/material/Tooltip";

const ListFolder = ({
    folderPath,
    basePath,
    selectedElement = null,
    onSelectElement = null,
}) => {
    const [folderElement, setFolderElement] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const downloadDocument = useDownloadDocument();
    const location = useLocation();
    const {ROLES} = useAuth();
    const {view} = useFolderView();

    let project;
    [project] = useOutletContext();

    const isProjectClosed = project.closed;
    const folderContainsFiles = folderElement?.children?.some(child => child["size"]);

    useEffect(() => {
        setIsLoading(true);
        DocumentService.get(folderPath).then(element => {
            setFolderElement(element);
            setIsLoading(false);
        });
    }, [folderPath, location.state?.lastRefreshDate]);

    const reloadFolder = file => {
        DocumentService.get(folderPath).then(folder => {
            setFolderElement(folder);
        });
    };

    const downloadFolder = () => {
        downloadDocument(folderElement.name + ".zip", folderPath, "application/zip");
    };

    return (
        <Grid container justifyContent="flex-start" alignItems="center" spacing={2}>
            <Grid item container xs={12} justifyContent="space-between">
                <FolderBreadcrumb path={folderPath} basePath={basePath} />
                <FolderChangeViewButtonGroup />
            </Grid>
            <Grid item container xs={12}>
                {isLoading ? (
                    <Spinner />
                ) : view === "list" ? (
                    <FolderList
                        folderElements={folderElement?.children}
                        selectedElement={selectedElement}
                        onSelectElement={onSelectElement}
                        basePath={basePath}
                    />
                ) : (
                    <FolderTable
                        basePath={basePath}
                        folderElements={folderElement?.children}
                        selectedElement={selectedElement}
                        onSelectElement={onSelectElement}
                    />
                )}
            </Grid>
            {folderContainsFiles ? (
                <Grid item container xs={12} justifyContent="flex-end">
                    <Tooltip title="Descargar archivos">
                        <IconButton aria-label="download-zip" onClick={downloadFolder}>
                            <DownloadIcon />
                        </IconButton>
                    </Tooltip>
                </Grid>
            ) : null}
            <AuthAction roles={[ROLES.EDIT, ROLES.MANAGEMENT, ROLES.SUPERVISION]}>
                <Grid item container xs={12} mt={4}>
                    <FileUploadSection
                        path={folderPath}
                        onFinishUpload={reloadFolder}
                    />
                </Grid>
            </AuthAction>
        </Grid>
    );
};

export default ListFolder;
