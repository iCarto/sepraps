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

    const isLegalized = useWatch({
        name: "is_legalized",
    });
    const type = useWatch({
        name: "type",
    });

    const isJuntaDeSaneamiento = type === "junta_de_saneamiento";
    const isComisionDeAguaOSaneamiento =
        type === "comision_de_agua" || type === "comision_de_saneamiento";

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
                        name="is_provider_contract_signed"
                        label="Contrato permisionario firmado"
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormCheckbox
                        name="is_legalized"
                        label="Legalmente constituida"
                        defaultChecked={isJuntaDeSaneamiento ? true : false}
                        disabled={isJuntaDeSaneamiento ? true : false}
                    />
                </Grid>
                {isLegalized || isJuntaDeSaneamiento ? (
                    <Grid item xs={orientation === "column" ? 12 : 6}>
                        <FormDatePicker
                            name="legalization_date"
                            label="Fecha de legalización"
                        />
                    </Grid>
                ) : null}
                {isJuntaDeSaneamiento ? (
                    <Grid item xs={orientation === "column" ? 12 : 6}>
                        <FormInputText
                            name="legal_status_number"
                            label="Nº de personería jurídica"
                        />
                    </Grid>
                ) : null}
                {isLegalized && isComisionDeAguaOSaneamiento ? (
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
