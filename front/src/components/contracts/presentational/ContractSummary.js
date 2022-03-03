import {DateUtil} from "utilities";
import {SectionCard, SectionField} from "components/common/presentational";

const ContractSummary = ({contract}) => {
    return (
        <SectionCard title="Contrato de obras">
            <SectionField label="Número de contrato:" value={contract.number} />
            <SectionField
                label="Número de licitación:"
                value={contract.bid_request_number}
            />
            <SectionField
                label="Fecha de licitación:"
                value={DateUtil.formatDate(contract.bid_request_date)}
            />
            <SectionField
                label="Fecha de adjudicación:"
                value={DateUtil.formatDate(contract.awarding_date)}
            />
            <SectionField
                label="Presupuesto adjudicado:"
                value={contract.awarding_budget && contract.awarding_budget + " $"}
            />
        </SectionCard>
    );
};

export default ContractSummary;
