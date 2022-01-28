import {FormProvider, useForm} from "react-hook-form";

import {SectionCard} from "components/common/presentational";
import Box from "@mui/material/Box";
import FileUploadZone from "./FileUploadZone";
import {DocumentService} from "service/api";

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
    const methods = useForm({
        defaultValues: {
            fileInput: "", // aux field to manage file input
            files: [],
        },
    });

    const handleOnProgress = event => {
        console.log("handleOnProgress", {event});
    };

    const handleOnFinish = event => {
        console.log("handleOnFinish", {event});
        onFinishUpload();
    };

    const handleUpload = data => {
        console.log({data});
        DocumentService.upload(data.files[0], path, handleOnFinish, handleOnProgress);
    };

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
            </Box>
        </FormProvider>
    );
};

export default FileUploadSection;
