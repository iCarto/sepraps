import {FormProvider, useForm} from "react-hook-form";

import Box from "@mui/material/Box";
import FileUploadZone from "./FileUploadZone";
import {DocumentService} from "service/api";
import {useState} from "react";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import LinearProgress from "@mui/material/LinearProgress";

const maxFileSize = value => {
    // TODO refactor
    const files = Array.from(value);
    let valid = true;
    let message = "";
    for (const file of files) {
        if (file.size > 200000000) {
            message += `El archivo ${file.name} tiene un tamaño superior a 2Mb\n`;
            valid = false;
        }
    }
    return valid ? true : message;
};

const FileUploadSection = ({path, onFinishUpload}) => {
    const [filesInUploadProgress, setFilesInUploadProgress] = useState([]);

    const methods = useForm({
        defaultValues: {
            fileInput: "", // aux field to manage file input
            files: [],
        },
    });

    const handleOnProgress = (file, progress, event) => {
        console.log("handleOnProgress", {file}, {progress});
        setFilesInUploadProgress(filesInUploadProgressPrevious => {
            console.log({pendentFilesListPrevious: filesInUploadProgressPrevious});
            return filesInUploadProgressPrevious.map(fileToUpload => {
                console.log("filesInUploadProgress.map", fileToUpload);
                if (fileToUpload.name === file.name) {
                    const updatedFileToUpload = {
                        ...fileToUpload,
                        progress,
                    };

                    return updatedFileToUpload;
                }

                return fileToUpload;
            });
        });
    };

    const handleOnFinish = (file, event) => {
        console.log("handleOnFinish", {file});
        setFilesInUploadProgress(filesInUploadProgressPrevious => {
            return filesInUploadProgressPrevious.filter(
                fileToUpload => fileToUpload.name !== file.name
            );
        });
        onFinishUpload(file);
    };

    const handleUpload = data => {
        let filesToUpload = data.files.map(file => {
            return {
                file: file,
                name: file.name,
                progress: 0,
            };
        });
        methods.reset();

        setFilesInUploadProgress(filesToUpload);

        filesToUpload.forEach(fileToUpload => {
            DocumentService.upload(
                fileToUpload.file,
                path,
                handleOnFinish,
                handleOnProgress
            );
        });
    };

    const handleCancel = file => {
        console.log("handleCancel", file);
    };

    const filesInUploadProgressItems = filesInUploadProgress.map(fileToUpload => {
        console.log(
            "filesInUploadProgressItems",
            fileToUpload.name,
            fileToUpload.progress
        );
        return (
            <ListItem
                key={fileToUpload.name}
                divider
                secondaryAction={
                    <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleCancel(fileToUpload.file)}
                    >
                        <CancelIcon />
                    </IconButton>
                }
            >
                <ListItemIcon>
                    <InsertDriveFileIcon />
                </ListItemIcon>
                <ListItemText
                    primary={fileToUpload.name}
                    secondary={
                        <LinearProgress
                            variant="determinate"
                            value={fileToUpload.progress}
                        />
                    }
                />
            </ListItem>
        );
    });

    console.log("FileUploadSection", filesInUploadProgress.length);

    return (
        <FormProvider {...methods}>
            <Box
                component="form"
                onSubmit={methods.handleSubmit(handleUpload)}
                sx={{width: "100%"}}
            >
                <FileUploadZone
                    name="files"
                    auxProperty="fileInput"
                    rules={{validate: maxFileSize}}
                />
                <List dense>
                    <ListSubheader sx={{textTransform: "uppercase"}}>
                        Subiendo archivos
                    </ListSubheader>
                    {filesInUploadProgressItems}
                </List>
            </Box>
        </FormProvider>
    );
};

export default FileUploadSection;
