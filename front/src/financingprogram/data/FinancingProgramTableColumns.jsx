import {TextLink} from "base/navigation/components";

export function useFinancingProgramTableColumns() {
    const tableColumns = [
        {
            id: "short_name",
            label: "Nombre corto",
            width: 15,
            formatFunction: item => (
                <TextLink
                    text={item.short_name}
                    to={`/financingprograms/list/${item.id}`}
                    textStyle={{fontSize: "1em"}}
                />
            ),
        },
        {
            id: "name",
            label: "Nombre",
            width: 35,
        },
        {
            id: "financing_funds",
            label: "Financiador/es",
            width: 50,
            formatFunction: element =>
                element?.financing_funds
                    .map(financing_fund => financing_fund.name)
                    .join(", "),
        },
    ];

    return {tableColumns};
}
