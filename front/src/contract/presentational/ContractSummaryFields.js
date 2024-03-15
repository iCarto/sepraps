import {MAX_MIN_AMOUNT_TYPE} from "contract/model";
import {DateUtil, NumberUtil} from "base/format/utilities";

import {SectionField} from "base/ui/section/components";

const AwardingBudgetSection = ({contract}) => {
    return contract.total_amount_type === MAX_MIN_AMOUNT_TYPE ? (
        <>
            <SectionField
                label="Monto adjudicado mínimo"
                value={NumberUtil.formatInteger(contract.awarding_budget_min)}
                unit="Gs."
            />
            <SectionField
                label="Monto adjudicado máximo"
                value={NumberUtil.formatInteger(contract.awarding_budget)}
                unit="Gs."
            />
            {contract.is_awarding_budget_amended ? (
                <SectionField
                    label="Monto ampliado en adenda/s"
                    value={NumberUtil.formatInteger(contract.total_awarding_budget)}
                    unit="Gs."
                />
            ) : null}
        </>
    ) : (
        <>
            <SectionField
                label="Monto adjudicado"
                value={NumberUtil.formatInteger(contract.awarding_budget)}
                unit="Gs."
            />
            {contract.is_awarding_budget_amended ? (
                <SectionField
                    label="Monto ampliado en adenda/s"
                    value={NumberUtil.formatInteger(contract.total_awarding_budget)}
                    unit="Gs."
                />
            ) : null}
        </>
    );
};

const ContractSummaryFields = ({contract}) => {
    return (
        <>
            <SectionField label="Contrato" value={contract.number} />
            <SectionField
                label="Tipo de monto"
                value={contract.total_amount_type_label}
            />
            <SectionField
                label="Frecuencia de entrega de productos"
                value={contract.product_frequency_type_label}
            />
            <SectionField
                label="Criterio de pago"
                value={contract.payment_criteria_type_label}
            />
            <SectionField label="Licitación" value={contract.bid_request_number} />
            <SectionField
                label="Fecha de licitación"
                value={DateUtil.formatDate(contract.bid_request_date)}
            />
            <SectionField
                label="Fecha de adjudicación"
                value={DateUtil.formatDate(contract.awarding_date)}
            />
            <AwardingBudgetSection contract={contract} />
            <SectionField label="Servicios prestados" value={contract.services_label} />
        </>
    );
};

export default ContractSummaryFields;
