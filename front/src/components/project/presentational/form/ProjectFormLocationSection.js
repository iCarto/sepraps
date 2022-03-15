import {FormSection} from "components/common/form";
import {ProjectFormLocationFields} from ".";
import ProjectFormLinkedLocalities from "./ProjectFormLinkedLocalities";

const ProjectFormLocationSection = () => {
    return (
        <>
            <FormSection title="Infraestructura principal">
                <ProjectFormLocationFields isMapDisplayed={true} />
            </FormSection>
            <FormSection title="Localidades vinculadas">
                <ProjectFormLinkedLocalities
                    name="linked_localities"
                    auxPropertyName="linked_locality"
                />
            </FormSection>
        </>
    );
};

export default ProjectFormLocationSection;
