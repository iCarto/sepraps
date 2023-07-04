import {DateUtil} from "base/format/utilities";

export function useFieldReportsTableColumns() {
    const tableColumns = [
        {
            id: "name",
            label: "Nombre",
            width: 45,
        },
        {
            id: "code",
            label: "Memorándum",
            width: 15,
        },
        {
            id: "date",
            label: "Fecha",
            formatFunction: item => {
                return DateUtil.formatDate(item.date);
            },
            width: 15,
        },
        {
            id: "reporting_person_name",
            label: "Autor/a",
            width: 25,
        },
    ];

    return {tableColumns};
}
