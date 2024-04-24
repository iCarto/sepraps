import {useState} from "react";

import {ProviderSearchAutocomplete} from "provider/presentational/form";
import {ProviderSummary} from "provider/presentational/section";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const ProviderFormSearch = ({
    onClickSelected = null,
    onSubmit = null,
    onCancel = null,
}) => {
    const [existingProvider, setExistingProvider] = useState(null);

    const handleSelectExistingProvider = provider => {
        if (onClickSelected) {
            onClickSelected(provider);
        }
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
                    {onSubmit && (
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ml: 3}}
                            onClick={() => {
                                onSubmit(existingProvider);
                            }}
                        >
                            Guardar
                        </Button>
                    )}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ProviderFormSearch;
