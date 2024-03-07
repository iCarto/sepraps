import {DateUtil, NumberUtil} from "base/format/utilities";
import {FieldUtil} from "base/ui/section/utilities";
import {TextLink} from "base/navigation/components";

export function useContractTable(display = "regular") {
    const getExecutionPeriod = element => {
        if (element.total_expected_execution_period) {
            return FieldUtil.getValue(element.total_expected_execution_period, "días");
        } else return FieldUtil.getValue(element.expected_execution_period, "días");
    };

    let tableColumns = [
        {
            id: "number",
            label: "Número",
            width: 10,
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
                return getExecutionPeriod(element);
            },
            note: element =>
                element.total_expected_execution_period
                    ? "Modificado en adenda/s"
                    : null,
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
                return (
                    NumberUtil.formatCurrency(element.total_awarding_budget) ||
                    NumberUtil.formatCurrency(element.awarding_budget)
                );
            },
            note: element =>
                element.is_awarding_budget_amended ? "Modificado en adenda/s" : null,
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
            width: 30,
        },
    ];

    if (display === "short")
        tableColumns = [
            {
                id: "number",
                label: "Número",
                width: 10,
                formatFunction: element => {
                    return (
                        <TextLink
                            text={element.number}
                            to={`/contracts/list/${element.id}/summary`}
                            textStyle={{fontSize: 14}}
                        />
                    );
                },
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
                id: "execution_start_date",
                label: "Fecha inicio ejec.",
                width: 10,
                formatFunction: element => {
                    return DateUtil.formatDate(element.execution_start_date);
                },
            },
            {
                id: "expected_execution_end_date",
                label: "Fecha fin ejec.",
                width: 10,
                formatFunction: element => {
                    return DateUtil.formatDate(
                        element.amended_expected_execution_end_date ||
                            element.expected_execution_end_date
                    );
                },
            },
            {
                id: "awarding_budget",
                label: "Monto adjudicado",
                width: 15,
                formatFunction: element => {
                    return NumberUtil.formatCurrency(
                        element.total_awarding_budget || element.awarding_budget
                    );
                },
            },
            {
                id: "contractor.name",
                label: "Contratista",
                width: 20,
                formatFunction: element => {
                    return element.contractor?.name;
                },
            },
            {
                id: "services_label",
                label: "Servicios prestados",
                width: 20,
            },
        ];

    return {tableColumns};
}
