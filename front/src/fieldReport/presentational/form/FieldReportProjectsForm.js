import {FormProvider, useForm} from "react-hook-form";

import {createFieldReport} from "fieldReport/model";
import {FormUtil} from "base/form/utilities";

import {EntityForm} from "base/entity/components/form";
import {FieldReportProjectsFormFields} from ".";

const FieldReportProjectsForm = ({fieldReport = null, projectId = null, onSubmit}) => {
    const project = fieldReport?.visited_projects
        ? fieldReport.visited_projects[projectId]
        : null;

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
            <EntityForm onSubmit={formMethods.handleSubmit(onFormSubmit)}>
                <FieldReportProjectsFormFields />
            </EntityForm>
        </FormProvider>
    );
};

export default FieldReportProjectsForm;