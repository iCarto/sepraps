import {useOutletContext} from "react-router-dom";

import {DetailCard, SectionField} from "components/common/presentational";

const ProjectFinancingSection = () => {
    const project = useOutletContext();

    return (
        <DetailCard title="Programa">
            <SectionField
                label="Programa de financiación:"
                value={project[0].financing_program_name}
            />
            <SectionField label="Financiador:" value={project[0].financing_fund_name} />
        </DetailCard>
    );
};

export default ProjectFinancingSection;
