import {useDomain} from "sepraps/domain/provider";
import {FormInputText, FormSelectMultiple, FormTextArea} from "base/form/components";
import Grid from "@mui/material/Grid";

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
                    label="Servicios prestados"
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
