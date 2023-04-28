import {useController, useFormContext} from "react-hook-form";
import {FormInputLabel} from ".";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import OutlinedInput from "@mui/material/OutlinedInput";

const FormSelectMultiple = ({
    name: propsName,
    label,
    tooltipText = "",
    options,
    rules = {},
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

    const getOptionLabels = optionValues => {
        if (optionValues) {
            return optionValues
                .map(optionValue => {
                    const optionFound = options.find(
                        option => option.value === optionValue
                    );
                    if (optionFound) {
                        return optionFound.label;
                    }
                    return null;
                })
                .join(", ");
        }
        return "";
    };

    // TO-DO: Find a better way to do this: now we are adding a string ("extra") to increase the space that the hidden label is taking so that there is enough space for the info icon.
    const hiddenLabel = tooltipText ? label + "extra" : label;

    return (
        <FormControl fullWidth error={Boolean(error)}>
            <FormInputLabel name={name} label={label} tooltipText={tooltipText} />
            <Select
                labelId={`${name}-label`}
                name={name}
                inputRef={ref}
                value={value}
                onChange={onChange}
                multiple
                input={<OutlinedInput label={hiddenLabel} />}
                renderValue={selected => getOptionLabels(selected)}
                notched
            >
                {options.map(({label: optionLabel, value: optionValue}) => (
                    <MenuItem key={optionValue} value={optionValue}>
                        <Checkbox checked={value.indexOf(optionValue) > -1} />
                        <ListItemText primary={optionLabel} />
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
    );
};

export default FormSelectMultiple;
