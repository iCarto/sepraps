export function useProviderContactsTable() {
    const tableColumns = [
        {
            id: "name",
            label: "Nombre",
            width: 20,
        },
        {
            id: "post_label",
            label: "Cargo",
            width: 30,
        },
        {
            id: "gender",
            label: "Género",
            width: 10,
        },
        {
            id: "phone",
            label: "Celular",
            width: 10,
        },
        {
            id: "email",
            label: "E-mail",
            width: 25,
        },
    ];

    return {tableColumns};
}
