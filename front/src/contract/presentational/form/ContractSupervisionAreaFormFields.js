import {useFormContext, useWatch} from "react-hook-form";
import {CURRENCY_SYMBOL} from "base/format/config/i18n";
import {FormDatePicker, FormInputInteger, FormSelect} from "base/form/components";
import {MAX_MIN_AMOUNT_TYPE} from "contract/model";
import {useDomain} from "sepraps/domain/provider";
import {ContactSearchAutocomplete} from "contact/presentational";
import Grid from "@mui/material/Grid";
import ContractSearchAutocomplete from "../ContractSearchAutocomplete";

const AwardingBudgetFormFields = ({totalAmountType}) => {
    return totalAmountType === MAX_MIN_AMOUNT_TYPE ? (
        <>
            <FormInputInteger
                key="max_min_awarding_budget_min"
                name="awarding_budget_min"
                label="Monto mínimo"
                endAdornment={CURRENCY_SYMBOL}
                rules={{required: "El campo es obligatorio"}}
            />
            <FormInputInteger
                key="max_min_awarding_budget"
                name="awarding_budget"
                label="Monto máximo"
                endAdornment={CURRENCY_SYMBOL}
                rules={{required: "El campo es obligatorio"}}
            />
        </>
    ) : (
        <FormInputInteger
            key="awarding_budget"
            name="awarding_budget"
            label="Monto"
            endAdornment={CURRENCY_SYMBOL}
            rules={{required: "El campo es obligatorio"}}
        />
    );
};

const ContractSupervisionAreaFormFields = () => {
    const {yesNoDomain} = useDomain();

    const {reset, getValues} = useFormContext();

    const supervisionType = useWatch({
        name: "supervision_type",
    });

    const handleSelectSupervisor = contact => {
        const values = getValues();
        reset({
            ...values,
            supervisor: contact,
            supervision_contract: null,
        });
    };

    const handleSelectSupervisionContract = contract => {
        const values = getValues();
        reset({
            ...values,
            supervisor: null,
            supervision_contract: contract,
        });
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <FormSelect
                    name="supervision_type"
                    label="Tipo de supervisión"
                    options={[
                        {
                            label: "Interna",
                            value: "internal",
                        },
                        {
                            label: "Externa",
                            value: "external",
                        },
                    ]}
                />
            </Grid>
            {supervisionType === "internal" && (
                <Grid item xs={6}>
                    <ContactSearchAutocomplete
                        allowedPosts={[]}
                        handleSelect={handleSelectSupervisor}
                    />
                </Grid>
            )}
            {supervisionType === "external" && (
                <Grid item xs={6}>
                    <ContractSearchAutocomplete
                        handleSelect={handleSelectSupervisionContract}
                    />
                </Grid>
            )}
        </Grid>
    );
};

export default ContractSupervisionAreaFormFields;
