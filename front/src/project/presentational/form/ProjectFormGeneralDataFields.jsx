import {FormDatePicker, FormTextArea} from "base/form/components";
import ProjectFormProjectWorks from "./ProjectFormProjectWorks";
import Grid from "@mui/material/Grid";

const ProjectFormGeneralDataFields = ({layout = "row"}) => {
    return (
        <>
            <Grid container spacing={2} sx={{mb: 2}}>
                <Grid item xs={6}>
                    <FormTextArea
                        name="description"
                        label="Descripción del proyecto"
                        rules={{required: "El campo es obligatorio"}}
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormDatePicker
                        name="init_date"
                        label="Fecha de inicio"
                        rules={{required: "El campo es obligatorio"}}
                    />
                </Grid>
            </Grid>
            <ProjectFormProjectWorks name="project_works" itemName="Tipo de trabajo" />
        </>
    );
};

export default ProjectFormGeneralDataFields;
