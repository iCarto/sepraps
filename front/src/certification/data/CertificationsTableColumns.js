import {DateUtil, NumberUtil} from "base/format/utilities";

export function useCertificationTotalsTable(showProject, showContract) {
    const tableColumns = [
        {
            id: "payment_name",
            label: "Certificado",
            width: 10,
        },
        {
            id: "status_label",
            label: "Estado",
            width: 10,
        },
        {
            id: "approval_date",
            label: "Fecha de aprobación",
            width: 8,
            formatFunction: value => (value ? DateUtil.formatDate(value) : ""),
        },
        {
            id: "approved_total_amount",
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

    if (showProject) {
        tableColumns.splice(0, 0, {
            id: "project_code",
            label: "Cod. Proyecto",
            width: 9,
        });
        tableColumns.splice(1, 0, {
            id: "project_name",
            label: "Proyecto",
            width: 10,
        });
    }

    if (showContract) {
        tableColumns.splice(0, 0, {
            id: "contract_number",
            label: "Contrato",
            width: 8,
        });
    }

    return {tableColumns};
}
