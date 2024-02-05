import {useState} from "react";

import Autocomplete, {createFilterOptions} from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";

const WAIT_INTERVAL = 500;
let timerID;

const SearchAutocomplete = ({
    label,
    optionLabel,
    optionLabelSecondary = "",
    optionComponent,
    getFilterOption = null,
    search,
    handleSelect,
    defaultValue = null,
}) => {
    // If "loading" and "data" are managed in different state
    // properties, component will re-render on every change.
    // https://reactjs.org/docs/state-and-lifecycle.html#state-updates-may-be-asynchronous
    // https://blog.isquaredsoftware.com/2020/05/blogged-answers-a-mostly-complete-guide-to-react-rendering-behavior/#render-batching-and-timing
    // This problem is mitigated by batching the state solutions
    // planned for version 18
    // https://github.com/reactwg/react-18/discussions/21
    const [state, setState] = useState({
        loading: false,
        data: [],
    });

    const handleSelectOption = (event, value) => {
        handleSelect(value);
    };

    const searchData = async value => {
        setState(prevState => {
            return {
                ...prevState,
                loading: true,
            };
        });
        const contractors = await search(value);
        setState({
            loading: false,
            data: contractors,
        });
    };

    const handleSearchChange = async value => {
        clearTimeout(timerID);

        timerID = setTimeout(() => {
            searchData(value);
        }, WAIT_INTERVAL);
    };

    const getOptionLabel = data => {
        if (optionLabelSecondary)
            return `${data[optionLabel]} - ${data[optionLabelSecondary]}`;
        else return data[optionLabel];
    };

    return (
        <Autocomplete
            id="check-autocomplete"
            options={state.data}
            noOptionsText={"No hay opciones disponibles"}
            defaultValue={defaultValue}
            onChange={handleSelectOption}
            getOptionLabel={data => getOptionLabel(data)}
            filterOptions={createFilterOptions({
                stringify: option =>
                    getFilterOption ? getFilterOption(option) : option[optionLabel],
            })}
            renderOption={(props, option, {selected}) => {
                return (
                    <Box component="li" {...props} key={option.id}>
                        {optionComponent(option)}
                    </Box>
                );
            }}
            forcePopupIcon={false}
            loading={state.loading}
            renderInput={params => (
                <TextField
                    fullWidth
                    label={label}
                    variant="outlined"
                    {...params}
                    onChange={ev => {
                        // dont fire API if the user delete or not entered anything
                        if (ev.target.value !== "" || ev.target.value !== null) {
                            handleSearchChange(ev.target.value);
                        }
                    }}
                    InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                            <InputAdornment position="start">
                                {" "}
                                <SearchIcon />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <>
                                {state.loading ? (
                                    <CircularProgress color="inherit" size={20} />
                                ) : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                    sx={{backgroundColor: "white"}}
                />
            )}
        />
    );
};

export default SearchAutocomplete;
