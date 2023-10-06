import {FormProvider, useForm} from "react-hook-form";

import {FormUtil} from "base/form/utilities";
import {EntityForm} from "base/entity/components/form";
import {PaymentFormDataFields} from ".";
import {AlertError} from "base/error/components";
import {NumberUtil} from "base/format/utilities";

const PaymentForm = ({
    contractId,
    payment = null,
    onSubmit,
    onCancel = null,
    error = null,
}) => {
    const defaultFormValues = {
        id: FormUtil.getFormValue(payment?.id),
        name: FormUtil.getFormValue(payment?.name),
        amount: payment?.amount ? NumberUtil.formatDecimal(payment.amount, 0) : "",
        status: FormUtil.getFormValue(payment?.status),
        payment_date: FormUtil.getFormValue(payment?.payment_date),
    };

    const formMethods = useForm({
        defaultValues: defaultFormValues,
        reValidateMode: "onSubmit",
    });

    const onFormSubmit = data => {
        onSubmit({
            id: FormUtil.getDataValue(data.id),
            name: FormUtil.getDataValue(data.name),
            amount: FormUtil.getDataValue(data.amount),
            status: FormUtil.getDataValue(data.status),
            payment_date: FormUtil.getDataValue(data.payment_date),
            contract: contractId,
        });
    };

    return (
        <FormProvider {...formMethods}>
            <AlertError error={error} />
            <EntityForm
                onSubmit={formMethods.handleSubmit(onFormSubmit)}
                onCancel={onCancel}
            >
                <PaymentFormDataFields />
            </EntityForm>
        </FormProvider>
    );
};

export default PaymentForm;
