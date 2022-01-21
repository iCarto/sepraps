import {
    FormInputDecimal,
    FormInputInteger,
    FormLocationSelect,
    FormSection,
} from "components/common/form";
import ProjectFormLinkedLocalities from "./ProjectFormLinkedLocalities";

const ProjectFormLocationSection = () => {
    return (
        <FormSection title="Localización del sistema">
            <FormLocationSelect name="main_infrastructure_location" />
            <FormInputDecimal name="main_infrastructure_latitude" label="Latitud" />
            <FormInputDecimal name="main_infrastructure_longitude" label="Longitud" />
            <FormInputInteger name="main_infrastructure_altitude" label="Altitud" />

            <ProjectFormLinkedLocalities
                name="linked_localities"
                auxPropertyName="linked_locality"
            />
        </FormSection>
    );
};

export default ProjectFormLocationSection;
