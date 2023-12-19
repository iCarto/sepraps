import {CURRENCY_SYMBOL} from "base/format/config/i18n";
import {useDomain} from "sepraps/domain/provider";
import {useGetBuildingComponentTypes} from "buildingComponent/utilities";
import {
    FormBox,
    FormDatePicker,
    FormInputInteger,
    FormInputText,
    FormSelect,
} from "base/form/components";
import Grid from "@mui/material/Grid";

const BuildingComponentFormDataFields = ({projectId}) => {
    const {executionStatusTypes} = useDomain();
    const bcTypes = useGetBuildingComponentTypes(projectId);

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
                        options={bcTypes}
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
                    <FormInputInteger
                        name="expected_amount"
                        label="Monto previsto"
                        endAdornment={CURRENCY_SYMBOL}
                        rules={{required: "Este campo es obligatorio"}}
                    />
                </FormBox>
            </Grid>
        </Grid>
    );
};

export default BuildingComponentFormDataFields;
