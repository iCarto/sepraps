import {FormProvider, useForm} from "react-hook-form";

import {DomainProvider} from "sepraps/domain/provider";
import {NumberUtil} from "base/format/utilities";
import {FormUtil} from "base/form/utilities";

import {EntityForm} from "base/entity/components/form";
import {BuildingComponentMonitoringDataFields} from ".";
import {AlertError} from "base/error/components";

const BuildingComponentMonitoringForm = ({
    bcMonitoring = null,
    onSubmit,
    onCancel = null,
    error = null,
}) => {
    const defaultFormValues = {
        id: FormUtil.getFormValue(bcMonitoring?.id),
        execution_status: FormUtil.getFormValue(bcMonitoring?.execution_status),
        quality_status: FormUtil.getFormValue(bcMonitoring?.quality_status),
        expected_amount: FormUtil.getFormValue(
            NumberUtil.formatDecimal(bcMonitoring?.expected_amount, 0)
        ),
        expected_end_date: FormUtil.getFormValue(bcMonitoring?.expected_end_date),
        paid_amount: FormUtil.getFormValue(
            NumberUtil.formatDecimal(bcMonitoring?.paid_amount, 0)
        ),
        pending_amount: FormUtil.getFormValue(
            NumberUtil.formatDecimal(bcMonitoring?.pending_amount, 0)
        ),
        financial_progress_percentage: FormUtil.getFormValue(
            NumberUtil.formatDecimal(bcMonitoring?.financial_progress_percentage, 0)
        ),
        physical_progress_percentage: bcMonitoring?.physical_progress_percentage
            ? NumberUtil.formatDecimal(bcMonitoring?.physical_progress_percentage, 0)
            : "",
        real_end_date: FormUtil.getFormValue(bcMonitoring?.real_end_date),
    };

    const formMethods = useForm({
        defaultValues: defaultFormValues,
        reValidateMode: "onSubmit",
    });

    const onFormSubmit = data => {
        onSubmit({
            id: FormUtil.getDataValue(data.id),
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
                    <BuildingComponentMonitoringDataFields />
                </EntityForm>
            </FormProvider>
        </DomainProvider>
    );
};

export default BuildingComponentMonitoringForm;
