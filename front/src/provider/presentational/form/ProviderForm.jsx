import {FormProvider, useForm} from "react-hook-form";

import {FormUtil} from "base/form/utilities";
import {EntityForm} from "base/entity/components/form";
import {DomainProvider} from "sepraps/domain/provider";
import {AlertError} from "base/error/components";

const ProviderForm = ({
    provider = null,
    onSubmit,
    onCancel = null,
    error = null,
    children,
}) => {
    const defaultFormValues = {
        id: FormUtil.getFormValue(provider?.id),
        name: FormUtil.getFormValue(provider?.name),
        area: FormUtil.getFormValue(provider?.area),
        type: FormUtil.getFormValue(provider?.type),
        number_of_members: FormUtil.getFormValue(provider?.number_of_members),
        number_of_women: FormUtil.getFormValue(provider?.number_of_women),
        is_legalized: FormUtil.getFormValue(provider?.is_legalized || false),
        legalization_date: FormUtil.getFormValue(provider?.legalization_date),
        is_provider_contract_signed: FormUtil.getFormValue(
            provider?.is_provider_contract_signed || false
        ),
        legal_status_number: FormUtil.getFormValue(provider?.legal_status_number),
        local_resolution_number: FormUtil.getFormValue(
            provider?.local_resolution_number
        ),
    };

    const formMethods = useForm({
        defaultValues: defaultFormValues,
        reValidateMode: "onSubmit",
    });

    const handleFormSubmit = data => {
        return onSubmit({
            id: FormUtil.getDataValue(data.id),
            name: FormUtil.getDataValue(data.name),
            area: FormUtil.getDataValue(data.area),
            type: FormUtil.getDataValue(data.type),
            number_of_members: FormUtil.getDataValue(data.number_of_members),
            number_of_women: FormUtil.getDataValue(data.number_of_women),
            is_legalized:
                data.type === "junta_de_saneamiento" ? true : data.is_legalized,
            legalization_date: FormUtil.getDataValue(data.legalization_date),
            is_provider_contract_signed: FormUtil.getDataValue(
                data.is_provider_contract_signed
            ),
            legal_status_number: FormUtil.getDataValue(data.legal_status_number),
            local_resolution_number: FormUtil.getDataValue(
                data.local_resolution_number
            ),
        });
    };

    return (
        <DomainProvider>
            <FormProvider {...formMethods}>
                <AlertError error={error} />
                <EntityForm
                    onSubmit={formMethods.handleSubmit(handleFormSubmit)}
                    onCancel={onCancel}
                >
                    {children}
                </EntityForm>
            </FormProvider>
        </DomainProvider>
    );
};

export default ProviderForm;
