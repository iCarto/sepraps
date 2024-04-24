import {FormProvider, useForm} from "react-hook-form";
import {ContractSupervisionAreaFormFields, ProductFormDataFields} from ".";

import {FormUtil} from "base/form/utilities";
import {EntityForm} from "base/entity/components/form";
import {AlertError} from "base/error/components";
import {DomainProvider} from "sepraps/domain/provider";

const ContractSupervisionAreaForm = ({
    supervisionArea,
    onSubmit,
    onCancel = null,
    error = null,
}) => {
    const defaultFormValues = {
        id: FormUtil.getFormValue(supervisionArea?.id),
        supervision_type: supervisionArea?.supervisor
            ? "internal"
            : supervisionArea?.supervision_contract
            ? "external"
            : null,
        supervisor: FormUtil.getFormValue(supervisionArea?.supervisor),
        supervision_contract: FormUtil.getFormValue(
            supervisionArea?.supervision_contract
        ),
    };

    const formMethods = useForm({
        defaultValues: defaultFormValues,
        reValidateMode: "onSubmit",
    });

    const onFormSubmit = data => {
        console.log({data});
        onSubmit({
            id: FormUtil.getDataValue(data.id),
            supervisor: FormUtil.getDataValue(data.supervisor),
            supervision_contract: FormUtil.getDataValue(data.supervision_contract),
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
                    <ContractSupervisionAreaFormFields />
                </EntityForm>
            </FormProvider>
        </DomainProvider>
    );
};

export default ContractSupervisionAreaForm;
