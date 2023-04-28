import {useController, useFormContext} from "react-hook-form";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import {DateUtil} from "base/format/utilities";

const FormDatePicker = ({
    name: propsName,
    label,
    rules = {},
    onChangeHandler = null,
    disabled = false,
    views = ["year", "month", "day"],
    margin = "dense",
}) => {
    const {control} = useFormContext();

    const {
        field,
        fieldState: {error},
    } = useController({
        name: propsName,
        control,
        rules: {
            ...rules,
        },
    });

    return (
        <DatePicker
            onChange={event => {
                const formattedDate = DateUtil.formatDateForAPI(event);
                field.onChange(formattedDate); // data sent back to hook form
                if (onChangeHandler) {
                    onChangeHandler(formattedDate);
                }
            }}
            inputRef={field.ref}
            label={label}
            value={field.value}
            disabled={disabled}
            renderInput={({inputProps, ...params}) => (
                <TextField
                    {...params}
                    inputProps={{
                        ...inputProps,
                        placeholder: "dd/mm/aaaa",
                    }}
                    fullWidth
                    margin={margin}
                    error={Boolean(error)}
                    helperText={error?.message}
                    InputLabelProps={{shrink: true}}
                />
            )}
        />
    );
};

export default FormDatePicker;
