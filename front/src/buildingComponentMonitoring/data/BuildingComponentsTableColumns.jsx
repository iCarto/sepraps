import {DateUtil, NumberUtil} from "base/format/utilities";
import {TextLink} from "base/navigation/components";

export function useBuildingComponentsTable() {
    const tableColumns = [
        {
            id: "name",
            label: "Nombre",
            width: 12,
            formatFunction: item => (
                <TextLink
                    text={item.building_component.name}
                    to={`/projects/list/${item.project}/buildingcomponents/list/${item.id}`}
                    textStyle={{fontSize: 14}}
                />
            ),
        },
        {
            id: "total_amount",
            label: "Monto total (Gs.)",
            width: 12,
            formatFunction: item => NumberUtil.formatInteger(item.total_amount),
        },
        {
            id: "real_end_date",
            label: "Fecha de finalización real",
            width: 12,
            formatFunction: item => {
                return DateUtil.formatDate(item.real_end_date);
            },
        },
        {
            id: "financial_progress_percentage",
            label: "% Financiero",
            width: 12,
        },
        {
            id: "physical_progress_percentage",
            label: "% Físico",
            width: 12,
        },
        {
            id: "execution_status_label",
            label: "Estado ejecución",
            width: 12,
        },
        {
            id: "quality_status_label",
            label: "Estado cualitativo",
            width: 12,
        },
    ];

    return {tableColumns};
}
