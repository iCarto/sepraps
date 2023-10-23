import {DateUtil, NumberUtil} from "base/format/utilities";
import {SectionCard, SectionField} from "base/ui/section/components";

const ContractSummaryFields = ({contract}) => {
    return (
        <>
            <SectionField label="Contrato" value={contract.number} />
            <SectionField
                label="Tipo de monto"
                value={contract.total_amount_type_label}
            />
            <SectionField
                label="Frecuencia de pago"
                value={contract.payment_frequency_type_label}
            />
            <SectionField
                label="Criterio de pago"
                value={contract.payment_criteria_type_label}
            />
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
