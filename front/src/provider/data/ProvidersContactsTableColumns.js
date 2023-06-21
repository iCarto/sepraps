export function useProvidersContactsTable() {
    const tableColumns = [
        {
            id: "name",
            label: "Nombre",
            width: 15,
        },
        {
            id: "provider",
            label: "Prestador",
            width: 20,
        },
        {
            id: "post_label",
            label: "Cargo",
            width: 20,
        },
        {
            id: "gender_name",
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
            width: 15,
        },
        {
            id: "comments",
            label: "Observ.",
            width: 20,
        },
    ];

    return {tableColumns};
}
