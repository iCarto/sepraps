import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {DocumentService} from "service/api";

import {
    FolderLink,
    DocumentDownloadLink,
    FolderBreadcrumb,
    FolderChangeView,
} from "../presentational";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import {useFolderView} from "../provider";

const ListFolder = ({path}) => {
    const {id: projectId} = useParams();
    const basePath = `/project/${projectId}/documents/`;

    const [folderElements, setFolderElements] = useState([]);
    const [loading, setLoading] = useState(false);

    const {view} = useFolderView();

    useEffect(() => {
        setLoading(true);
        DocumentService.getFolder(path).then(folder => {
            console.log({folder});
            setLoading(false);
            setFolderElements(folder.children);
        });
    }, [path]);

    console.log("ListFolder", loading);
    console.log({view});

    return (
        <Grid container justifyContent="flex-start" alignItems="center" spacing={2}>
            {loading ? (
                <Grid item container justifyContent="center" xs={12}>
                    <CircularProgress color="inherit" size={20} />
                </Grid>
            ) : (
                <>
                    <Grid item container justifyContent="space-between" xs={12}>
                        <FolderBreadcrumb path={path} basePath={basePath} />
                        <FolderChangeView />
                    </Grid>
                    {folderElements.map(folderElement => {
                        if (folderElement.children) {
                            return (
                                <Grid item xs={3} key={folderElement.name}>
                                    <FolderLink
                                        path={folderElement.path}
                                        basePath={basePath}
                                        name={folderElement.name}
                                    />
                                </Grid>
                            );
                        } else {
                            return (
                                <Grid item xs={3} key={folderElement.name}>
                                    <DocumentDownloadLink
                                        path={folderElement.path}
                                        name={folderElement.name}
                                        contentType={folderElement.content_type}
                                    />
                                </Grid>
                            );
                        }
                    })}
                </>
            )}
        </Grid>
    );
};

export default ListFolder;
