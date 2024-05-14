import {FormProvider, useForm} from "react-hook-form";

import {FormUtil} from "base/form/utilities";
import {NumberUtil} from "base/format/utilities";

import {CertificationFormDataFields} from ".";
import {EntityForm} from "base/entity/components/form";
import {AlertError} from "base/error/components";
import {FormContainer} from "base/form/components";

const CertificationForm = ({
    project = null,
    certification = null,
    onSubmit,
    onCancel = null,
    error = null,
}) => {
    const defaultFormValues = {
        id: FormUtil.getFormValue(certification?.id),
        expected_amount: certification?.expected_amount
            ? NumberUtil.formatDecimal(certification.expected_amount, 0)
            : "",
        approved_amount: certification?.approved_amount
            ? NumberUtil.formatDecimal(certification.approved_amount, 0)
            : "",
        approval_date: FormUtil.getFormValue(certification?.approval_date),
        notes: FormUtil.getFormValue(certification?.notes),
        payment: FormUtil.getFormValue(certification?.payment?.id),
    };

    const formMethods = useForm({
        defaultValues: defaultFormValues,
        reValidateMode: "onSubmit",
    });

    const onFormSubmit = data => {
        onSubmit({
            id: FormUtil.getDataValue(data.id),
            expected_amount: FormUtil.getDataValue(data.expected_amount),
            approved_amount: FormUtil.getDataValue(data.approved_amount),
            approval_date: FormUtil.getDataValue(data.approval_date),
            notes: FormUtil.getDataValue(data.notes),
            payment: FormUtil.getDataValue(data.payment),
            project: project.id,
        });
    };

    return (
        <FormProvider {...formMethods}>
            <AlertError error={error} />
            <FormContainer>
                <EntityForm
                    onSubmit={formMethods.handleSubmit(onFormSubmit)}
                    onCancel={onCancel}
                >
                    <CertificationFormDataFields
                        contractId={project?.construction_contract?.id}
                    />
                </EntityForm>
            </FormContainer>
        </FormProvider>
    );
};

export default CertificationForm;
