import {NumberUtil} from "base/format/utilities";

export function useBcProgressTotalsTable(showProject = false, showContract = false) {
    const tableColumns = [
        {
            id: "bc_name",
            label: "Componente",
            width: 18,
        },
        {
            id: "financial_weight",
            label: "Peso financiero",
            width: 6,
            formatFunction: value => NumberUtil.formatDecimal2(value),
        },
        {
            id: "expected_amount",
            label: "Monto previsto (Gs.)",
            width: 10,
            formatFunction: value => NumberUtil.formatInteger(value),
        },
        {
            id: "paid_amount",
            label: "Monto aprobado (Gs.)",
            width: 10,
            formatFunction: value => NumberUtil.formatInteger(value),
        },
        {
            id: "pending_amount",
            label: "Monto pendiente (Gs.)",
            width: 10,
            formatFunction: value => NumberUtil.formatInteger(value),
        },
        {
            id: "difference",
            label: "Diferencia (Gs.)",
            width: 10,
            formatFunction: value => NumberUtil.formatInteger(value),
        },
        {
            id: "financial_progress_percentage",
            label: "% Financiero",
            width: 8,
        },
        {
            id: "physical_progress_percentage",
            label: "% Físico",
            width: 8,
        },
        {
            id: "execution_status_label",
            label: "Estado ejecución",
            width: 10,
        },
        {
            id: "quality_status_label",
            label: "Estado cualitativo",
            width: 10,
        },
    ];

    if (showProject) {
        tableColumns.splice(0, 0, {
            id: "project_code",
            label: "Proyecto",
            width: 10,
        });
    }
    if (showContract) {
        tableColumns.splice(0, 0, {
            id: "contract_number",
            label: "Contrato de obra",
            width: 10,
        });
    }

    return {tableColumns};
}
