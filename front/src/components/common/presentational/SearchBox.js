import {useState} from "react";
import {useForm} from "react-hook-form";

import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

// ---------> TO-DO: IMPLEMENT CONTROLLED SEARCH (SearchBoxControlled COMPONENT)

const SearchBox = ({searchValue, handleSearch}) => {
    const [isSearchActive, setIsSearchActive] = useState(false);

    const {register, handleSubmit, reset} = useForm();

    const handleForm = data => {
        data.searchText.length !== 0
            ? setIsSearchActive(true)
            : setIsSearchActive(false);

        handleSearch(data.searchText);
    };

    const clearSearchValue = () => {
        reset({searchText: ""});
        setIsSearchActive(false);
        handleSearch("");
    };

    return (
        <FormControl variant="outlined" onChange={handleSubmit(handleForm)}>
            <InputLabel htmlFor="searchText">Buscar</InputLabel>
            <OutlinedInput
                id="searchText"
                type="text"
                {...register("searchText")}
                defaultValue={searchValue}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            edge="end"
                            onClick={isSearchActive ? clearSearchValue : handleForm}
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

export default SearchBox;
