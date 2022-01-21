import {Fragment, useState} from "react";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import {ContactService} from "service/api";

const WAIT_INTERVAL = 500;
let timerID;

const ContactSearchAutocomplete = ({handleSelect}) => {
    // If "loading" and "contacts" are managed in different state
    // properties, component will re-render on every change.
    // https://reactjs.org/docs/state-and-lifecycle.html#state-updates-may-be-asynchronous
    // https://blog.isquaredsoftware.com/2020/05/blogged-answers-a-mostly-complete-guide-to-react-rendering-behavior/#render-batching-and-timing
    // This problem is mitigated by batching the state solutions
    // planned for version 18
    // https://github.com/reactwg/react-18/discussions/21
    const [state, setState] = useState({
        loading: false,
        contacts: [],
    });

    const handleSelectOption = (event, value) => {
        handleSelect(value);
    };

    const searchContacts = async value => {
        setState(prevState => {
            return {
                ...prevState,
                loading: true,
            };
        });
        const contacts = await ContactService.getContactsBySearchText(value);
        setState({
            loading: false,
            contacts,
        });
    };

    const handleSearchChange = async value => {
        clearTimeout(timerID);

        timerID = setTimeout(() => {
            searchContacts(value);
        }, WAIT_INTERVAL);
    };

    console.log("contacts", state.contacts);

    return (
        <Autocomplete
            id="project-contact-check-autocomplete"
            options={state.contacts}
            onChange={handleSelectOption}
            getOptionLabel={contact => contact.name}
            renderOption={(props, contact, {selected}) => (
                <Box component="li" {...props} key={contact.id}>
                    <Stack>
                        <Typography>{contact.name}</Typography>
                        <Typography variant="caption" sx={{ml: 1}}>
                            {contact.post_name}
                        </Typography>
                        <Typography variant="caption" sx={{ml: 1}}>
                            {contact.phone} - {contact.email}
                        </Typography>
                    </Stack>
                </Box>
            )}
            noOptionsText="No se han encontrado contactos"
            loading={state.loading}
            renderInput={params => (
                <TextField
                    {...params}
                    label="Buscar un contacto"
                    variant="outlined"
                    onChange={ev => {
                        // dont fire API if the user delete or not entered anything
                        if (ev.target.value !== "" || ev.target.value !== null) {
                            handleSearchChange(ev.target.value);
                        }
                    }}
                    InputProps={{
                        ...params.InputProps,
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

export default ContactSearchAutocomplete;
