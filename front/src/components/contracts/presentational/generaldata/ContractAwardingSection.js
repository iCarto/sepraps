import {useOutletContext} from "react-router-dom";
import {DateUtil} from "utilities";

import {SectionCard, SectionField} from "components/common/presentational";

const ContractAwardingSection = () => {
    let contract;
    [contract] = useOutletContext();

    return (
        <SectionCard title="Adjudicación">
            <SectionField label="Presupuesto:" value={contract.awarding_budget} />
            <SectionField
                label="Porcentaje de baja:"
                value={contract.awarding_percentage_drop + "%"}
            />
            <SectionField
                label="Fecha:"
                value={DateUtil.formatDate(contract.awarding_date)}
            />
        </SectionCard>
    );
};

export default ContractAwardingSection;
