import {useOutletContext} from "react-router-dom";
import {DateUtil} from "utilities";

import {SectionCard, SectionField} from "components/common/presentational";

const ContractBidRequestSection = () => {
    let contract;
    [contract] = useOutletContext();

    return (
        <SectionCard title="Licitación">
            <SectionField label="Número:" value={contract.bid_request_number} />
            <SectionField label="Identificador:" value={contract.bid_request_id} />
            <SectionField
                label="Fecha:"
                value={DateUtil.formatDate(contract.bid_request_date)}
            />
            <SectionField label="Presupuesto:" value={contract.bid_request_budget} />
            <SectionField
                label="Plazo previsto:"
                value={contract.bid_request_deadline + " meses"}
            />
        </SectionCard>
    );
};

export default ContractBidRequestSection;
