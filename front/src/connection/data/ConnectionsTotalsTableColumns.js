export function useConnectionsTotalsTable() {
    const tableColumns = [
        {
            id: "project_code",
            label: "Proyecto",
        },
        {
            id: "population",
            label: "Habitantes",
        },
        {
            id: "number_of_households",
            label: "Viviendas totales",
        },
        {
            id: "number_of_planned_connections",
            label: "Conexiones previstas",
        },
        {
            id: "number_of_actual_connections",
            label: "Conexiones reales",
        },
        {
            id: "connected_households_percentage",
            label: "Viviendas conectadas",
            formatFunction: value => {
                return `${value} %`;
            },
        },
    ];

    return {tableColumns};
}
