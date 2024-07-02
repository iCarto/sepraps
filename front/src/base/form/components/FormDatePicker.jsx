import {useController, useFormContext} from "react-hook-form";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import {DateUtil} from "base/format/utilities";
import Stack from "@mui/material/Stack";
import {DateHelperDialogWidget} from "base/shared/components";
import InputAdornment from "@mui/material/InputAdornment";

const FormDatePicker = ({
    name: propsName,
    label,
    rules = {},
    onChangeHandler = null,
    disabled = false,
    views = ["year", "month", "day"],
    margin = "dense",
    showCalculator = false,
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

    const inputLabel = rules && rules["required"] ? `${label} *` : label;

    const onChange = value => {
        const formattedDate = DateUtil.formatDateForAPI(value);
        field.onChange(formattedDate); // data sent back to hook form
        if (onChangeHandler) {
            onChangeHandler(formattedDate);
        }
    };

    return (
        <Stack direction="row" alignItems="center">
            <DatePicker
                onChange={onChange}
                inputRef={field.ref}
                label={inputLabel}
                views={views}
                value={DateUtil.parseDateFromApi(field.value)}
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
                        sx={{backgroundColor: "white"}}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <Stack direction="row" alignItems="center">
                                    {params.InputProps.endAdornment}
                                    {showCalculator && (
                                        <InputAdornment position="end">
                                            <DateHelperDialogWidget
                                                onSelectDate={onChange}
                                            />
                                        </InputAdornment>
                                    )}
                                </Stack>
                            ),
                        }}
                    />
                )}
            />
        </Stack>
    );
};

export default FormDatePicker;
