import {FormProvider, useForm} from "react-hook-form";
import {ProductFormDataFields} from ".";

import {FormUtil} from "base/form/utilities";
import {EntityForm} from "base/entity/components/form";
import {AlertError} from "base/error/components";

const PaymentForm = ({
    paymentId,
    product = null,
    onSubmit,
    onCancel = null,
    error = null,
}) => {
    const defaultFormValues = {
        id: FormUtil.getFormValue(product?.id),
        name: FormUtil.getFormValue(product?.name),
        status: FormUtil.getFormValue(product?.status),
        presentation_date: FormUtil.getFormValue(product?.presentation_date),
    };

    const formMethods = useForm({
        defaultValues: defaultFormValues,
        reValidateMode: "onSubmit",
    });

    const onFormSubmit = data => {
        onSubmit({
            id: FormUtil.getDataValue(data.id),
            name: FormUtil.getDataValue(data.name),
            status: FormUtil.getDataValue(data.status),
            presentation_date: FormUtil.getDataValue(data.presentation_date),
            payment: paymentId,
        });
    };

    return (
        <FormProvider {...formMethods}>
            <AlertError error={error} />
            <EntityForm
                onSubmit={formMethods.handleSubmit(onFormSubmit)}
                onCancel={onCancel}
            >
                <ProductFormDataFields />
            </EntityForm>
        </FormProvider>
    );
};

export default PaymentForm;
