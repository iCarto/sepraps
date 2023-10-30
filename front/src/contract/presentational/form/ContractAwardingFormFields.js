import {useWatch} from "react-hook-form";
import {CURRENCY_SYMBOL} from "base/format/config/i18n";
import {FormDatePicker, FormInputInteger, FormSelect} from "base/form/components";
import {MAX_MIN_AMOUNT_TYPE} from "contract/model";
import {useDomain} from "sepraps/domain/provider";

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

const ContractAwardingFormFields = () => {
    const {yesNoDomain} = useDomain();

    const totalAmountType = useWatch({
        name: "total_amount_type",
    });

    return (
        <>
            <FormDatePicker
                name="awarding_date"
                label="Fecha de adjudicación"
                rules={{required: "El campo es obligatorio"}}
            />
            <FormSelect
                name="awarding_professional_liability_insurance"
                label="Seguro de responsabilidad profesional"
                options={yesNoDomain}
            />
            <FormSelect
                name="awarding_liability_insurance"
                label="Seguro de responsabilidad civil"
                options={yesNoDomain}
            />
            <FormSelect
                name="awarding_accident_insurance"
                label="Seguro de accidentes"
                options={yesNoDomain}
            />
            <AwardingBudgetFormFields totalAmountType={totalAmountType} />
        </>
    );
};

export default ContractAwardingFormFields;
