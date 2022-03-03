import FormSection from "components/common/form/FormSection";
import ProjectFormProviderFields from "./ProjectFormProviderFields";

const ProjectFormProviderSection = () => {
    return (
        <FormSection title="Prestador del proyecto">
            <ProjectFormProviderFields />
        </FormSection>
    );
};

export default ProjectFormProviderSection;
