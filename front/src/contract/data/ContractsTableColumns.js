import {DateUtil, NumberUtil} from "base/format/utilities";
import {TextLink} from "base/navigation/components";
import {FieldUtil} from "base/ui/section/utilities";

export function useContractTable(display = "regular") {
    let tableColumns = [
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
                    return DateUtil.formatDate(element.expected_execution_end_date);
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
                width: 20,
                formatFunction: element => {
                    return element.contractor?.name;
                },
            },
            {
                id: "services_label",
                label: "Servicios",
                width: 20,
            },
        ];

    return {tableColumns};
}
