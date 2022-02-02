import {useState} from "react";

import {ProviderSearchAutocomplete, ProviderSection} from "./";

import Grid from "@mui/material/Grid";

const ProviderFormSearch = ({handleSelect}) => {
    const [existingProvider, setExistingProvider] = useState(null);

    const handleSelectExistingProvider = provider => {
        setExistingProvider(provider);
        if (provider) {
            handleSelect(provider);
        }
    };

    return (
        <Grid container spacing={2} sx={{mt: 0.25}}>
            <Grid item xs={12}>
                <ProviderSearchAutocomplete
                    handleSelect={handleSelectExistingProvider}
                />
            </Grid>
            <Grid item xs={12}>
                {existingProvider && (
                    <ProviderSection provider={existingProvider} hideButtons={true} />
                )}
            </Grid>
        </Grid>
    );
};

export default ProviderFormSearch;
