import Grid from "@mui/material/Grid";
import {FormDatePicker} from "base/form/components";

const ContractPostConstructionFormFields = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <FormDatePicker
                    name="warranty_end_date"
                    label="Fin del plazo de garantía"
                />
            </Grid>
        </Grid>
    );
};

export default ContractPostConstructionFormFields;
