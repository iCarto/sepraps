import {FormProvider, useForm} from "react-hook-form";

import {FormUtil} from "base/form/utilities";
import {useGetBuildingComponentTypes} from "buildingComponent/utilities";
import {DomainProvider} from "sepraps/domain/provider";

import {BuildingComponentFormDataFields} from ".";
import {EntityForm} from "base/entity/components/form";
import {FormContainer} from "base/form/components";
import {AlertError} from "base/error/components";

const BuildingComponentForm = ({
    projectId,
    buildingComponent = null,
    onSubmit,
    onCancel = null,
    error = null,
}) => {
    const bcTypes = useGetBuildingComponentTypes(projectId);

    const defaultFormValues = {
        name: FormUtil.getFormValue(buildingComponent?.name),
        code: FormUtil.getFormValue(buildingComponent?.code),
        code_label: FormUtil.getFormValue(buildingComponent?.code_label),
    };

    const formMethods = useForm({
        defaultValues: defaultFormValues,
        reValidateMode: "onSubmit",
    });

    const onFormSubmit = data => {
        const codeLabel =
            FormUtil.getDataValue(data.code_label) ||
            bcTypes.find(type => type.value === data.code).label;

        onSubmit({
            name: FormUtil.getDataValue(data.name),
            code: FormUtil.getDataValue(data.code),
            code_label: codeLabel,
        });
    };

    return (
        <DomainProvider>
            <FormProvider {...formMethods}>
                <AlertError error={error} />
                <FormContainer>
                    <EntityForm
                        onSubmit={formMethods.handleSubmit(onFormSubmit)}
                        onCancel={onCancel}
                    >
                        <BuildingComponentFormDataFields bcTypes={bcTypes} />
                    </EntityForm>
                </FormContainer>
            </FormProvider>
        </DomainProvider>
    );
};

export default BuildingComponentForm;
