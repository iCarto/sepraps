import {useDomain} from "components/common/provider";
import {FormDatePicker, FormSelect, FormTextArea} from "components/common/form";
import Grid from "@mui/material/Grid";

const ProjectFormGeneralDataFields = ({layout = "row"}) => {
    const {projectTypes, projectClasses} = useDomain();

    return (
        <Grid container spacing={2} direction={layout}>
            <Grid item xs={12} md={6}>
                <FormSelect
                    name="project_type"
                    label="Tipo de proyecto"
                    rules={{required: "El campo es obligatorio"}}
                    options={projectTypes}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormSelect
                    name="project_class"
                    label="Clase de proyecto"
                    rules={{required: "El campo es obligatorio"}}
                    options={projectClasses}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormTextArea
                    name="description"
                    label="Descripción del proyecto"
                    margin="0"
                    rules={{required: "El campo es obligatorio"}}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormDatePicker
                    name="init_date"
                    label="Fecha de inicio"
                    margin="0"
                    rules={{required: "El campo es obligatorio"}}
                />
            </Grid>
        </Grid>
    );
};

export default ProjectFormGeneralDataFields;
