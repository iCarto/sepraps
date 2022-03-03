import {FormSection} from "components/common/form";
import {ProjectFormLocationFields} from ".";

const ProjectFormLocationSection = () => {
    return (
        <FormSection title="Localización del sistema">
            <ProjectFormLocationFields isMapDisplayed={true} />
        </FormSection>
    );
};

export default ProjectFormLocationSection;
