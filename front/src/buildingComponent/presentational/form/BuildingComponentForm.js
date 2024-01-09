import {FormProvider, useForm} from "react-hook-form";

import {FormUtil} from "base/form/utilities";
import {NumberUtil} from "base/format/utilities";
import {useGetBuildingComponentTypes} from "buildingComponent/utilities";
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
    const bcTypes = useGetBuildingComponentTypes(projectId);

    const defaultFormValues = {
        name: FormUtil.getFormValue(buildingComponent?.name),
        code: FormUtil.getFormValue(buildingComponent?.code),
        code_label: FormUtil.getFormValue(buildingComponent?.code_label),
        quality_status: FormUtil.getFormValue(buildingComponent?.quality_status),
        expected_amount: FormUtil.getFormValue(
            NumberUtil.formatDecimal(buildingComponent?.expected_amount, 0)
        ),
        expected_end_date: FormUtil.getFormValue(buildingComponent?.expected_end_date),
        paid_amount: FormUtil.getFormValue(
            NumberUtil.formatDecimal(buildingComponent?.paid_amount, 0)
        ),
        pending_amount: FormUtil.getFormValue(
            NumberUtil.formatDecimal(buildingComponent?.pending_amount, 0)
        ),
        financial_progress_percentage: FormUtil.getFormValue(
            NumberUtil.formatDecimal(
                buildingComponent?.financial_progress_percentage,
                0
            )
        ),
        physical_progress_percentage: buildingComponent?.physical_progress_percentage
            ? NumberUtil.formatDecimal(
                  buildingComponent?.physical_progress_percentage,
                  0
              )
            : "",
        real_end_date: FormUtil.getFormValue(buildingComponent?.real_end_date),
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
            execution_status: FormUtil.getDataValue(data.execution_status),
            quality_status: FormUtil.getDataValue(data.quality_status),
            expected_amount: FormUtil.getDataValue(data.expected_amount),
            paid_amount: FormUtil.getDataValue(data.paid_amount),
            pending_amount: FormUtil.getDataValue(data.pending_amount),
            financial_progress_percentage: FormUtil.getDataValue(
                data.financial_progress_percentage
            ),
            physical_progress_percentage: FormUtil.getDataValue(
                data.physical_progress_percentage
            ),
            expected_end_date: FormUtil.getDataValue(data.expected_end_date),
            real_end_date: FormUtil.getDataValue(data.real_end_date),
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
                    <BuildingComponentFormDataFields bcTypes={bcTypes} />
                </EntityForm>
            </FormProvider>
        </DomainProvider>
    );
};

export default BuildingComponentForm;
