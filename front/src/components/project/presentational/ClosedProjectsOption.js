import {useController, useFormContext} from "react-hook-form";

import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const ClosedProjectsOption = ({name: propsName}) => {
    const {control} = useFormContext();
    const {
        field: {onChange, name, value, ref},
    } = useController({
        name: propsName,
        control,
    });

    return (
        <FormControlLabel
            label="Archivados"
            id={`${name}-switch-label`}
            control={
                <Switch
                    id={`${name}-switch`}
                    checked={value}
                    inputRef={ref}
                    onChange={event => {
                        onChange(event);
                    }}
                />
            }
        />
    );
};

export default ClosedProjectsOption;
