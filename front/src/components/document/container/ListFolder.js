import {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";
import {DocumentService} from "service/api";

import {useFolderView} from "../provider";
import {
    FolderBreadcrumb,
    FolderChangeView,
    FolderList,
    FolderTable,
} from "../presentational";
import {FileUploadSection} from "../common";

import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

const ListFolder = ({
    folderPath,
    basePath,
    selectedElement = null,
    onSelectElement = null,
}) => {
    const location = useLocation();

    const {view} = useFolderView();

    const [folderElements, setFolderElements] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        DocumentService.get(folderPath).then(element => {
            setFolderElements(element.children);
            setLoading(false);
        });
    }, [folderPath, location.state?.lastRefreshDate]);

    const reloadFolder = file => {
        DocumentService.get(folderPath).then(folder => {
            setFolderElements(folder.children);
        });
    };

    return (
        <Grid container justifyContent="flex-start" alignItems="center" spacing={2}>
            <Grid item container xs={12} justifyContent="space-between">
                <FolderBreadcrumb path={folderPath} basePath={basePath} />
                <FolderChangeView />
            </Grid>
            <Grid item container xs={12}>
                {loading ? (
                    <Grid item container xs={12} justifyContent="center">
                        <CircularProgress color="inherit" size={20} />
                    </Grid>
                ) : view === "list" ? (
                    <FolderList
                        folderElements={folderElements}
                        selectedElement={selectedElement}
                        onSelectElement={onSelectElement}
                        basePath={basePath}
                    />
                ) : (
                    <FolderTable
                        basePath={basePath}
                        folderElements={folderElements}
                        selectedElement={selectedElement}
                        onSelectElement={onSelectElement}
                    />
                )}
            </Grid>
            {/* TODO: Hack to know if is root folder. Will be changed when folder permissions are working. */}
            {folderPath.indexOf("/") >= 0 && (
                <Grid item container xs={12} mt={8}>
                    <FileUploadSection
                        path={folderPath}
                        onFinishUpload={reloadFolder}
                    />
                </Grid>
            )}
        </Grid>
    );
};

export default ListFolder;
