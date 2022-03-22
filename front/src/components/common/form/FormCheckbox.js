import {useController, useFormContext} from "react-hook-form";

import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";

const FormCheckbox = ({name: propsName, label, rules = {}, onChangeHandler = null}) => {
    const {control} = useFormContext();
    const {
        field: {onChange, name, value, ref},
        fieldState: {error},
    } = useController({
        name: propsName,
        control,
        rules,
    });

    return (
        <FormControl error={Boolean(error)} margin="normal">
            <FormControlLabel
                label={label}
                name={name}
                inputRef={ref}
                defaultValue={value}
                value={value}
                control={
                    <Checkbox
                        checked={value}
                        onChange={event => {
                            if (onChangeHandler) {
                                onChangeHandler(event.target.checked);
                            }
                            onChange(event);
                        }}
                    />
                }
            />
            <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
    );
};

export default FormCheckbox;
