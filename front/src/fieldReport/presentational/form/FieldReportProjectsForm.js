import {FormProvider, useForm} from "react-hook-form";

import {createFieldReport} from "fieldReport/model";
import {FormUtil} from "base/form/utilities";

import {EntityForm} from "base/entity/components/form";
import {FieldReportProjectsFormFields} from ".";

// TO-DO: CHange name: FieldReportProject (singular)
const FieldReportProjectsForm = ({
    project = null,
    fieldReport = null,
    projectId = null,
    section = "",
    onSubmit,
    onCancel = null,
}) => {
    const defaultFormValues = {
        visited_project: {
            text: FormUtil.getFormValue(project?.text),
        },
    };

    const formMethods = useForm({
        defaultValues: defaultFormValues,
        reValidateMode: "onSubmit",
    });

    const onFormSubmit = data => {
        const updatedFieldReport = createFieldReport({
            ...fieldReport,
            // visited_projects: fieldReport
            //     ? [
            //           ...fieldReport.linked_localities,
            //           createProject({
            //               text:
            //               FormUtil.getDataValue(data.text)
            //           }),
            //       ]
            //     : [],
        });
        onSubmit(updatedFieldReport);
    };

    return (
        <FormProvider {...formMethods}>
            <EntityForm
                onSubmit={formMethods.handleSubmit(onFormSubmit)}
                onCancel={onCancel}
            >
                <FieldReportProjectsFormFields section={section} />
            </EntityForm>
        </FormProvider>
    );
};

export default FieldReportProjectsForm;
