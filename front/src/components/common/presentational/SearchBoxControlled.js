import {useState} from "react";
import {useController, useForm, useFormContext} from "react-hook-form";

import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

//TO-DO: IMPLEMENT CONTROLLED SEARCH IN SEARCHBOX COMPONENT AND MERGE

const SearchBoxControlled = ({name: propsName}) => {
    const [isSearchActive, setIsSearchActive] = useState(false);

    const {register, handleSubmit} = useForm();

    const {control} = useFormContext();
    const {
        field: {onChange, name, value, ref},
    } = useController({
        name: propsName,
        control,
    });

    const handleForm = () => {
        value?.length !== 0 ? setIsSearchActive(true) : setIsSearchActive(false);
    };

    const clearSearchValue = value => {
        onChange(value);
        setIsSearchActive(false);
    };

    return (
        <FormControl variant="outlined" onChange={handleSubmit(handleForm)}>
            <InputLabel htmlFor="searchText">Buscar</InputLabel>
            <OutlinedInput
                id={`${name}-input`}
                type="text"
                {...register("searchText")}
                onChange={onChange}
                inputRef={ref}
                // defaultValue={value}
                value={value}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            edge="end"
                            onClick={
                                isSearchActive
                                    ? event => {
                                          clearSearchValue((event.target.value = ""));
                                      }
                                    : handleForm
                            }
                        >
                            {isSearchActive ? <ClearIcon /> : <SearchIcon />}
                        </IconButton>
                    </InputAdornment>
                }
                label="Buscar"
            />
        </FormControl>
    );
};

export default SearchBoxControlled;
