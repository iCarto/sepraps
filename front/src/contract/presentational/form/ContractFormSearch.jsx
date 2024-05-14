import {useState} from "react";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {ContractSearchAutocomplete, ContractSummary} from "..";

const ContractFormSearch = ({
    onClickSelected = null,
    onSubmit = null,
    onCancel = null,
}) => {
    const [existingContract, setExistingContract] = useState(null);

    const handleSelectExistingContract = contract => {
        if (onClickSelected) {
            onClickSelected(contract);
        }
        setExistingContract(contract);
    };

    return (
        <Grid container spacing={2} sx={{mt: 0.25}}>
            <Grid item xs={12}>
                <ContractSearchAutocomplete
                    handleSelect={handleSelectExistingContract}
                />
            </Grid>
            <Grid item xs={12}>
                {existingContract && <ContractSummary contract={existingContract} />}
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
                                onSubmit(existingContract);
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

export default ContractFormSearch;
