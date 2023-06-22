import {DateUtil} from "base/format/utilities";

export function useFieldReportsTableColumns() {
    const tableColumns = [
        {
            id: "report_name",
            label: "Nombre",
            width: 45,
        },
        {
            id: "report_code",
            label: "Memorándum",
            width: 15,
        },
        {
            id: "report_date",
            label: "Fecha",
            formatFunction: item => {
                return DateUtil.formatDate(item.report_date);
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
