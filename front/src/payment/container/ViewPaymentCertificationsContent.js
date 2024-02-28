import {NumberUtil} from "base/format/utilities";

import {usePaymentCertificationsTable} from "payment/data";

import {SectionCard} from "base/ui/section/components";
import {TotalsSpanningTable} from "base/table/components";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {useOutletContext} from "react-router-dom";

export const getTotal = (items, totalColumn) => {
    return items
        .map(item => parseInt(item[totalColumn]))
        .reduce((sum, i) => sum + i, 0);
};

const ViewPaymentCertificationsContent = ({payment}) => {
    const {tableColumns} = usePaymentCertificationsTable();
    const context = useOutletContext();
    console.log(context);

    const tableTotal = payment.certifications_total_amount;
    const parsedTableTotal = NumberUtil.formatInteger(tableTotal);

    const areTotalsEqual = parseInt(payment.paid_total_amount) === tableTotal;

    const totalWithIcon = (
        <>
            <InfoOutlinedIcon fontSize="small" /> {parsedTableTotal}
        </>
    );
    const totalWarning =
        "El total certificado en los proyectos no coincide con el monto aprobado en este cerificado";

    return (
        <SectionCard title="Certificaciones por proyecto">
            <TotalsSpanningTable
                dataRows={payment.certifications}
                tableColumns={tableColumns}
                total={areTotalsEqual ? parsedTableTotal : totalWithIcon}
                totalTooltip={areTotalsEqual ? "" : totalWarning}
            />
        </SectionCard>
    );
};

export default ViewPaymentCertificationsContent;
