import {useState} from "react";
import {FormProvider, useForm} from "react-hook-form";

import SelectFileSection from "./SelectFileSection";
import UploadingFileSection from "./UploadingFileSection";

import Grid from "@mui/material/Grid";

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
    const [filesInUploadProgress, setFilesInUploadProgress] = useState([]);

    const formMethods = useForm({
        defaultValues: {
            fileInput: "", // aux field to manage file input
            files: [],
        },
    });

    const handleUpload = data => {
        setFilesInUploadProgress(data.files);
        formMethods.reset();
    };

    return (
        <FormProvider {...formMethods}>
            <Grid
                container
                component="form"
                onSubmit={formMethods.handleSubmit(handleUpload)}
            >
                <Grid item xs={12}>
                    <SelectFileSection
                        formFilesName="files"
                        formFileInputName="fileInput"
                        rules={{validate: maxFileSize}}
                    />
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
