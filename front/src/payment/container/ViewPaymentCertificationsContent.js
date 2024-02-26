import {NumberUtil} from "base/format/utilities";

import {usePaymentCertificationsTable} from "payment/data";

import {SectionCard} from "base/ui/section/components";
import {TotalsSpanningTable} from "base/table/components";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const ViewPaymentCertificationsContent = ({payment, inconsistentTotalAmount}) => {
    const {tableColumns} = usePaymentCertificationsTable();

    const parsedTableTotal = NumberUtil.formatInteger(
        payment.certifications_total_amount
    );

    const totalWithIcon = (
        <>
            <InfoOutlinedIcon fontSize="small" sx={{mr: 1}} /> {parsedTableTotal}
        </>
    );
    const totalWarning =
        "El total aprobado en los proyectos no coincide con el monto de este certificado";

    return (
        <SectionCard title="Certificaciones por proyecto">
            <TotalsSpanningTable
                dataRows={payment.certifications}
                tableColumns={tableColumns}
                total={inconsistentTotalAmount ? totalWithIcon : parsedTableTotal}
                totalTooltip={inconsistentTotalAmount ? totalWarning : ""}
            />
        </SectionCard>
    );
};

export default ViewPaymentCertificationsContent;
