import {FormProvider, useForm} from "react-hook-form";

import {FormUtil} from "base/form/utilities";
import {EntityForm} from "base/entity/components/form";
import {AlertError} from "base/error/components";
import {DynamicFormUtil} from "base/dynamicform/utilities";
import {DynamicFormFields} from "base/dynamicform/components";
import {FormContainer} from "base/form/components";

const ContractServiceForm = ({
    contractService,
    onSubmit,
    onCancel = null,
    error = null,
}) => {
    const defaultFormValues = {
        id: FormUtil.getFormValue(contractService?.id),
        ...DynamicFormUtil.getFormDefaultValues(contractService.properties),
    };
    console.log({defaultFormValues});

    const formMethods = useForm({
        defaultValues: defaultFormValues,
        reValidateMode: "onSubmit",
    });

    const onFormSubmit = data => {
        return onSubmit({
            id: FormUtil.getDataValue(data.id),
            properties: {
                ...DynamicFormUtil.getDataValues(contractService.properties, data),
            },
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
                    <DynamicFormFields
                        attributes={contractService.properties}
                        columns={2}
                    />
                </EntityForm>
            </FormContainer>
        </FormProvider>
    );
};

export default ContractServiceForm;
