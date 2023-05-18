import {DateUtil, NumberUtil} from "base/format/utilities";
import {FieldUtil} from "base/ui/section/utilities";

export function useContractTable() {
    const tableColumns = [
        {
            id: "number",
            label: "Número",
            width: 5,
        },
        {
            id: "financing_program.short_name",
            label: "Programa",
            width: 10,
            formatFunction: element => {
                return element.financing_program?.short_name;
            },
        },
        {
            id: "expected_execution_period",
            label: "Plazo previsto",
            width: 10,
            formatFunction: element => {
                return FieldUtil.getValue(element.expected_execution_period, "días");
            },
        },
        {
            id: "awarding_date",
            label: "Fecha adj.",
            width: 10,
            formatFunction: element => {
                return DateUtil.formatDate(element.awarding_date);
            },
        },
        {
            id: "awarding_budget",
            label: "Monto adjudicado",
            width: 15,
            formatFunction: element => {
                return NumberUtil.formatCurrency(element.awarding_budget);
            },
        },
        {
            id: "contractor.name",
            label: "Contratista",
            width: 15,
            formatFunction: element => {
                return element.contractor?.name;
            },
        },
        {
            id: "comments",
            label: "Descripción",
            width: 35,
        },
    ];

    return {tableColumns};
}
