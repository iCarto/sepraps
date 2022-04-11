import {useController, useFormContext} from "react-hook-form";

import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

// ---------> TO-DO: IMPLEMENT CONTROLLED SEARCH IN SEARCHBOX COMPONENT (USED IN ListContractsPage & ViewProjectContractsSubPage) AND MERGE

const SearchBoxControlled = ({name: propsName}) => {
    const {control} = useFormContext();
    const {
        field: {onChange, name, value, ref},
    } = useController({
        name: propsName,
        control,
    });

    const clearSearchValue = value => {
        onChange(value);
    };

    return (
        <FormControl variant="outlined">
            <InputLabel htmlFor="searchText">Buscar</InputLabel>
            <OutlinedInput
                id={`${name}-input`}
                type="text"
                onChange={onChange}
                inputRef={ref}
                value={value}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            edge="end"
                            onClick={
                                value !== ""
                                    ? event => {
                                          clearSearchValue((event.target.value = ""));
                                      }
                                    : undefined
                            }
                        >
                            {value !== "" ? <ClearIcon /> : <SearchIcon />}
                        </IconButton>
                    </InputAdornment>
                }
                label="Buscar"
            />
        </FormControl>
    );
};

export default SearchBoxControlled;
