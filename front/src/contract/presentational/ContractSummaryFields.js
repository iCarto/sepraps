import {DateUtil, NumberUtil} from "base/format/utilities";
import {SectionCard, SectionField} from "base/ui/section/components";

const ContractSummaryFields = ({contract}) => {
    return (
        <>
            <SectionField label="Contrato" value={contract.number} />
            <SectionField label="Licitación" value={contract.bid_request_number} />
            <SectionField
                label="Fecha de licitación"
                value={contract.bid_request_date}
            />
            <SectionField
                label="Fecha de adjudicación"
                value={DateUtil.formatDate(contract.awarding_date)}
            />
            <SectionField
                label="Monto adjudicado"
                value={NumberUtil.formatCurrency(contract.awarding_budget)}
            />
        </>
    );
};

export default ContractSummaryFields;