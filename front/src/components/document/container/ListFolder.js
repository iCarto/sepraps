import {useState, useEffect} from "react";
import {useParams, useLocation} from "react-router-dom";
import {DocumentService} from "service/api";

import {
    FolderBreadcrumb,
    FolderChangeView,
    FolderList,
    FolderTable,
} from "../presentational";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import {useFolderView} from "../provider";
import {FileUploadSection} from "../common";

const ListFolder = ({path}) => {
    const {id: projectId} = useParams();
    const location = useLocation();

    const basePath = `/projects/${projectId}/documents/`;

    const {view} = useFolderView();

    const [folderElements, setFolderElements] = useState([]);
    const [selectedElement, setSelectedElement] = useState(null);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        DocumentService.get(path).then(element => {
            console.log({element});
            if (element.content_type) {
                // is a file
                setSelectedElement(element);
                const folderPath = element.path
                    .split("/")
                    .slice(0, -1)
                    .join("/");
                DocumentService.get(folderPath).then(folder => {
                    setFolderElements(folder.children);
                    setLoading(false);
                });
            } else {
                // is a folder
                setFolderElements(element.children);
                setLoading(false);
            }
        });
    }, [path, location.state?.lastRefreshDate]);

    const reloadFolder = file => {
        console.log("reloadFolder", {file});
        DocumentService.get(path).then(folder => {
            setFolderElements(folder.children);
        });
    };

    const onSelectElement = element => {
        setSelectedElement(element);
    };

    return (
        <Grid container justifyContent="flex-start" alignItems="center" spacing={2}>
            <Grid item container justifyContent="space-between" xs={12}>
                <FolderBreadcrumb path={path} basePath={basePath} />
                <FolderChangeView />
            </Grid>
            {/* TODO: Hack to know if is root folder. Will be changed when folder permissions are working. */}
            {path.indexOf("/") >= 0 && (
                <Grid item container xs={12}>
                    <FileUploadSection path={path} onFinishUpload={reloadFolder} />
                </Grid>
            )}
            <Grid item container xs={12}>
                {loading ? (
                    <Grid item container justifyContent="center" xs={12}>
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
                        onUpdate={reloadFolder}
                    />
                )}
            </Grid>
        </Grid>
    );
};

export default ListFolder;