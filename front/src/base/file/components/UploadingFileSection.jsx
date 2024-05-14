import {useEffect, useState} from "react";

import {DocumentService} from "../service";

import UploadingFile from "./UploadingFile";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";

const UploadingFileSection = ({files, path, onFinishUpload}) => {
    const [uploadingFiles, setUploadingFiles] = useState([]);

    useEffect(() => {
        let filesToUpload = [];

        files.forEach(file => {
            filesToUpload.push(
                DocumentService.upload(
                    file,
                    path,
                    handleOnFinish,
                    handleOnProgress,
                    handleOnAbort,
                    handleOnError
                )
            );
        });
        setUploadingFiles(filesToUpload);
    }, [files]);

    const handleOnProgress = (uploadingFileUpdated, event) => {
        console.log("handleOnProgress", {uploadingFileUpdated});
        setUploadingFiles(prevUploadingFiles => {
            return prevUploadingFiles.map(uploadingFile => {
                if (uploadingFile.name === uploadingFileUpdated.name) {
                    return {
                        ...uploadingFileUpdated,
                    };
                }
                return uploadingFile;
            });
        });
    };

    const handleOnFinish = (uploadingFileUpdated, event) => {
        setUploadingFiles(prevUploadingFiles => {
            return prevUploadingFiles.map(uploadingFile => {
                if (uploadingFile.name === uploadingFileUpdated.name) {
                    return {
                        ...uploadingFileUpdated,
                    };
                }
                return uploadingFile;
            });
        });
        // Remove from list after 5 secs.
        setTimeout(() => {
            handleOnRemove(uploadingFileUpdated);
        }, 5000);
        onFinishUpload(uploadingFileUpdated);
    };

    const handleOnAbort = (uploadingFileUpdated, event) => {
        setUploadingFiles(prevUploadingFiles => {
            return prevUploadingFiles.filter(
                uploadingFile => uploadingFile.name !== uploadingFileUpdated.name
            );
        });
    };

    const handleOnError = (uploadingFileUpdated, event) => {
        setUploadingFiles(prevUploadingFiles => {
            return prevUploadingFiles.map(uploadingFile => {
                if (uploadingFile.name === uploadingFileUpdated.name) {
                    return {
                        ...uploadingFileUpdated,
                    };
                }
                return uploadingFile;
            });
        });
    };

    const handleOnRemove = uploadingFileUpdated => {
        console.log("handleOnRemove", uploadingFileUpdated);
        setUploadingFiles(prevUploadingFiles => {
            return prevUploadingFiles.filter(
                uploadingFile => uploadingFile.name !== uploadingFileUpdated.name
            );
        });
    };

    const handleCancel = uploadingFile => {
        console.log("handleCancel", uploadingFile);
        // Request abort not working properly in Django side
        // uploadingFile.request.abort();
    };

    return (
        uploadingFiles.length > 0 && (
            <List dense>
                <ListSubheader sx={{textTransform: "uppercase"}}>
                    Subiendo archivos
                </ListSubheader>
                {uploadingFiles.map(fileInUploadProgress => {
                    return (
                        <UploadingFile
                            key={fileInUploadProgress.name}
                            file={fileInUploadProgress}
                            onCancel={handleCancel}
                            onRemove={handleOnRemove}
                        />
                    );
                })}
            </List>
        )
    );
};

export default UploadingFileSection;
