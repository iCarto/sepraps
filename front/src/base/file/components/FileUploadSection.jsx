import {useEffect, useRef, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";

import SelectFileSection from "./SelectFileSection";
import UploadingFileSection from "./UploadingFileSection";

import Grid from "@mui/material/Grid";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";

const maxFileSize = value => {
    // TODO refactor
    const files = Array.from(value);
    let valid = true;
    let message = "";
    for (const file of files) {
        if (file.size > 20000000) {
            message += `El archivo ${file.name} tiene un tamaño superior a 20Mb\n`;
            valid = false;
        }
    }
    return valid ? true : message;
};

const FileUploadSection = ({path, onFinishUpload}) => {
    const [view, setView] = useState("button");
    const [filesInUploadProgress, setFilesInUploadProgress] = useState([]);

    const selectFileSectionRef = useRef(null);

    const formMethods = useForm({
        defaultValues: {
            fileInput: "", // aux field to manage file input
            files: [],
        },
    });

    useEffect(() => {
        const handleClick = event => {
            handleClickOutsideSelectFileSection(event);
        };

        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);

    const handleUpload = data => {
        setFilesInUploadProgress(data.files);
        formMethods.reset();
    };

    const handleClickOutsideSelectFileSection = event => {
        // If clicked area is NOT select file section, then set view back to "button"
        if (
            selectFileSectionRef.current &&
            !selectFileSectionRef.current.contains(event.target)
        ) {
            setView("button");
        }
    };

    return (
        <FormProvider {...formMethods}>
            <Grid
                container
                component="form"
                onSubmit={formMethods.handleSubmit(handleUpload)}
            >
                <Grid item xs={12}>
                    {view === "button" ? (
                        <Grid container justifyContent="center">
                            <Button
                                id="upload-more"
                                color="secondary"
                                variant="outlined"
                                onClick={() => {
                                    setView("upload");
                                }}
                                endIcon={<CloudUploadIcon />}
                            >
                                Añadir documentos
                            </Button>
                        </Grid>
                    ) : (
                        <div ref={selectFileSectionRef}>
                            <SelectFileSection
                                formFilesName="files"
                                formFileInputName="fileInput"
                                rules={{validate: maxFileSize}}
                            />
                        </div>
                    )}
                </Grid>
                <Grid item xs={12}>
                    <UploadingFileSection
                        files={filesInUploadProgress}
                        path={path}
                        onFinishUpload={onFinishUpload}
                    />
                </Grid>
            </Grid>
        </FormProvider>
    );
};

export default FileUploadSection;
