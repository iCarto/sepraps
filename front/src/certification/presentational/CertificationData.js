import {DateUtil, NumberUtil} from "base/format/utilities";
import {CURRENCY_SYMBOL} from "base/format/config/i18n";

import {SectionBox, SectionField} from "base/ui/section/components";

import Grid from "@mui/material/Grid";

const CertificationData = ({certification}) => {
    const isPaymentApproved = !!certification.payment?.approval_date;

    return (
        <Grid container spacing={2}>
            <Grid container item xs={6} direction="column">
                <SectionBox label="Previsión">
                    <SectionField
                        label="Monto previsto"
                        value={NumberUtil.formatInteger(certification.expected_amount)}
                        unit={CURRENCY_SYMBOL}
                    />
                </SectionBox>
            </Grid>
            <Grid container item xs={6} direction="column">
                <SectionBox label="Aprobación">
                    <SectionField
                        label="Producto"
                        value={certification.payment?.name}
                        linkPath={`/contracts/list/${certification.payment?.contract}/payment/list/${certification.payment?.id}`}
                    />
                    <SectionField
                        label={
                            isPaymentApproved
                                ? "Fecha de aprobación"
                                : "Fecha de aprobación prevista"
                        }
                        value={DateUtil.formatDate(
                            certification.payment?.approval_date ||
                                certification.payment?.expected_approval_date
                        )}
                    />
                    <SectionField
                        label="Monto real"
                        value={NumberUtil.formatInteger(certification.approved_amount)}
                        unit={CURRENCY_SYMBOL}
                    />
                    <SectionField label="Observaciones" value={certification.notes} />
                </SectionBox>
            </Grid>
        </Grid>
    );
};

export default CertificationData;
