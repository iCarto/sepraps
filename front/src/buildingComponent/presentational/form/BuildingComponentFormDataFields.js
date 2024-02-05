import {FormInputText, FormSelect} from "base/form/components";
import Grid from "@mui/material/Grid";

const BuildingComponentFormDataFields = ({bcTypes}) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <FormInputText
                    name="name"
                    label="Nombre del componente"
                    rules={{required: "Este campo es obligatorio"}}
                />
            </Grid>
            <Grid item xs={6}>
                <FormSelect
                    name="code"
                    label="Tipo"
                    options={bcTypes}
                    rules={{required: "Este campo es obligatorio"}}
                />
            </Grid>
        </Grid>
    );
};

export default BuildingComponentFormDataFields;
