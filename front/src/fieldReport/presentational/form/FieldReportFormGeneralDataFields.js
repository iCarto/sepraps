import {FormDatePicker, FormInputText} from "base/form/components";
import Grid from "@mui/material/Grid";

const FieldReportFormGeneralDataFields = ({orientation = "column"}) => {
    return (
        <>
            <Grid container columnSpacing={1}>
                <Grid item xs={12} md={orientation === "row" ? 6 : 12}>
                    <FormInputText
                        name="reporting_person_name"
                        label="Autor/a del informe (nombre)"
                        rules={{required: "Este campo es obligatorio"}}
                    />
                </Grid>
                <Grid item xs={12} md={orientation === "row" ? 6 : 12}>
                    <FormInputText
                        name="reporting_person_role"
                        label="Autor/a del informe (cargo)"
                    />
                </Grid>

                <Grid item xs={12} md={orientation === "row" ? 6 : 12}>
                    <FormInputText
                        name="reported_person_name"
                        label="Dirigido a (nombre)"
                        rules={{required: "Este campo es obligatorio"}}
                    />
                </Grid>
                <Grid item xs={12} md={orientation === "row" ? 6 : 12}>
                    <FormInputText
                        name="reported_person_role"
                        label="Dirigido a (cargo)"
                    />
                </Grid>
            </Grid>
            <Grid container columnSpacing={1} mt={3}>
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
                <Grid item xs={12} md={orientation === "row" ? 6 : 12}>
                    <FormDatePicker
                        name="visit_date_start"
                        label="Fecha de inicio"
                        rules={{required: "Este campo es obligatorio"}}
                    />
                </Grid>
                <Grid item xs={12} md={orientation === "row" ? 6 : 12}>
                    <FormDatePicker
                        name="visit_date_end"
                        label="Fecha de culminación"
                        rules={{required: "Este campo es obligatorio"}}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default FieldReportFormGeneralDataFields;
