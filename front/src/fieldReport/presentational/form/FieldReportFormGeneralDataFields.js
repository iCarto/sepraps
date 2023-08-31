import {FormDatePicker, FormInputText, FormInputTextList} from "base/form/components";
import Grid from "@mui/material/Grid";

const FieldReportFormGeneralDataFields = ({orientation = "column"}) => {
    return (
        <>
            <Grid container columnSpacing={1} mt={3}>
                <Grid item xs={12}>
                    <FormInputText
                        name="name"
                        label="Nombre del informe"
                        rules={{required: "Este campo es obligatorio"}}
                    />
                </Grid>
                <Grid item xs={12} md={orientation === "row" ? 6 : 12}>
                    <FormInputText
                        name="code"
                        label="Nº de memorándum"
                        rules={{required: "Este campo es obligatorio"}}
                    />
                </Grid>
                <Grid item xs={12} md={orientation === "row" ? 6 : 12}>
                    <FormDatePicker
                        name="date"
                        label="Fecha del informe"
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
            <Grid container columnSpacing={1} mt={3}>
                <Grid item xs={12}>
                    <FormInputText
                        name="reporting_person"
                        label="Autor/a del informe (nombre y cargo)"
                        rules={{required: "Este campo es obligatorio"}}
                    />
                </Grid>
                <Grid item xs={12} mb={1}>
                    <FormInputTextList
                        name="participant_persons"
                        itemName="Participante en la intervención (nombre y cargo)"
                        rules={{required: "Este campo es obligatorio"}}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormInputTextList
                        name="reported_persons"
                        itemName="Responsable de aprobación (nombre y cargo)"
                        rules={{required: "Este campo es obligatorio"}}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default FieldReportFormGeneralDataFields;
