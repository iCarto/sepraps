import {FileUtil} from "base/file/utilities";

import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ClearIcon from "@mui/icons-material/Clear";

const PendingFile = ({file, onRemove}) => {
    return (
        <ListItem
            sx={{border: "1px dotted grey", borderRadius: "8px", mb: "6px"}}
            secondaryAction={
                <IconButton
                    edge="end"
                    aria-label="remove"
                    onClick={() => onRemove(file)}
                >
                    <ClearIcon />
                </IconButton>
            }
        >
            <ListItemIcon>
                <FileUploadIcon />
            </ListItemIcon>
            <ListItemText
                primary={file.name}
                secondary={FileUtil.formatBytes(file.size)}
            />
        </ListItem>
    );
};

export default PendingFile;
