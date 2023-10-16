import {useState, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "base/user/provider";
import {AuthAction} from "base/user/components";

import {useDownloadDocument} from "base/file/utilities";
import {DocumentService} from "base/file/service";
import {Spinner} from "base/shared/components";
import {FileUploadSection, FolderTable} from "base/file/components";
import Grid from "@mui/material/Grid";

const ListProductFolder = ({folderPath, basePath}) => {
    const navigate = useNavigate();

    const [folderElement, setFolderElement] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const downloadDocument = useDownloadDocument();
    const location = useLocation();
    const {ROLES} = useAuth();

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

    const handleSelectElement = folderElement => {
        // setSelectedElement(folderElement);
        /*if (folderElement.content_type) {
            navigate(baseDocumentsPath + "detail/" + folderElement.path);
        } else {
            navigate(baseDocumentsPath + folderPath);
        }*/
        console.log({folderElement});
        navigate(`document/${folderElement.id}`);
    };

    return (
        <Grid container justifyContent="flex-start" alignItems="center">
            <Grid item container xs={12}>
                {isLoading ? (
                    <Spinner />
                ) : (
                    <FolderTable
                        folderElements={folderElement?.children}
                        selectedElement={null}
                        onSelectElement={handleSelectElement}
                        basePath={basePath}
                    />
                )}
            </Grid>
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

export default ListProductFolder;
