import {FormSection} from "base/form/components";
import {
    ProjectFormGeneralDataFields,
    ProjectFormLinkedLocalitiesList,
    ProjectFormLocationFields,
} from ".";

const ProjectCreationFormFields = () => {
    return (
        <>
            <FormSection title="Información general">
                <ProjectFormGeneralDataFields />
            </FormSection>
            <FormSection title="Localidad">
                <ProjectFormLinkedLocalitiesList name="linked_localities" />
            </FormSection>
            <FormSection title="Infraestructura principal">
                <ProjectFormLocationFields orientation="horizontal" />
            </FormSection>
        </>
    );
};

export default ProjectCreationFormFields;
