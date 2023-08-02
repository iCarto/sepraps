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
            <Grid item container xs={12} spacing={5}>
                <Grid item xs={3}>
                    <ImageUploadFormSection
                        name="image1"
                        label="Imagen 1"
                        formFileInputName="image1Input"
                    />
                </Grid>
                <Grid item xs={3}>
                    <ImageUploadFormSection
                        name="image2"
                        label="Imagen 2"
                        formFileInputName="image2Input"
                    />
                </Grid>
                <Grid item xs={3}>
                    <ImageUploadFormSection
                        name="image3"
                        label="Imagen 3"
                        formFileInputName="image3Input"
                    />
                </Grid>
                <Grid item xs={3}>
                    <ImageUploadFormSection
                        name="image4"
                        label="Imagen 4"
                        formFileInputName="image4Input"
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default FieldReportProjectActivityFormFields;
