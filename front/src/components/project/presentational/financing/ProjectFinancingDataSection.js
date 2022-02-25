import {useOutletContext} from "react-router-dom";

import {SectionCard, SectionField} from "components/common/presentational";

const ProjectFinancingDataSection = () => {
    let project;
    [project] = useOutletContext();

    return (
        <SectionCard title="Programa">
            <SectionField
                label="Programa de financiación:"
                value={project.financing_program_name}
            />
            <SectionField label="Financiador:" value={project.financing_fund_name} />
        </SectionCard>
    );
};

export default ProjectFinancingDataSection;
