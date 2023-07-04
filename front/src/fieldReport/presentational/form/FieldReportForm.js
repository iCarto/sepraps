import {FormProvider, useForm} from "react-hook-form";

import {FieldReportModificationForm, FieldReportCreationForm} from ".";
import {FormUtil} from "base/form/utilities";
import {EntityForm} from "base/entity/components/form";
import {LocationProvider} from "sepraps/location/provider";
import {DomainProvider} from "sepraps/domain/provider";

const FieldReportForm = ({
    fieldReport = null,
    onSubmit,
    onCancel = null,
    updatedSection = null,
}) => {
    const defaultFormValues = {
        id: FormUtil.getFormValue(fieldReport?.id),
        name: FormUtil.getFormValue(fieldReport?.name),
        code: FormUtil.getFormValue(fieldReport?.code),
        reporting_person_name: FormUtil.getFormValue(
            fieldReport?.reporting_person_name
        ),
        reporting_person_role: FormUtil.getFormValue(
            fieldReport?.reporting_person_role
        ),
        reported_person_name: FormUtil.getFormValue(fieldReport?.reported_person_name),
        reported_person_role: FormUtil.getFormValue(fieldReport?.reported_person_role),
        visit_date_start: FormUtil.getFormValue(fieldReport?.visit_date_start),
        visit_date_end: FormUtil.getFormValue(fieldReport?.visit_date_end),
        report_comments_start: FormUtil.getFormValue(
            fieldReport?.report_comments_start
        ),
        report_comments_end: FormUtil.getFormValue(fieldReport?.report_comments_end),
    };

    const formMethods = useForm({
        defaultValues: defaultFormValues,
        reValidateMode: "onSubmit",
    });

    const onFormSubmit = data => {
        onSubmit({
            id: FormUtil.getDataValue(data.id),
            name: FormUtil.getDataValue(data.name),
            code: FormUtil.getDataValue(data.code),
            reporting_person_name: FormUtil.getDataValue(data.reporting_person_name),
            reporting_person_role: FormUtil.getDataValue(data.reporting_person_role),
            reported_person_name: FormUtil.getDataValue(data.reported_person_name),
            reported_person_role: FormUtil.getDataValue(data.reported_person_role),
            visit_date_start: FormUtil.getDataValue(data.visit_date_start),
            visit_date_end: FormUtil.getDataValue(data.visit_date_end),
            report_comments_start: FormUtil.getDataValue(data.report_comments_start),
            report_comments_end: FormUtil.getDataValue(data.report_comments_end),
        });
    };

    const onFormCancel = () => {
        onCancel();
    };

    return (
        <LocationProvider>
            <DomainProvider>
                <FormProvider {...formMethods}>
                    {updatedSection ? (
                        <EntityForm onSubmit={formMethods.handleSubmit(onFormSubmit)}>
                            <FieldReportModificationForm section={updatedSection} />
                        </EntityForm>
                    ) : (
                        <FieldReportCreationForm
                            onSubmit={formMethods.handleSubmit(onFormSubmit)}
                            onCancel={onCancel ? onFormCancel : null}
                        />
                    )}
                </FormProvider>
            </DomainProvider>
        </LocationProvider>
    );
};

export default FieldReportForm;
