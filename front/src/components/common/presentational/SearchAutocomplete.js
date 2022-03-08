import {Fragment, useState} from "react";

import Autocomplete from "@mui/material/Autocomplete";
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
    optionComponent,
    search,
    handleSelect,
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

    return (
        <Autocomplete
            id="check-autocomplete"
            options={state.data}
            onChange={handleSelectOption}
            getOptionLabel={data => data[optionLabel]}
            renderOption={(props, option, {selected}) => (
                <Box component="li" {...props} key={option.id}>
                    {optionComponent(option)}
                </Box>
            )}
            forcePopupIcon={false}
            noOptionsText="No se han encontrado resultados"
            loading={state.loading}
            renderInput={params => (
                <TextField
                    {...params}
                    label={label}
                    variant="outlined"
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
                            <Fragment>
                                {state.loading ? (
                                    <CircularProgress color="inherit" size={20} />
                                ) : null}
                                {params.InputProps.endAdornment}
                            </Fragment>
                        ),
                    }}
                />
            )}
        />
    );
};

export default SearchAutocomplete;
