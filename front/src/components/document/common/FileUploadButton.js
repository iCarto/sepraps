import {Fragment, useCallback, useRef} from "react";
import {useController, useFormContext} from "react-hook-form";

import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

const FileUploadButton = ({name, onSelectFiles = null, rules = {}}) => {
    // Based on https://stackblitz.com/edit/input-file-react-hook-form

    const {
        control,
        trigger,
        formState: {errors},
    } = useFormContext();

    const {
        field: {ref, onChange},
    } = useController({name, control, rules});

    const handleSelectFile = useCallback(
        async event => {
            if (event.target.files?.[0]) {
                onChange(event.target.files);
                trigger([name]);
                if (onSelectFiles) {
                    var selectedFiles = Array.from(event.target.files);
                    onSelectFiles(selectedFiles);
                }
            }
        },
        [name, onSelectFiles, onChange, trigger]
    );

    const inputRef = useRef(null);

    const triggerInputClick = () => {
        inputRef.current.click();
    };

    return (
        <Fragment>
            <input
                type="file"
                multiple
                hidden
                ref={event => {
                    ref(event);
                    inputRef.current = event;
                }}
                onChange={handleSelectFile}
            />
            <Button onClick={triggerInputClick} variant="outlined" sx={{mt: 3}}>
                Seleccione los archivos en disco
            </Button>
            {errors[name] && <Alert severity="error">{errors[name].message}</Alert>}
        </Fragment>
    );
};

export default FileUploadButton;
