import {FormDatePicker, FormInputText, FormTextArea} from "base/form/components";
import {ImageUploadFormSection} from "base/image/components";
import Grid from "@mui/material/Grid";

const FieldReportProjectActivityFormFields = () => {
    return (
        <Grid container columnSpacing={1}>
            <Grid item xs={12} md={6}>
                <FormInputText
                    name="title"
                    label="Título de la actividad"
                    rules={{required: "Este campo es obligatorio."}}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormDatePicker
                    name="date"
                    label="Fecha de la actividad"
                    rules={{required: "Este campo es obligatorio."}}
                />
            </Grid>
            <Grid item xs={12}>
                <FormTextArea name="notes" label="Descripción y comentarios" rows={8} />
            </Grid>
            <Grid item xs={12}>
                <ImageUploadFormSection name="images" formFileInputName="imageInput" />
            </Grid>
        </Grid>
    );
};

export default FieldReportProjectActivityFormFields;
