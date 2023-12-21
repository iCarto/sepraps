import {FormProvider, useForm} from "react-hook-form";

import {FormUtil} from "base/form/utilities";
import {DomainProvider} from "sepraps/domain/provider";

import {SocialComponentFormDataFields} from ".";
import {EntityForm} from "base/entity/components/form";
import {AlertError} from "base/error/components";

const BuildingComponentForm = ({
    projectId,
    buildingComponent = null,
    onSubmit,
    onCancel = null,
    error = null,
}) => {
    const defaultFormValues = {
        name: FormUtil.getFormValue(buildingComponent?.name),
        expected_end_date: FormUtil.getFormValue(buildingComponent?.expected_end_date),
        execution_status: FormUtil.getFormValue(buildingComponent?.execution_status),
    };

    const formMethods = useForm({
        defaultValues: defaultFormValues,
        reValidateMode: "onSubmit",
    });

    const onFormSubmit = data => {
        onSubmit({
            name: FormUtil.getDataValue(data.name),
            code: "otro",
            expected_end_date: FormUtil.getDataValue(data.expected_end_date),
            execution_status: FormUtil.getDataValue(data.execution_status),
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
                    <SocialComponentFormDataFields projectId={projectId} />
                </EntityForm>
            </FormProvider>
        </DomainProvider>
    );
};

export default BuildingComponentForm;
