export function useContactsTable() {
    const tableColumns = [
        {
            id: "name",
            label: "Nombre",
            width: 30,
        },
        {
            id: "post_label",
            label: "Cargo",
            width: 20,
        },
        {
            id: "gender_name",
            label: "Género",
            width: 15,
        },
        {
            id: "phone",
            label: "Celular",
            width: 15,
        },
        {
            id: "email",
            label: "E-mail",
            width: 20,
        },
    ];

    return {tableColumns};
}
