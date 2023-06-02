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
    const {providerTypes, providerLegalStatus} = useDomain();

    const is_legalized = useWatch({
        name: "is_legalized",
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
                    <FormCheckbox name="is_legalized" label="Legalmente constituida" />
                </Grid>
                {is_legalized ? (
                    <>
                        <Grid item xs={orientation === "column" ? 12 : 6}>
                            <FormDatePicker
                                name="legalization_date"
                                label="Fecha de legalización"
                            />
                        </Grid>
                        <Grid item xs={orientation === "column" ? 12 : 6}>
                            <FormSelect
                                name="legal_status"
                                label="Naturaleza jurídica"
                                options={providerLegalStatus}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormInputText
                                name="legal_registry_code"
                                label="Nº personería jurídica/registro"
                            />
                        </Grid>
                    </>
                ) : null}
            </Grid>
        </>
    );
};

export default ProviderFormLegalDataFields;
