import {FileUtil} from "utilities";

import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteIcon from "@mui/icons-material/Delete";

const PendingFile = ({file, onRemove}) => {
    return (
        <ListItem
            divider
            secondaryAction={
                <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => onRemove(file)}
                >
                    <DeleteIcon />
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
