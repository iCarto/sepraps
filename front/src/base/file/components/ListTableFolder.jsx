import {useState, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";

import {DocumentService} from "base/file/service";
import {useAuth} from "base/user/provider";

import {AuthAction} from "base/user/components";
import {Spinner} from "base/shared/components";
import {FileUploadSection, FolderTable} from "base/file/components";

import Grid from "@mui/material/Grid";

const ListTableFolder = ({folderPath, basePath}) => {
    const navigate = useNavigate();

    const [folderElement, setFolderElement] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

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
        navigate(`document/${folderElement.id}`);
    };

    return (
        <Grid container justifyContent="flex-start" alignItems="center">
            {isLoading ? (
                <Grid item container xs={12} mb={4}>
                    <Spinner />
                </Grid>
            ) : null}
            {folderElement?.children.length ? (
                <Grid item container xs={12} mb={4}>
                    <FolderTable
                        folderElements={folderElement?.children}
                        selectedElement={null}
                        onSelectElement={handleSelectElement}
                        basePath={basePath}
                    />
                </Grid>
            ) : null}
            <AuthAction roles={[ROLES.EDIT, ROLES.MANAGEMENT, ROLES.SUPERVISION]}>
                <Grid item container xs={12}>
                    <FileUploadSection
                        path={folderPath}
                        onFinishUpload={reloadFolder}
                    />
                </Grid>
            </AuthAction>
        </Grid>
    );
};

export default ListTableFolder;
