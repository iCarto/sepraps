import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {FormSection} from "components/common/form";
import {
    ProjectFormGeneralDataFields,
    ProjectFormLinkedLocalitiesList,
    ProjectFormLocationFields,
} from ".";

const ProjectCreationForm = ({onSubmit, onCancel = null}) => {
    return (
        <>
            <FormSection title="Información general">
                <ProjectFormGeneralDataFields />
            </FormSection>
            <FormSection title="Localidad">
                <ProjectFormLinkedLocalitiesList name="linked_localities" />
            </FormSection>
            <FormSection title="Infraestructura principal">
                <ProjectFormLocationFields />
            </FormSection>
            <Grid container justifyContent="center" sx={{mt: 2}}>
                {onCancel && (
                    <Button sx={{ml: 2}} onClick={onCancel}>
                        Cancelar
                    </Button>
                )}
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ml: 3}}
                    onClick={() => onSubmit()}
                >
                    Guardar
                </Button>
            </Grid>
        </>
    );
};

export default ProjectCreationForm;
