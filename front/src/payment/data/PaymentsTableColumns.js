import {DateUtil, NumberUtil} from "base/format/utilities";

export function usePaymentTotalsTable(showContract) {
    console.log({showContract});
    const tableColumns = [
        {
            id: "payment_name",
            label: "Producto",
            width: 10,
        },
        {
            id: "status_label",
            label: "Estado",
            width: 10,
        },
        {
            id: "num_products",
            label: "Entregables",
            width: 8,
            formatFunction: value => NumberUtil.formatInteger(value),
        },
        {
            id: "approval_date",
            label: "Fecha de aprobación",
            width: 8,
            formatFunction: value => (value ? DateUtil.formatDate(value) : ""),
        },
        {
            id: "paid_total_amount",
            label: "Monto aprobado (Gs.)",
            width: 10,
            formatFunction: value => NumberUtil.formatInteger(value),
        },
        {
            id: "cum_approved_total_amount",
            label: "Monto aprobado acum. (Gs.)",
            width: 10,
            formatFunction: value => NumberUtil.formatInteger(value),
        },
        {
            id: "expected_approval_date",
            label: "Fecha prevista",
            width: 8,
            formatFunction: value => (value ? DateUtil.formatDate(value) : ""),
        },
        {
            id: "expected_total_amount",
            label: "Monto previsto (Gs.)",
            width: 10,
            formatFunction: value => NumberUtil.formatInteger(value),
        },
        {
            id: "cum_expected_total_amount",
            label: "Monto previsto acum. (Gs.)",
            width: 10,
            formatFunction: value => NumberUtil.formatInteger(value),
        },
    ];

    if (showContract) {
        tableColumns.splice(0, 0, {
            id: "contract_number",
            label: "Contrato",
            width: 8,
        });
    }

    return {tableColumns};
}
