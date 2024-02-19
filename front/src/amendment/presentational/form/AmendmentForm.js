import {FormProvider, useForm} from "react-hook-form";

import {DomainProvider} from "sepraps/domain/provider";
import {FormUtil} from "base/form/utilities";

import {EntityForm} from "base/entity/components/form";
import {AlertError} from "base/error/components";
import {AmendmentFormDataFields} from ".";
import {NumberUtil} from "base/format/utilities";

const AmendmentForm = ({
    contractId,
    amendment = null,
    onSubmit,
    onCancel = null,
    error = null,
}) => {
    const defaultFormValues = {
        id: FormUtil.getFormValue(amendment?.id),
        signature_date: FormUtil.getFormValue(amendment?.signature_date),
        amendment_type: FormUtil.getFormValue(amendment?.amendment_type),
        extra_amount: FormUtil.getFormValue(
            NumberUtil.formatDecimal(amendment?.extra_amount, 0)
        ),
        extra_period: FormUtil.getFormValue(amendment?.extra_period),
    };

    const formMethods = useForm({
        defaultValues: defaultFormValues,
        reValidateMode: "onSubmit",
    });

    const onFormSubmit = data => {
        onSubmit({
            id: FormUtil.getDataValue(data.id),
            signature_date: FormUtil.getDataValue(data.signature_date),
            amendment_type: FormUtil.getDataValue(data.amendment_type),
            extra_amount: FormUtil.getDataValue(data.extra_amount),
            extra_period: FormUtil.getDataValue(data.extra_period),
            contract: contractId,
        });
    };

    return (
        <DomainProvider>
            <FormProvider {...formMethods}>
                <AlertError error={error} />
                <EntityForm
                    onSubmit={formMethods.handleSubmit(onFormSubmit)}
                    onCancel={onCancel}
                >
                    <AmendmentFormDataFields />
                </EntityForm>
            </FormProvider>
        </DomainProvider>
    );
};

export default AmendmentForm;
