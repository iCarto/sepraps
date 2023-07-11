import {FormProvider, useForm} from "react-hook-form";

import {FormUtil} from "base/form/utilities";
import {DomainProvider} from "sepraps/domain/provider";
import {EntityForm} from "base/entity/components/form";
import {FieldReportFormFields} from ".";

const FieldReportForm = ({
    fieldReport = null,
    section = "",
    onSubmit,
    onCancel = null,
}) => {
    const defaultFormValues = {
        id: FormUtil.getFormValue(fieldReport?.id),
        name: FormUtil.getFormValue(fieldReport?.name),
        code: FormUtil.getFormValue(fieldReport?.code),
        reporting_person: FormUtil.getFormValue(fieldReport?.reporting_person),
        reported_persons: FormUtil.getFormValue(fieldReport?.reported_persons, []),
        participant_persons: FormUtil.getFormValue(
            fieldReport?.participant_persons,
            []
        ),
        visit_date_start: FormUtil.getFormValue(fieldReport?.visit_date_start),
        visit_date_end: FormUtil.getFormValue(fieldReport?.visit_date_end),
        report_comments_start: FormUtil.getFormValue(
            fieldReport?.report_comments_start
        ),
        report_comments_end: FormUtil.getFormValue(fieldReport?.report_comments_end),
        goals: FormUtil.getFormValue(fieldReport?.goals, []),
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
            reporting_person: FormUtil.getDataValue(data.reporting_person),
            reported_persons: FormUtil.getDataValue(data.reported_persons),
            participant_persons: FormUtil.getDataValue(data.participant_persons),
            visit_date_start: FormUtil.getDataValue(data.visit_date_start),
            visit_date_end: FormUtil.getDataValue(data.visit_date_end),
            report_comments_start: FormUtil.getDataValue(data.report_comments_start),
            report_comments_end: FormUtil.getDataValue(data.report_comments_end),
            goals: FormUtil.getDataValue(data.goals),
        });
    };

    return (
        <DomainProvider>
            <FormProvider {...formMethods}>
                <EntityForm
                    onSubmit={formMethods.handleSubmit(onFormSubmit)}
                    onCancel={onCancel}
                >
                    <FieldReportFormFields section={section} />
                </EntityForm>
            </FormProvider>
        </DomainProvider>
    );
};

export default FieldReportForm;
