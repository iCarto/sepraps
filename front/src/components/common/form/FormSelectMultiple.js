import {useController, useFormContext} from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import OutlinedInput from "@mui/material/OutlinedInput";

const FormSelectMultiple = ({name: propsName, label, options, rules = {}}) => {
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
        console.log({optionValues});
        if (optionValues) {
            return optionValues
                .map(
                    optionValue =>
                        options.find(option => option.value === optionValue).label
                )
                .join(", ");
        }
        return "";
    };

    return (
        <FormControl fullWidth error={Boolean(error)} margin="normal">
            <InputLabel id={`${name}-label`}>{label}</InputLabel>
            <Select
                labelId={`${name}-label`}
                name={name}
                inputRef={ref}
                value={value}
                onChange={onChange}
                multiple
                input={<OutlinedInput label={label} />}
                renderValue={selected => getOptionLabels(selected)}
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
