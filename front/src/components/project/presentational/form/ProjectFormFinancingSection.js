import {FormFinancingSelect, FormSection} from "components/common/form";

const ProjectFormFinancingSection = () => {
    return (
        <FormSection title="Datos de la financiación del proyecto">
            <FormFinancingSelect name="financing" />
        </FormSection>
    );
};

export default ProjectFormFinancingSection;
