import {NumberUtil} from "base/format/utilities";

export function useConnectionsTotalsTable(showProject, showContract) {
    const tableColumns = [
        {
            id: "population",
            label: "Habitantes",
            width: 10,
            formatFunction: value => {
                if (value) return NumberUtil.formatInteger(value);
            },
        },
        {
            id: "number_of_households",
            label: "Viviendas totales",
            width: 10,
            formatFunction: value => {
                if (value) return NumberUtil.formatInteger(value);
            },
        },
        {
            id: "number_of_existing_connections",
            label: "Conexiones existentes",
            width: 10,
            formatFunction: value => {
                if (value) return NumberUtil.formatInteger(value);
            },
        },
        {
            id: "number_of_planned_connections",
            label: "Conexiones previstas",
            width: 10,
            formatFunction: value => {
                if (value) return NumberUtil.formatInteger(value);
            },
        },
        {
            id: "number_of_actual_connections",
            label: "Conexiones reales",
            width: 10,
            formatFunction: value => {
                if (value) return NumberUtil.formatInteger(value);
            },
        },
        {
            id: "connected_households_percentage",
            label: "Viviendas conectadas",
            width: 10,
            formatFunction: value => {
                return `${NumberUtil.formatDecimalWithoutZeros(value)} %`;
            },
        },
        {
            id: "coverage",
            label: "Cobertura (pers. nuevas)",
            width: 10,
            formatFunction: value => {
                return NumberUtil.formatInteger(value);
            },
        },
    ];

    if (showProject) {
        tableColumns.splice(0, 0, {
            id: "project_code",
            label: "Cod. Proyecto",
            width: 7,
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
            width: 6,
        });
    }
    return {tableColumns};
}
