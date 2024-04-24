import {useWatch} from "react-hook-form";

import {AMENDMENT_TYPE_AMOUNT, AMENDMENT_TYPE_EXECUTION_PERIOD} from "amendment/model";
import {useDomain} from "sepraps/domain/provider";
import {CURRENCY_SYMBOL} from "base/format/config/i18n";

import {FormDatePicker, FormInputInteger, FormSelect} from "base/form/components";
import Grid from "@mui/material/Grid";

const AmendmentFormDataFields = () => {
    const {amendmentTypes} = useDomain();

    const amendmentType = useWatch({
        name: "amendment_type",
    });

    const displayExtraAmount =
        amendmentType && amendmentType !== AMENDMENT_TYPE_EXECUTION_PERIOD;
    const displayExtraPeriod = amendmentType && amendmentType !== AMENDMENT_TYPE_AMOUNT;

    return (
        <Grid container columnSpacing={2}>
            <Grid container item xs={6} direction="column">
                <FormDatePicker
                    name="signature_date"
                    label="Fecha de suscripción"
                    rules={{required: "Este campo es obligatorio"}}
                />
            </Grid>
            <Grid container item xs={6} direction="column">
                <FormSelect
                    name="amendment_type"
                    label="Tipo"
                    options={amendmentTypes}
                    showEmptyOption
                    rules={{required: "Este campo es obligatorio"}}
                />
            </Grid>
            {displayExtraAmount ? (
                <Grid container item xs={6} direction="column">
                    <FormInputInteger
                        name="extra_amount"
                        label="Monto de la adenda"
                        endAdornment={CURRENCY_SYMBOL}
                        rules={{required: "Este campo es obligatorio"}}
                    />
                </Grid>
            ) : null}
            {displayExtraPeriod ? (
                <Grid container item xs={6} direction="column">
                    <FormInputInteger
                        name="extra_period"
                        label="Plazo de la adenda"
                        maxLength={3}
                        endAdornment="días"
                        rules={{required: "Este campo es obligatorio"}}
                    />
                </Grid>
            ) : null}
        </Grid>
    );
};

export default AmendmentFormDataFields;
