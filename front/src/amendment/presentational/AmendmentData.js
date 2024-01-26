import {theme} from "Theme";
import {DateUtil, NumberUtil} from "base/format/utilities";
import {CURRENCY_SYMBOL} from "base/format/config/i18n";
import {AMENDMENT_TYPE_AMOUNT, AMENDMENT_TYPE_EXECUTION_PERIOD} from "amendment/model";

import {ListEntityFolder} from "base/file/components";
import {SectionField} from "base/ui/section/components";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

const DeviationChip = ({deviationValue, tooltipText = ""}) => {
    return (
        <Tooltip title={tooltipText}>
            <Chip
                label={
                    <Typography fontSize={14}>
                        Variación{" "}
                        <Typography fontWeight={600} fontSize={14} display="inline">
                            {NumberUtil.formatDecimal(deviationValue)} %
                        </Typography>
                    </Typography>
                }
                size="small"
                variant="outlined"
                sx={{
                    color: theme.palette.expected.dark,
                    borderColor: theme.palette.expected.dark,
                }}
            />
        </Tooltip>
    );
};

const AmountAmendmentData = ({amendment, contract}) => {
    const deviation = (amendment.extra_amount / contract.awarding_budget) * 100;

    return (
        <>
            <Grid container item xs={5}>
                <SectionField
                    label="Monto de la adenda"
                    value={NumberUtil.formatInteger(amendment.extra_amount)}
                    unit={CURRENCY_SYMBOL}
                />
            </Grid>
            <Grid container item xs={5}>
                <SectionField
                    label="Monto del contrato ampliado"
                    value={NumberUtil.formatInteger(
                        amendment.cumulative_contract_amended_amount
                    )}
                    unit={CURRENCY_SYMBOL}
                />
            </Grid>
            <Grid container item xs justifyContent="center" alignItems="center">
                <DeviationChip
                    deviationValue={deviation}
                    tooltipText="Con respecto al contrato original"
                />
            </Grid>
        </>
    );
};

const ExecutionPeriodAmendmentData = ({amendment, contract}) => {
    const deviation =
        (amendment.extra_period / contract.expected_execution_period) * 100;

    return (
        <>
            <Grid container item xs={5}>
                <SectionField
                    label="Plazo de la adenda"
                    value={amendment.extra_period}
                    unit={"días"}
                />
            </Grid>
            <Grid container item xs={5}>
                <SectionField
                    label="Plazo de ejecución del contrato ampliado"
                    value={`${parseInt(
                        amendment.cumulative_contract_amended_execution_period
                    )} días (${
                        contract.total_expected_execution_period_in_months
                    } meses)`}
                />
            </Grid>
            <Grid container item xs justifyContent="center" alignItems="center">
                <DeviationChip
                    deviationValue={deviation}
                    tooltipText="Con respecto al contrato original"
                />
            </Grid>
        </>
    );
};

const AmendmentData = ({amendment, contract}) => {
    const amendmentType = amendment.amendment_type;

    const displayExtraAmountData =
        amendmentType && amendmentType !== AMENDMENT_TYPE_EXECUTION_PERIOD;
    const displayExtraPeriodData =
        amendmentType && amendmentType !== AMENDMENT_TYPE_AMOUNT;

    return (
        <Grid container columnSpacing={2}>
            <Grid container item xs={5}>
                <SectionField
                    label="Fecha de suscripción"
                    value={DateUtil.formatDate(amendment.signature_date)}
                />
            </Grid>
            <Grid container item xs={5}>
                <SectionField label="Tipo" value={amendment.amendment_type_label} />
            </Grid>

            {displayExtraAmountData ? (
                <AmountAmendmentData amendment={amendment} contract={contract} />
            ) : null}
            {displayExtraPeriodData ? (
                <ExecutionPeriodAmendmentData
                    amendment={amendment}
                    contract={contract}
                />
            ) : null}

            <Grid item xs={12}>
                <ListEntityFolder folderPath={amendment.folder} basePath={""} />
            </Grid>
        </Grid>
    );
};

export default AmendmentData;
