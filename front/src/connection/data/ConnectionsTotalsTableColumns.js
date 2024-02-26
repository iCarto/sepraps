import {NumberUtil} from "base/format/utilities";

export function useConnectionsTotalsTable() {
    const tableColumns = [
        {
            id: "project_code",
            label: "Proyecto",
        },
        {
            id: "population",
            label: "Habitantes",
            formatFunction: value => {
                if (value) return NumberUtil.formatInteger(value);
            },
        },
        {
            id: "number_of_households",
            label: "Viviendas totales",
            formatFunction: value => {
                if (value) return NumberUtil.formatInteger(value);
            },
        },
        {
            id: "number_of_existing_connections",
            label: "Conexiones existentes",
            formatFunction: value => {
                if (value) return NumberUtil.formatInteger(value);
            },
        },
        {
            id: "number_of_planned_connections",
            label: "Conexiones previstas",
            formatFunction: value => {
                if (value) return NumberUtil.formatInteger(value);
            },
        },
        {
            id: "number_of_actual_connections",
            label: "Conexiones reales",
            formatFunction: value => {
                if (value) return NumberUtil.formatInteger(value);
            },
        },
        {
            id: "connected_households_percentage",
            label: "Viviendas conectadas",
            formatFunction: value => {
                return `${NumberUtil.formatDecimalWithoutZeros(value)} %`;
            },
        },
        {
            id: "coverage",
            label: "Cobertura (pers. nuevas)",
            formatFunction: value => {
                return NumberUtil.formatInteger(value);
            },
        },
    ];

    return {tableColumns};
}
