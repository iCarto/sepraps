import {FormProvider, useForm} from "react-hook-form";

import {FormUtil} from "base/form/utilities";
import {DynamicFormUtil} from "base/dynamicform/utilities";
import {EntityForm} from "base/entity/components/form";
import {AlertError} from "base/error/components";
import {DynamicFormFields} from "base/dynamicform/components";
import {FormContainer} from "base/form/components";

const BuildingComponentTechnicalDataForm = ({
    buildingComponent,
    onSubmit,
    onCancel = null,
    error = null,
}) => {
    const defaultFormValues = {
        id: FormUtil.getFormValue(buildingComponent?.id),
        ...DynamicFormUtil.getFormDefaultValues(buildingComponent.properties),
    };

    const formMethods = useForm({
        defaultValues: defaultFormValues,
        reValidateMode: "onSubmit",
    });

    const onFormSubmit = data => {
        onSubmit({
            id: FormUtil.getDataValue(data.id),
            properties: {
                ...DynamicFormUtil.getDataValues(buildingComponent.properties, data),
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
                        attributes={buildingComponent.properties}
                        columns={2}
                    />
                </EntityForm>
            </FormContainer>
        </FormProvider>
    );
};

export default BuildingComponentTechnicalDataForm;
