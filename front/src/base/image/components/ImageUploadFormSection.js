import {useEffect, useState} from "react";
import {useController, useFormContext} from "react-hook-form";

import {ImagePreview, ImageUploadButton} from ".";
import {ContainerWithLabel} from "base/shared/components";

import Grid from "@mui/material/Grid";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import Alert from "@mui/material/Alert";

const validateSize = files => {
    const invalidFiles = files.filter(file => {
        const isFileTypeValid = validateFileType(file, [
            "image/jpg",
            "image/jpeg",
            "image/png",
        ]);
        const isFileSizeValid = validateFileMaxSize(file, 20000000);
        return !isFileTypeValid || !isFileSizeValid;
    });
    if (invalidFiles.length === 0) {
        return true;
    }
    for (const file of invalidFiles) {
        let message = "";
        if (!validateFileType(file, ["image/jpg", "image/jpeg", "image/png"])) {
            message += "El archivo debe ser de tipo jpf, jpeg o png. ";
        }
        if (!validateFileMaxSize(file, 20000000)) {
            message += `El archivo ${file.name} tiene un tamaño superior a 20Mb\n`;
        }
        return message;
    }
};

const validateFileType = (file, fileTypes) => {
    return fileTypes.includes(file.type);
};

const validateFileMaxSize = (file, maxSize) => {
    return file.size <= maxSize;
};

const ImageUploadFormSection = ({name, formFileInputName}) => {
    const {
        getValues,
        control,
        formState: {errors},
        trigger,
    } = useFormContext();

    const {
        field: {onChange},
    } = useController({name: name, control, rules: {validate: validateSize}});

    const [isDropAreaActive, setIsDropAreaActive] = useState(false);
    const [error, setError] = useState({});

    // TO-DO: Prevent adding file to fileList if validation fails. Functions are only getting errors[name] on next upload ??
    const fileList = getValues()[name];

    useEffect(() => {
        setError(errors);
    }, [fileList]);

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

    const handleCancel = () => {
        const updatedFileList = [];
        onChange(updatedFileList);
    };

    return (
        <ContainerWithLabel label="Añadir imágenes" isAreaActive={isDropAreaActive}>
            <Grid
                container
                spacing={1}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDropFile}
            >
                {fileList?.length
                    ? fileList.map((image, index) => (
                          <Grid item xs={4} md={2.5} key={index}>
                              <ImageListItem>
                                  <ImagePreview path={image.path} />
                                  <ImageListItemBar
                                      title={`Imagen ${index + 1}`}
                                      position="top"
                                      actionIcon={
                                          <IconButton
                                              sx={{
                                                  color: "grey.400",
                                              }}
                                              aria-label={`Eliminar imagen ${index}`}
                                              onClick={() => handleRemove(image)}
                                          >
                                              <CancelIcon />
                                          </IconButton>
                                      }
                                  />
                              </ImageListItem>
                          </Grid>
                      ))
                    : null}
                <Grid item container xs={4} md={2}>
                    <ImageUploadButton
                        name={formFileInputName}
                        onSelectFiles={handleSelectFiles}
                    />
                </Grid>
            </Grid>
            <Grid mt={2}>
                {errors[name] && <Alert severity="error">{errors[name].message}</Alert>}
            </Grid>
        </ContainerWithLabel>
    );
};

export default ImageUploadFormSection;
