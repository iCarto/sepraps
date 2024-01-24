import {DateUtil, NumberUtil} from "base/format/utilities";

export function useTrainingSummaryTable() {
    const tableColumns = [
        {
            id: "contract_number",
            label: "Contrato",
            width: 10,
            formatFunction: item => {
                return item.contract_number || item.contract?.number;
            },
        },
        {
            id: "contractor_name",
            label: "Consultora",
            width: 15,
            formatFunction: item => {
                return item.contractor?.name;
            },
        },
        {
            id: "start_date",
            label: "Inicio",
            width: 10,
            formatFunction: item => {
                return DateUtil.formatDate(item.start_date);
            },
        },
        {
            id: "end_date",
            label: "Finalización",
            width: 10,
            formatFunction: item => {
                return DateUtil.formatDate(item.end_date);
            },
        },
        {
            id: "target_population_label",
            label: "Población meta",
            width: 20,
        },
        {
            id: "method_label",
            label: "Método",
            width: 10,
        },
        {
            id: "number_of_participants",
            label: "Participantes",
            width: 10,
            formatFunction: item => {
                return NumberUtil.formatInteger(
                    (item.number_of_women || 0) + (item.number_of_men || 0)
                );
            },
        },
        {
            id: "number_of_women",
            label: "Mujeres",
            width: 10,
            formatFunction: item => {
                const totalParticipants =
                    (item.number_of_women || 0) + (item.number_of_men || 0);
                return `${NumberUtil.formatInteger(
                    item.number_of_women
                )} (${NumberUtil.formatDecimalWithoutZeros(
                    (item.number_of_women / totalParticipants) * 100
                )}%)`;
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
