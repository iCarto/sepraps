import {TextLink} from "base/navigation/components";

export function useProviderTableColumns() {
    const tableColumns = [
        {
            id: "name",
            label: "Nombre",
            width: 45,
            formatFunction: item => (
                <TextLink
                    text={item.name}
                    to={`/providers/list/${item.id}`}
                    textStyle={{fontSize: "1em"}}
                />
            ),
        },
        {
            id: "area_label",
            label: "Área",
            width: 15,
        },
        {
            id: "type_label",
            label: "Tipo",
            width: 25,
        },
        {
            id: "is_legalized_label",
            label: "Legalmente constituida",
            width: 15,
        },
    ];

    return {tableColumns};
}
