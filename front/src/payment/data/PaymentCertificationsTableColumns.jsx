import {CURRENCY_SYMBOL} from "base/format/config/i18n";
import {NumberUtil} from "base/format/utilities";
import {TextLink} from "base/navigation/components";

export function usePaymentCertificationsTable() {
    const tableColumns = [
        {
            id: "project.name",
            label: "Proyecto",
            formatFunction: item => {
                return (
                    <TextLink
                        text={item.project?.name}
                        to={`/projects/list/${item.project?.id}/certifications/overview`}
                        textStyle={{fontSize: 14}}
                    />
                );
            },
            width: 30,
        },
        {
            id: "project.code",
            label: "Código del proyecto",
            formatFunction: item => {
                return item.project?.code;
            },
            width: 20,
        },
        {
            id: "notes",
            label: `Observaciones`,
            width: 30,
        },
        {
            id: "approved_amount",
            label: `Monto aprobado (${CURRENCY_SYMBOL})`,
            formatFunction: item => {
                return `${NumberUtil.formatInteger(item.approved_amount)}`;
            },
            width: 20,
        },
    ];

    return {tableColumns};
}
