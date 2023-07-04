import {DateUtil} from "base/format/utilities";

export function useFieldReportsTableColumns() {
    const tableColumns = [
        {
            id: "name",
            label: "Nombre",
            width: 35,
        },
        {
            id: "code",
            label: "Memorándum",
            width: 20,
        },
        {
            id: "date",
            label: "Fecha",
            formatFunction: item => {
                return DateUtil.formatDate(item.date);
            },
            width: 20,
        },
        {
            id: "reporting_person_name",
            label: "Autor/a",
            width: 25,
        },
    ];

    return {tableColumns};
}
