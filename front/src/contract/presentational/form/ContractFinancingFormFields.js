import Grid from "@mui/material/Grid";
import {FormFinancingProgramAutocomplete} from "financing/presentational";

const ContractFinancingFormFields = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <FormFinancingProgramAutocomplete
                    name="financing_program"
                    label="Programa de financiación"
                />
            </Grid>
        </Grid>
    );
};

export default ContractFinancingFormFields;
