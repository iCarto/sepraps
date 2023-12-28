import {FormBox, FormInputInteger} from "base/form/components";
import Grid from "@mui/material/Grid";

const ConnectionFormDataFields = ({projectClass}) => {
    return (
        <Grid container spacing={2}>
            <Grid container item xs={6} direction="column">
                <FormBox label="Datos demográficos">
                    <FormInputInteger
                        name="number_of_households"
                        label="Nº de viviendas"
                        rules={{required: "Este campo es obligatorio"}}
                    />
                </FormBox>
            </Grid>
            <Grid container item xs={6} direction="column">
                <FormBox label="Conexiones">
                    {projectClass === "mejora" ? (
                        <FormInputInteger
                            name="number_of_existing_connections"
                            label="Nº de conexiones existentes"
                            rules={{required: "Este campo es obligatorio"}}
                        />
                    ) : null}
                    <FormInputInteger
                        name="number_of_planned_connections"
                        label="Nº de conexiones previstas"
                        rules={{required: "Este campo es obligatorio"}}
                    />
                    <FormInputInteger
                        name="number_of_actual_connections"
                        label="Nº de conexiones reales"
                        rules={{required: "Este campo es obligatorio"}}
                    />
                </FormBox>
            </Grid>
        </Grid>
    );
};

export default ConnectionFormDataFields;
