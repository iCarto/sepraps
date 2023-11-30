import {FormProvider, useForm} from "react-hook-form";

import {FormUtil} from "base/form/utilities";
import {EntityForm} from "base/entity/components/form";
import {PaymentFormDataFields} from ".";
import {AlertError} from "base/error/components";
import {NumberUtil} from "base/format/utilities";
import {DomainProvider} from "sepraps/domain/provider";

const PaymentForm = ({
    contractId,
    contract = null,
    payment = null,
    onSubmit,
    onCancel = null,
    error = null,
}) => {
    const defaultFormValues = {
        id: FormUtil.getFormValue(payment?.id),
        name: FormUtil.getFormValue(payment?.name),
        expected_fixed_amount: payment?.expected_fixed_amount
            ? NumberUtil.formatDecimal(payment.expected_fixed_amount, 0)
            : "",
        expected_variable_amount: payment?.expected_variable_amount
            ? NumberUtil.formatDecimal(payment.expected_variable_amount, 0)
            : "",
        expected_total_amount: payment?.expected_total_amount
            ? NumberUtil.formatDecimal(payment.expected_total_amount, 0)
            : "",
        expected_payment_date: FormUtil.getFormValue(payment?.expected_payment_date),
        paid_fixed_amount: payment?.paid_fixed_amount
            ? NumberUtil.formatDecimal(payment.paid_fixed_amount, 0)
            : "",
        paid_variable_amount: payment?.paid_variable_amount
            ? NumberUtil.formatDecimal(payment.paid_variable_amount, 0)
            : "",
        paid_total_amount: payment?.paid_total_amount
            ? NumberUtil.formatDecimal(payment.paid_total_amount, 0)
            : "",
        status: FormUtil.getFormValue(payment?.status, "no_pagado"),
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
            expected_fixed_amount: FormUtil.getDataValue(data.expected_fixed_amount),
            expected_variable_amount: FormUtil.getDataValue(
                data.expected_variable_amount
            ),
            expected_total_amount: FormUtil.getDataValue(data.expected_total_amount),
            expected_payment_date: FormUtil.getDataValue(data.expected_payment_date),
            paid_fixed_amount: FormUtil.getDataValue(data.paid_fixed_amount),
            paid_variable_amount: FormUtil.getDataValue(data.paid_variable_amount),
            paid_total_amount: FormUtil.getDataValue(data.paid_total_amount),
            payment_date: FormUtil.getDataValue(data.payment_date),
            status: FormUtil.getDataValue(data.status),
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
                    <PaymentFormDataFields contract={contract} />
                </EntityForm>
            </FormProvider>
        </DomainProvider>
    );
};

export default PaymentForm;