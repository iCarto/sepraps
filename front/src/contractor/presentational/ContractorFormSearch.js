import {useState} from "react";

import {ContractorSearchAutocomplete, ContractorSummary} from ".";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const ContractorFormSearch = ({onSubmit = null, onCancel = null}) => {
    const [existingContractor, setExistingContractor] = useState(null);

    const handleSelectExistingContractor = contractor => {
        setExistingContractor(contractor);
    };

    return (
        <Grid container spacing={2} sx={{mt: 0.25}}>
            <Grid item xs={12}>
                <ContractorSearchAutocomplete
                    handleSelect={handleSelectExistingContractor}
                />
            </Grid>
            <Grid item xs={12}>
                {existingContractor && (
                    <ContractorSummary contractor={existingContractor} />
                )}
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
                                onSubmit(existingContractor);
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

export default ContractorFormSearch;
