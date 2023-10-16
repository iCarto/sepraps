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
        fixed_amount: payment?.fixed_amount
            ? NumberUtil.formatDecimal(payment.fixed_amount, 0)
            : "",
        variable_amount: payment?.variable_amount
            ? NumberUtil.formatDecimal(payment.variable_amount, 0)
            : "",
        expected_fixed_amount: payment?.expected_fixed_amount
            ? NumberUtil.formatDecimal(payment.expected_fixed_amount, 0)
            : "",
        expected_variable_amount: payment?.expected_variable_amount
            ? NumberUtil.formatDecimal(payment.expected_variable_amount, 0)
            : "",
        appraisal: FormUtil.getFormValue(payment?.appraisal),
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
            fixed_amount: FormUtil.getDataValue(data.fixed_amount),
            variable_amount: FormUtil.getDataValue(data.variable_amount),
            expected_fixed_amount: FormUtil.getDataValue(data.expected_fixed_amount),
            expected_variable_amount: FormUtil.getDataValue(
                data.expected_variable_amount
            ),
            appraisal: FormUtil.getDataValue(data.appraisal),
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
