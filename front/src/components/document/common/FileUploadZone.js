import {useState, Fragment} from "react";
import {useController, useFormContext} from "react-hook-form";
import {FileUtil} from "utilities";

import FileUploadButton from "./FileUploadButton";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DeleteIcon from "@mui/icons-material/Delete";
import Alert from "@mui/material/Alert";

const FileUploadZone = ({name, auxProperty = null, rules}) => {
    const {
        getValues,
        control,
        formState: {errors},
        trigger,
    } = useFormContext();

    const {
        field: {onChange},
    } = useController({name, control, rules});

    const [isDropAreaActive, setIsDropAreaActive] = useState(false);

    const handleSelectFiles = async fileList => {
        handleAdd(fileList);
    };

    const handleDropFile = async event => {
        event.preventDefault();
        setIsDropAreaActive(false);
        var selectedFiles = Array.from(event.dataTransfer.files);
        handleAdd(selectedFiles);
    };

    const handleDragOver = event => {
        event.preventDefault();
        setIsDropAreaActive(true);
    };

    const handleDragLeave = () => {
        setIsDropAreaActive(false);
    };

    const handleAdd = files => {
        const values = getValues();
        const updatedFileList = [...values[name], ...files];
        onChange(updatedFileList);
        trigger([name]);
    };

    const handleRemove = fileToRemove => {
        const values = getValues();
        const updatedFileList = values[name].filter(
            file => file.name !== fileToRemove.name
        );
        onChange(updatedFileList);
        trigger([name]);
    };

    const fileList = getValues()[name];

    const fileItems = fileList.map((file, index) => {
        return (
            <ListItem
                key={index}
                divider
                secondaryAction={
                    <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleRemove(file)}
                    >
                        <DeleteIcon />
                    </IconButton>
                }
            >
                <ListItemIcon>
                    <InsertDriveFileIcon />
                </ListItemIcon>
                <ListItemText
                    primary={file.name}
                    secondary={FileUtil.formatBytes(file.size)}
                />
            </ListItem>
        );
    });

    return (
        <Fragment>
            <Box
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDropFile}
                backgroundColor={isDropAreaActive ? "grey.200" : "none"}
                height="200px"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    p: 3,
                    border: "1px solid grey",
                    borderRadius: 5,
                }}
            >
                <CloudUploadIcon sx={{color: "grey.500"}} fontSize="large" />
                <Typography>
                    {isDropAreaActive
                        ? "Suelte sus archivos"
                        : "Arrastre aquí sus archivos"}
                </Typography>
                {auxProperty && (
                    <>
                        <Typography>o</Typography>
                        <FileUploadButton
                            name={auxProperty}
                            onSelectFiles={handleSelectFiles}
                        />
                    </>
                )}
            </Box>
            {errors[name] && (
                <Alert severity="error" sx={{mt: 2}}>
                    {errors[name].message}
                </Alert>
            )}
            <Box sx={{m: 1}}>
                {fileList.length > 0 ? (
                    <>
                        <List dense>
                            <ListSubheader sx={{textTransform: "uppercase"}}>
                                Archivos seleccionados
                            </ListSubheader>
                            {fileItems}
                        </List>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{display: "block", mr: 0, ml: "auto"}}
                            disabled={errors.files != null}
                        >
                            Guardar
                        </Button>
                    </>
                ) : null}
            </Box>
        </Fragment>
    );
};

export default FileUploadZone;
