export function useContactsTable() {
    const tableColumns = [
        {
            id: "name",
            label: "Nombre",
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
            width: 10,
        },
        {
            id: "email",
            label: "E-mail",
            width: 10,
        },
        {
            id: "comments",
            label: "Observ.",
            width: 20,
        },
        {
            id: "is_staff",
            label: "Interno",
            width: 5,
        },
    ];

    return {tableColumns};
}
