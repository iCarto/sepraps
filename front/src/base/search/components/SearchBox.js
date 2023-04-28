import {useController, useFormContext} from "react-hook-form";

import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const WAIT_INTERVAL = 500;
let timerID;

const SearchBox = ({name: propsName, onChangeHandler = null}) => {
    const {control} = useFormContext();
    const {
        field: {onChange, name, value, ref},
    } = useController({
        name: propsName,
        control,
    });

    const handleSearchChange = async value => {
        if (onChangeHandler) {
            clearTimeout(timerID);

            timerID = setTimeout(() => {
                onChangeHandler(value);
            }, WAIT_INTERVAL);
        }
    };

    const clearSearchValue = value => {
        onChange(value);
        if (onChangeHandler) {
            onChangeHandler(value);
        }
    };

    return (
        <FormControl variant="outlined" fullWidth sx={{mt: 0}}>
            <InputLabel
                htmlFor="searchText"
                sx={{opacity: 0.3, fontStyle: "italic", pr: 1}}
            >
                Buscar
            </InputLabel>
            <OutlinedInput
                type="text"
                id={`${name}-input`}
                inputRef={ref}
                value={value}
                label="Buscar"
                onChange={ev => {
                    ev.preventDefault();
                    onChange(ev);
                    handleSearchChange(ev.target.value);
                }}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="search"
                            edge="end"
                            onClick={
                                value !== ""
                                    ? event => {
                                          event.preventDefault();
                                          clearSearchValue((event.target.value = ""));
                                      }
                                    : undefined
                            }
                        >
                            {value !== "" ? <ClearIcon /> : <SearchIcon />}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    );
};

export default SearchBox;
