import {useController, useFormContext} from "react-hook-form";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";

const FormDatePicker = ({
    name: propsName,
    label,
    rules = {},
    onChangeHandler = null,
    views = ["year", "month", "day"],
}) => {
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
            onChange={event => {
                onChange(event);
                if (onChangeHandler) {
                    onChangeHandler(event);
                }
            }}
            value={value}
            inputRef={ref}
            label={label}
            views={views}
            renderInput={params => (
                <TextField
                    {...params}
                    name={name}
                    fullWidth
                    margin="normal"
                    error={Boolean(error)}
                    helperText={error?.message}
                />
            )}
        />
    );
};

export default FormDatePicker;
