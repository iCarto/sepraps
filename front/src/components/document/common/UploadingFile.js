import {FileUtil} from "utilities";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CircularProgress from "@mui/material/CircularProgress";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import CloseIcon from "@mui/icons-material/Close";
import ErrorIcon from "@mui/icons-material/Error";
import Alert from "@mui/material/Alert";

const UploadingFile = ({file: uploadingFile, onCancel, onRemove}) => {
    const getUploadingFileStatus = () => {
        if (uploadingFile.error) {
            return <ErrorIcon color="error" />;
        } else if (uploadingFile.stored) {
            return <FileDownloadDoneIcon color="success" />;
        } else {
            return (
                <CircularProgress
                    variant="determinate"
                    value={uploadingFile.progress}
                />
            );
        }
    };

    const getCancelAction = () => {
        return (
            uploadingFile.progress !== 100 && (
                <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => onCancel(uploadingFile)}
                >
                    <CancelIcon />
                </IconButton>
            )
        );
    };

    const getInfoText = () => {
        if (uploadingFile.error) {
            return (
                <Alert icon={false} severity="error">
                    {uploadingFile.error}
                </Alert>
            );
        } else if (uploadingFile.progress !== 100) {
            return (
                "Subidos " +
                FileUtil.formatBytes(
                    uploadingFile.file.size * (uploadingFile.progress / 100)
                ) +
                " de " +
                FileUtil.formatBytes(uploadingFile.file.size)
            );
        } else {
            return FileUtil.formatBytes(uploadingFile.file.size);
        }
    };

    const getPendingSizeInfo = () => {
        return (
            "Subidos " +
            FileUtil.formatBytes(
                uploadingFile.file.size * (uploadingFile.progress / 100)
            ) +
            " de " +
            FileUtil.formatBytes(uploadingFile.file.size)
        );
    };

    if (uploadingFile.error) {
        return (
            <ListItem divider>
                <ListItemText>
                    <Alert
                        severity="error"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    onRemove(uploadingFile);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        {uploadingFile.name + ": " + uploadingFile.error}
                    </Alert>
                </ListItemText>
            </ListItem>
        );
    } else if (uploadingFile.stored) {
        return (
            <ListItem divider>
                <ListItemText>
                    <Alert severity="success">
                        {uploadingFile.name + ": Se ha almacenado correctamente."}
                    </Alert>
                </ListItemText>
            </ListItem>
        );
    } else {
        return (
            <ListItem divider secondaryAction={getCancelAction()}>
                <ListItemIcon>
                    <CircularProgress
                        variant="determinate"
                        value={uploadingFile.progress}
                    />
                </ListItemIcon>
                <ListItemText
                    primary={uploadingFile.name}
                    secondary={getPendingSizeInfo()}
                />
            </ListItem>
        );
    }
};

export default UploadingFile;
