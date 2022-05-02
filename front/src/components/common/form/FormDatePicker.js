import {useController, useFormContext} from "react-hook-form";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";

const FormDatePicker = ({name: propsName, label, rules = {}}) => {
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
        <DatePicker
            onChange={onChange}
            value={value}
            inputRef={ref}
            label={label}
            renderInput={params => (
                <TextField
                    {...params}
                    name={name}
                    margin="normal"
                    error={Boolean(error)}
                    helperText={error?.message}
                />
            )}
        />
    );
};

export default FormDatePicker;
