import {useWatch} from "react-hook-form";
import {useDomain} from "sepraps/domain/provider";
import {
    FormCheckbox,
    FormDatePicker,
    FormInputText,
    FormSelect,
} from "base/form/components";

import Grid from "@mui/material/Grid";

const ProviderFormLegalDataFields = ({orientation = "column"}) => {
    const {providerTypes} = useDomain();

    const is_legalized = useWatch({
        name: "is_legalized",
    });
    const type = useWatch({
        name: "type",
    });

    return (
        <>
            <Grid container columnSpacing={1} alignItems="center">
                <Grid item xs={orientation === "column" ? 12 : 6}>
                    <FormSelect
                        name="type"
                        label="Tipo"
                        options={providerTypes}
                        rules={{required: "Este campo es obligatorio."}}
                    />
                </Grid>
                <Grid item xs={orientation === "column" ? 12 : 6}>
                    <FormCheckbox
                        name="is_provider_contract_signed_label"
                        label="Contrato Permisionario firmado"
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormCheckbox name="is_legalized" label="Legalmente constituida" />
                </Grid>
                {is_legalized ? (
                    <Grid item xs={orientation === "column" ? 12 : 6}>
                        <FormDatePicker
                            name="legalization_date"
                            label="Fecha de legalización"
                        />
                    </Grid>
                ) : null}
                {is_legalized && type === "junta_de_saneamiento" ? (
                    <Grid item xs={orientation === "column" ? 12 : 6}>
                        <FormInputText
                            name="legal_status_number"
                            label="Nº de personería jurídica"
                        />
                    </Grid>
                ) : null}
                {is_legalized && type === "comision_de_agua" ? (
                    <Grid item xs={orientation === "column" ? 12 : 6}>
                        <FormInputText
                            name="local_resolution_number"
                            label="Nº de resolución municipal"
                        />
                    </Grid>
                ) : null}
            </Grid>
        </>
    );
};

export default ProviderFormLegalDataFields;
