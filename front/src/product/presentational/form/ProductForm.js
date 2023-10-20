import {FormProvider, useForm} from "react-hook-form";
import {ProductFormDataFields} from ".";

import {FormUtil} from "base/form/utilities";
import {EntityForm} from "base/entity/components/form";
import {AlertError} from "base/error/components";
import {DomainProvider} from "sepraps/domain/provider";

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
        product_date: FormUtil.getFormValue(product?.product_date),
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
            product_date: FormUtil.getDataValue(data.product_date),
            payment: paymentId,
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
                    <ProductFormDataFields />
                </EntityForm>
            </FormProvider>
        </DomainProvider>
    );
};

export default PaymentForm;
