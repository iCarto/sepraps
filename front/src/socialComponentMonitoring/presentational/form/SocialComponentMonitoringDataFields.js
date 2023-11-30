import {useWatch} from "react-hook-form";

import {COMPONENT_EXECUTION_STATUS_COMPLETED} from "component/config";

import {useDomain} from "sepraps/domain/provider";

import {
    FormBox,
    FormDatePicker,
    FormInputInteger,
    FormSelect,
} from "base/form/components";

import Grid from "@mui/material/Grid";

const SocialComponentMonitoringDataFields = () => {
    const {executionStatusTypes, qualityStatusTypes} = useDomain();

    const execution_status = useWatch({
        name: "execution_status",
    });

    return (
        <Grid container columnSpacing={2}>
            <Grid container item xs={12} spacing={2}>
                <Grid item xs={6}>
                    <FormSelect
                        name="execution_status"
                        label="Estado de ejecución"
                        options={executionStatusTypes}
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormSelect
                        name="quality_status"
                        label="Estado cualitativo"
                        options={qualityStatusTypes}
                    />
                </Grid>
            </Grid>
            <Grid container item xs={6} direction="column">
                <FormBox label="Previsión inicial">
                    <FormDatePicker
                        name="expected_end_date"
                        label="Fecha de fin prevista"
                        rules={{required: "Este campo es obligatorio"}}
                    />
                </FormBox>
            </Grid>
            <Grid container item xs={6} direction="column">
                <FormBox label="Seguimiento">
                    {execution_status === COMPONENT_EXECUTION_STATUS_COMPLETED && (
                        <FormDatePicker
                            name="real_end_date"
                            label="Fecha de finalización real"
                            rules={{required: "Este campo es obligatorio"}}
                        />
                    )}
                    <FormInputInteger
                        name="progress_percentage"
                        label="Porcentaje de avance"
                        endAdornment={"%"}
                        rules={{required: "Este campo es obligatorio"}}
                    />
                </FormBox>
            </Grid>
        </Grid>
    );
};

export default SocialComponentMonitoringDataFields;
