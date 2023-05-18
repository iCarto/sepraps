export function useProviderContactsTable() {
    const tableColumns = [
        {
            id: "name",
            label: "Nombre",
            width: 15,
        },
        {
            id: "post",
            label: "Cargo",
            width: 20,
        },
        {
            id: "gender",
            label: "Género",
            width: 5,
        },
        {
            id: "phone",
            label: "Celular",
            width: 10,
        },
        {
            id: "email",
            label: "E-mail",
            width: 15,
        },
        {
            id: "comments",
            label: "Observ.",
            width: 30,
        },
    ];

    return {tableColumns};
}
