import Grid from "@mui/material/Grid";
import {FormInputText, FormSelectMultiple, FormTextArea} from "base/form/components";
import {FormFinancingProgramAutocomplete} from "financing/presentational";
import {useDomain} from "sepraps/domain/provider";

const ContractGeneralDataFormFields = () => {
    const {serviceTypes} = useDomain();

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <FormInputText
                    name="contract_number"
                    label="Número de contrato"
                    rules={{required: "El campo es obligatorio"}}
                />
                <FormSelectMultiple
                    name="services"
                    label="Servicios"
                    options={serviceTypes}
                    rules={{required: "El campo es obligatorio"}}
                />
            </Grid>
            <Grid item xs={6}>
                <FormTextArea name="comments" label="Descripción" />
            </Grid>
        </Grid>
    );
};

export default ContractGeneralDataFormFields;
