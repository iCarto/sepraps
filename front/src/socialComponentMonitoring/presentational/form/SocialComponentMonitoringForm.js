import {FormProvider, useForm} from "react-hook-form";

import {DomainProvider} from "sepraps/domain/provider";
import {NumberUtil} from "base/format/utilities";
import {FormUtil} from "base/form/utilities";

import {EntityForm} from "base/entity/components/form";
import {SocialComponentMonitoringDataFields} from ".";
import {AlertError} from "base/error/components";

const SocialComponentMonitoringForm = ({
    bcMonitoring = null,
    onSubmit,
    onCancel = null,
    error = null,
}) => {
    const defaultFormValues = {
        id: FormUtil.getFormValue(bcMonitoring?.id),
        execution_status: FormUtil.getFormValue(bcMonitoring?.execution_status),
        quality_status: FormUtil.getFormValue(bcMonitoring?.quality_status),
        expected_end_date: FormUtil.getFormValue(bcMonitoring?.expected_end_date),
        real_end_date: FormUtil.getFormValue(bcMonitoring?.real_end_date),
        progress_percentage: FormUtil.getFormValue(
            NumberUtil.formatDecimal(bcMonitoring?.progress_percentage, 0)
        ),
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
            progress_percentage: FormUtil.getDataValue(data.progress_percentage),
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
                    <SocialComponentMonitoringDataFields />
                </EntityForm>
            </FormProvider>
        </DomainProvider>
    );
};

export default SocialComponentMonitoringForm;
