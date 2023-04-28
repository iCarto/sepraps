export function useContactsTable() {
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
            width: 10,
        },
        {
            id: "comments",
            label: "Observ.",
            width: 30,
        },
        {
            id: "is_staff",
            label: "Interno",
            width: 5,
        },
    ];

    return {tableColumns};
}
