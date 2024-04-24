import {useDomain} from "sepraps/domain/provider";
import {FormInputText, FormSelect, FormTextArea} from "base/form/components";
import Grid from "@mui/material/Grid";

const ContractorFormFields = () => {
    const {contractorTypes} = useDomain();

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <FormInputText
                    name="name"
                    label="Nombre del contratista"
                    rules={{required: "El campo es obligatorio"}}
                />
                <FormSelect
                    name="contractor_type"
                    label="Tipo de contratista"
                    options={contractorTypes}
                    rules={{required: "El campo es obligatorio"}}
                />
                <FormTextArea name="comments" label="Observaciones" />
            </Grid>
            <Grid item xs={6}>
                <FormInputText name="address" label="Dirección" />
                <FormInputText name="phone" label="Celular" />
                <FormInputText name="email" label="E-mail" />
            </Grid>
        </Grid>
    );
};

export default ContractorFormFields;
