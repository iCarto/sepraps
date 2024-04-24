import {useDomain} from "sepraps/domain/provider";
import {FormDatePicker, FormInputText, FormSelect} from "base/form/components";
import Grid from "@mui/material/Grid";

const SocialComponentFormDataFields = ({projectId}) => {
    const {executionStatusTypes} = useDomain();
    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <FormInputText
                    name="name"
                    label="Nombre del componente"
                    rules={{required: "Este campo es obligatorio"}}
                />
            </Grid>
            <Grid item xs={4}>
                <FormDatePicker
                    name="expected_end_date"
                    label="Fecha de finalización prevista"
                    rules={{required: "Este campo es obligatorio"}}
                />
            </Grid>
            <Grid item xs={4}>
                <FormSelect
                    name="execution_status"
                    label="Estado de ejecución"
                    options={executionStatusTypes}
                />
            </Grid>
        </Grid>
    );
};

export default SocialComponentFormDataFields;
