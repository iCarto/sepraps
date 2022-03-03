import {FormSection} from "components/common/form";
import {ProjectFormGeneralDataFields} from ".";

const ProjectFormGeneralDataSection = () => {
    return (
        <FormSection title="Información general del proyecto">
            <ProjectFormGeneralDataFields />
        </FormSection>
    );
};

export default ProjectFormGeneralDataSection;
