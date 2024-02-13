import {FormProvider, useForm} from "react-hook-form";

import {FormUtil} from "base/form/utilities";
import {DynamicFormUtil} from "base/dynamicform/utilities";
import {EntityForm} from "base/entity/components/form";
import {AlertError} from "base/error/components";
import {DynamicFormFields} from "base/dynamicform/components";
import {FormContainer} from "base/form/components";

const BuildingComponentTechnicalDataForm = ({
    buildingComponent,
    propertiesKey,
    onSubmit,
    onCancel = null,
    error = null,
}) => {
    const defaultFormValues = {
        id: FormUtil.getFormValue(buildingComponent.id),
        ...DynamicFormUtil.getFormDefaultValues(buildingComponent[propertiesKey]),
    };

    const formMethods = useForm({
        defaultValues: defaultFormValues,
        reValidateMode: "onSubmit",
    });

    const onFormSubmit = data => {
        const formData = {
            id: FormUtil.getDataValue(data.id),
        };

        formData[propertiesKey] = {
            ...DynamicFormUtil.getDataValues(buildingComponent[propertiesKey], data),
        };

        onSubmit(formData);
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
                        attributes={buildingComponent[propertiesKey]}
                        columns={2}
                    />
                </EntityForm>
            </FormContainer>
        </FormProvider>
    );
};

export default BuildingComponentTechnicalDataForm;
