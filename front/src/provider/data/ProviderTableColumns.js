export function useProviderTableColumns() {
    const tableColumns = [
        {
            id: "name",
            label: "Nombre",
            width: 30,
        },
        {
            id: "locality.name",
            label: "Localidad",
            width: 20,
            formatFunction: element => {
                return element.locality.name;
            },
        },
        {
            id: "locality.district_name",
            label: "Distrito",
            width: 20,
            formatFunction: element => {
                return element.locality.district_name;
            },
        },
        {
            id: "locality.department_name",
            label: "Departamento",
            width: 20,
            formatFunction: element => {
                return element.locality.department_name;
            },
        },
        {
            id: "area",
            label: "Área",
            width: 10,
        },
    ];

    return {tableColumns};
}
