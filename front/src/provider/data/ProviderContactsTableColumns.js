export function useProviderContactsTable() {
    const tableColumns = [
        {
            id: "name",
            label: "Nombre",
            width: 25,
        },
        {
            id: "post_label",
            label: "Cargo",
            width: 20,
        },
        {
            id: "gender",
            label: "Género",
            width: 10,
        },
        {
            id: "phone",
            label: "Celular",
            width: 15,
        },
        {
            id: "email",
            label: "E-mail",
            width: 25,
        },
    ];

    return {tableColumns};
}
