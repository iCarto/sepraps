import {DateUtil, NumberUtil} from "base/format/utilities";

export function useTrainingTotalsTable(showProject, showContract) {
    const tableColumns = [
        {
            id: "social_component_monitoring_name",
            label: "Servicio",
            width: 15,
        },
        {
            id: "training_contract_number",
            label: "Contrato",
            width: 10,
        },
        {
            id: "training_contractor_name",
            label: "Consultora",
            width: 10,
        },
        {
            id: "name",
            label: "Nombre",
            width: 15,
        },
        {
            id: "start_date",
            label: "Inicio",
            width: 5,
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
            width: 8,
        },
        {
            id: "women_percentage",
            label: "% mujeres",
            width: 7,
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
            label: "Contrato de obra",
            width: 8,
        });
    }

    return {tableColumns};
}
