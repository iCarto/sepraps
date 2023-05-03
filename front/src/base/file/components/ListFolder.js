import {useState, useEffect} from "react";
import {useLocation, useOutletContext} from "react-router-dom";
import {useAuth} from "base/user/provider";
import {AuthAction} from "base/user/components";

import {useDownloadDocument} from "../utilities";
import {DocumentService} from "../service";
import {useFolderView} from "../provider";
import {
    FileUploadSection,
    FolderBreadcrumb,
    FolderChangeViewButtonGroup,
    FolderList,
    FolderTable,
} from ".";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";

const ListFolder = ({
    folderPath,
    basePath,
    selectedElement = null,
    onSelectElement = null,
}) => {
    const downloadDocument = useDownloadDocument();
    const location = useLocation();
    const {ROLES} = useAuth();

    const {view} = useFolderView();

    const [folderElement, setFolderElement] = useState(null);
    const [loading, setLoading] = useState(false);

    let project;
    [project] = useOutletContext();

    const isProjectClosed = project.closed;

    useEffect(() => {
        setLoading(true);
        // DocumentService.get(folderPath).then(element => {
        //     setFolderElement(element);
        //     setLoading(false);
        // });
    }, [folderPath, location.state?.lastRefreshDate]);

    const reloadFolder = file => {
        // DocumentService.get(folderPath).then(folder => {
        //     setFolderElement(folder);
        // });
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
                {loading ? (
                    <Grid item container xs={12} justifyContent="center">
                        <CircularProgress color="inherit" size={20} />
                    </Grid>
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
            {folderElement && (
                <Grid item container xs={12} justifyContent="flex-end">
                    <IconButton aria-label="download-zip" onClick={downloadFolder}>
                        <DownloadIcon />
                    </IconButton>
                </Grid>
            )}
            {/* TODO: Hack to know if is root folder. Will be changed when folder permissions are working. */}
            {folderPath.indexOf("/") >= 0 && (
                <AuthAction roles={[ROLES.EDIT, ROLES.MANAGEMENT, ROLES.SUPERVISION]}>
                    <Grid item container xs={12} mt={8}>
                        <FileUploadSection
                            path={folderPath}
                            onFinishUpload={reloadFolder}
                        />
                    </Grid>
                </AuthAction>
            )}
        </Grid>
    );
};

export default ListFolder;
