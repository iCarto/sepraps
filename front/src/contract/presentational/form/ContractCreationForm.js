import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {FormSection} from "base/form/components";
import {
    ContractGeneralDataFormFields,
    ContractFinancingFormFields,
    ContractBidRequestFormFields,
} from ".";

const ContractCreationForm = ({onSubmit, onCancel = null}) => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <FormSection title="Información general">
                    <ContractGeneralDataFormFields />
                </FormSection>
                <FormSection title="Financiación">
                    <ContractFinancingFormFields />
                </FormSection>
            </Grid>
            <Grid item xs={12} md={6}>
                <FormSection title="Licitación">
                    <ContractBidRequestFormFields />
                </FormSection>
            </Grid>
            <Grid item container justifyContent="center" sx={{mt: 2}}>
                {onCancel && (
                    <Button sx={{ml: 2}} onClick={onCancel}>
                        Cancelar
                    </Button>
                )}
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ml: 3}}
                    onClick={() => onSubmit()}
                >
                    Guardar
                </Button>
            </Grid>
        </Grid>
    );
};

export default ContractCreationForm;
