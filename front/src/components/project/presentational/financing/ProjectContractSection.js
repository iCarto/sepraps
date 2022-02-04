import {useOutletContext} from "react-router-dom";

import {ButtonLink, SectionCard, SectionField} from "components/common/presentational";
import {DateUtil} from "utilities";

const ProjectContractSection = () => {
    let project;
    [project] = useOutletContext();

    return (
        project.construction_contract && (
            <SectionCard title="Contrato de obras">
                <SectionField
                    label="Número de contrato:"
                    value={project.construction_contract.number}
                />
                <SectionField
                    label="Número de licitación:"
                    value={project.construction_contract.bid_request_number}
                />
                <SectionField
                    label="Fecha de licitación:"
                    value={DateUtil.formatDate(
                        project.construction_contract.bid_request_date
                    )}
                />
                <SectionField
                    label="Fecha de adjudicación:"
                    value={DateUtil.formatDate(
                        project.construction_contract.awarding_date
                    )}
                />
                <SectionField
                    label="Presupuesto adjudicado:"
                    value={project.construction_contract.awarding_budget}
                />
                <ButtonLink
                    text="Ver contrato"
                    to={"/contracts/" + project.construction_contract.id}
                />
            </SectionCard>
        )
    );
};

export default ProjectContractSection;
