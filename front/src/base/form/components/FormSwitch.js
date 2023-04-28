import {useController, useFormContext} from "react-hook-form";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const FormSwitch = ({name: propsName, onChangeHandler = null}) => {
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
                        if (onChangeHandler) {
                            onChangeHandler(event);
                        }
                    }}
                />
            }
        />
    );
};

export default FormSwitch;
