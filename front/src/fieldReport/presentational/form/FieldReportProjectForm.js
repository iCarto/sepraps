import {FormProvider, useForm} from "react-hook-form";

import {FormUtil} from "base/form/utilities";

import {EntityForm} from "base/entity/components/form";
import {FieldReportProjectFormFields} from ".";

const FieldReportProjectForm = ({
    project = null,
    section = "",
    onSubmit,
    onCancel = null,
}) => {
    const defaultFormValues = {
        id: FormUtil.getFormValue(project?.id),
        history: FormUtil.getFormValue(project?.history),
        agreements: FormUtil.getFormValue(project?.agreements, []),
    };

    const formMethods = useForm({
        defaultValues: defaultFormValues,
        reValidateMode: "onSubmit",
    });

    const onFormSubmit = data => {
        const updatedFieldReportProject = {
            id: FormUtil.getDataValue(data.id),
            history: FormUtil.getDataValue(data.history),
            agreements: FormUtil.getDataValue(data.agreements),
        };
        onSubmit(updatedFieldReportProject);
    };

    return (
        <FormProvider {...formMethods}>
            <EntityForm
                onSubmit={formMethods.handleSubmit(onFormSubmit)}
                onCancel={onCancel}
            >
                <FieldReportProjectFormFields section={section} />
            </EntityForm>
        </FormProvider>
    );
};

export default FieldReportProjectForm;
