import {useState} from "react";

import {ProviderSearchAutocomplete, ProviderSummary} from "./";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const ProviderFormSearch = ({onSelect = null, onCancel = null}) => {
    const [existingProvider, setExistingProvider] = useState(null);

    const handleSelectExistingProvider = provider => {
        setExistingProvider(provider);
    };

    return (
        <Grid container spacing={2} sx={{mt: 0.25}}>
            <Grid item xs={12}>
                <ProviderSearchAutocomplete
                    handleSelect={handleSelectExistingProvider}
                />
            </Grid>
            <Grid item xs={12}>
                {existingProvider && <ProviderSummary provider={existingProvider} />}
            </Grid>
            <Grid container justifyContent="center" sx={{mt: 2}}>
                <Grid>
                    {onCancel && (
                        <Button color="inherit" onClick={onCancel}>
                            Cancelar
                        </Button>
                    )}
                    {onSelect && (
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ml: 3}}
                            onClick={() => {
                                onSelect(existingProvider);
                            }}
                        >
                            Añadir
                        </Button>
                    )}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ProviderFormSearch;
