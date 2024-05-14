import {FormSection} from "base/form/components";
import {
    ProjectFormGeneralDataFields,
    ProjectFormLinkedLocalitiesList,
    ProjectFormLocationFields,
} from ".";
import Stack from "@mui/material/Stack";

const ProjectCreationFormFields = () => {
    return (
        <Stack spacing={1}>
            <FormSection title="Información general">
                <ProjectFormGeneralDataFields />
            </FormSection>
            <FormSection title="Localidad">
                <ProjectFormLinkedLocalitiesList name="linked_localities" />
            </FormSection>
            <FormSection title="Infraestructura principal">
                <ProjectFormLocationFields orientation="horizontal" />
            </FormSection>
        </Stack>
    );
};

export default ProjectCreationFormFields;
