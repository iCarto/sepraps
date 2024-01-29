import {DateUtil, NumberUtil} from "base/format/utilities";

export function useTrainingTotalsTable() {
    const tableColumns = [
        {
            id: "contract_number",
            label: "Contrato",
            width: 10,
        },
        {
            id: "contractor_name",
            label: "Consultora",
            width: 10,
        },
        {
            id: "social_component_monitoring_name",
            label: "Servicio",
            width: 20,
        },
        {
            id: "start_date",
            label: "Inicio",
            width: 10,
            formatFunction: value => {
                return DateUtil.formatDate(value);
            },
        },
        {
            id: "end_date",
            label: "Finalización",
            width: 10,
            formatFunction: value => {
                return DateUtil.formatDate(value);
            },
        },
        {
            id: "target_population_label",
            label: "Población meta",
            width: 15,
            formatFunction: value => {
                return value && value.join(", ");
            },
        },
        {
            id: "method_label",
            label: "Método",
            width: 5,
        },
        {
            id: "number_of_participants",
            label: "Participantes",
            width: 10,
        },
        {
            id: "women_percentage",
            label: "% mujeres",
            width: 10,
            formatFunction: value => {
                return `${NumberUtil.formatDecimalWithoutZeros(value)} %`;
            },
        },
        {
            id: "number_of_hours",
            label: "Horas",
            width: 5,
        },
    ];

    return {tableColumns};
}
