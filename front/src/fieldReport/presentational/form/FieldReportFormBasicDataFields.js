import {FormDatePicker, FormInputText} from "base/form/components";
import Grid from "@mui/material/Grid";

const FieldReportFormBasicDataFields = () => {
    return (
        <>
            <Grid container columnSpacing={1}>
                <Grid item xs={12}>
                    <FormInputText
                        name="name"
                        label="Nombre del informe"
                        rules={{required: "Este campo es obligatorio"}}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormInputText
                        name="code"
                        label="Nº de memorándum"
                        rules={{required: "Este campo es obligatorio"}}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormDatePicker
                        name="visit_date_start"
                        label="Fecha de inicio"
                        rules={{required: "Este campo es obligatorio"}}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormDatePicker
                        name="visit_date_end"
                        label="Fecha de culminación"
                        rules={{required: "Este campo es obligatorio"}}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormInputText
                        name="reporting_person"
                        label="Autor/a del informe (nombre y cargo)"
                        rules={{required: "Este campo es obligatorio"}}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default FieldReportFormBasicDataFields;
