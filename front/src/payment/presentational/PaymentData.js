import {SectionField} from "base/ui/section/components";
import {DateUtil, NumberUtil} from "base/format/utilities";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const getStatusColor = value => {
    if (value === "no_pagado") {
        return "error";
    } else if (value === "pagado") {
        return "success";
    }
    return null;
};

const StatusChip = ({label, value}) => (
    <Chip label={label} color={getStatusColor(value)} />
);

const PaymentDataBox = ({label, children}) => {
    return (
        <Box
            sx={{
                border: 1,
                borderRadius: 2,
                borderColor: "grey.200",
                mt: 3,
                p: 1,
            }}
        >
            <Typography sx={{color: "grey.500", fontSize: "0.8rem"}}>
                {label}
            </Typography>
            <Divider />
            {children}
        </Box>
    );
};

const PaymentData = ({payment}) => {
    return (
        <Grid container spacing={2}>
            <Grid container item xs={6} direction="column">
                <SectionField label="Nombre" value={payment.name} />
                <PaymentDataBox label="Previsión">
                    <SectionField
                        label="Monto previsto fijo"
                        value={NumberUtil.formatInteger(payment.expected_fixed_amount)}
                        unit="Gs."
                    />
                    <SectionField
                        label="Monto previsto variable"
                        value={NumberUtil.formatInteger(
                            payment.expected_variable_amount
                        )}
                        unit="Gs."
                    />
                </PaymentDataBox>
            </Grid>
            <Grid container item xs={6} direction="column">
                <SectionField
                    label="Estado"
                    value={
                        <StatusChip
                            label={payment.status_label}
                            value={payment.status}
                        />
                    }
                />
                <PaymentDataBox label="Pago">
                    <SectionField
                        label="Fecha de pago"
                        value={DateUtil.formatDate(payment.payment_date)}
                    />
                    <SectionField
                        label="Monto fijo"
                        value={NumberUtil.formatInteger(payment.fixed_amount)}
                        unit="Gs."
                    />
                    <SectionField
                        label="Monto variable"
                        value={NumberUtil.formatInteger(payment.variable_amount)}
                        unit="Gs."
                    />
                </PaymentDataBox>
            </Grid>
        </Grid>
    );
};

export default PaymentData;
