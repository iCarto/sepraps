import {FormProvider, useForm} from "react-hook-form";

import {FormUtil} from "base/form/utilities";
import {NumberUtil} from "base/format/utilities";
import {DomainProvider} from "sepraps/domain/provider";

import {BuildingComponentFormDataFields} from ".";
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
        code: FormUtil.getFormValue(buildingComponent?.code),
        expected_amount: FormUtil.getFormValue(
            NumberUtil.formatDecimal(buildingComponent?.expected_amount, 0)
        ),
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
            code: FormUtil.getDataValue(data.code),
            expected_amount: FormUtil.getDataValue(data.expected_amount),
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
                    <BuildingComponentFormDataFields projectId={projectId} />
                </EntityForm>
            </FormProvider>
        </DomainProvider>
    );
};

export default BuildingComponentForm;
