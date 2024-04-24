import {MAX_MIN_AMOUNT_TYPE} from "contract/model";
import {DateUtil, NumberUtil} from "base/format/utilities";

import {SectionField} from "base/ui/section/components";
import Grid from "@mui/material/Grid";

const BidRequestBudgetSection = ({contract}) => {
    return contract.total_amount_type === MAX_MIN_AMOUNT_TYPE ? (
        <>
            <SectionField
                label="Monto mínimo licitado"
                value={NumberUtil.formatInteger(contract.bid_request_budget_min)}
                unit="Gs."
            />
            <SectionField
                label="Monto máximo licitado"
                value={NumberUtil.formatInteger(contract.bid_request_budget)}
                unit="Gs."
            />
        </>
    ) : (
        <SectionField
            label="Monto licitado"
            value={NumberUtil.formatInteger(contract.bid_request_budget)}
            unit="Gs."
        />
    );
};

const ContractBidRequestSection = ({contract}) => {
    return (
        <Grid container spacing={2}>
            <Grid container item xs={6} direction="column">
                <SectionField label="Número" value={contract?.bid_request_number} />
                <SectionField label="Identificador" value={contract?.bid_request_id} />
                <SectionField
                    label="Número de lote"
                    value={contract?.bid_request_lot_number}
                />
                <SectionField
                    label="Fecha de publicación"
                    value={DateUtil.formatDate(contract?.bid_request_date)}
                />
            </Grid>
            <Grid container item xs={6} direction="column">
                <SectionField
                    label="Tipo de monto"
                    value={contract?.total_amount_type_label}
                />
                <BidRequestBudgetSection contract={contract} />
                <SectionField
                    label="Frecuencia de entrega de productos"
                    value={contract?.product_frequency_type_label}
                />
                <SectionField
                    label="Criterio de pago"
                    value={contract?.payment_criteria_type_label}
                />
            </Grid>
        </Grid>
    );
};

export default ContractBidRequestSection;
