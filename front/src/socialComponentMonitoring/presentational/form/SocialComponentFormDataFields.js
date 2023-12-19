import {useDomain} from "sepraps/domain/provider";
import {useGetSocialComponentTypes} from "socialComponentMonitoring/utilities";
import {FormBox, FormDatePicker, FormInputText, FormSelect} from "base/form/components";
import Grid from "@mui/material/Grid";

const SocialComponentFormDataFields = ({projectId}) => {
    const {executionStatusTypes} = useDomain();
    const componentTypes = useGetSocialComponentTypes(projectId);

    return (
        <Grid container spacing={2}>
            <Grid container item xs={12} spacing={2}>
                <Grid item xs={4}>
                    <FormInputText
                        name="name"
                        label="Nombre del componente"
                        rules={{required: "Este campo es obligatorio"}}
                    />
                </Grid>
                <Grid item xs={4}>
                    <FormSelect
                        name="code"
                        label="Tipo"
                        options={componentTypes}
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
            <Grid container item xs={6} direction="column">
                <FormBox label="Previsión">
                    <FormDatePicker
                        name="expected_end_date"
                        label="Fecha de fin prevista"
                        rules={{required: "Este campo es obligatorio"}}
                    />
                </FormBox>
            </Grid>
        </Grid>
    );
};

export default SocialComponentFormDataFields;
