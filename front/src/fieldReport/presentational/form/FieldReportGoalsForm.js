import {FormProvider, useForm} from "react-hook-form";

import {createFieldReport} from "fieldReport/model";
import {FormUtil} from "base/form/utilities";

import {EntityForm} from "base/entity/components/form";
import {FieldReportGoalsFormFields} from ".";

const FieldReportGoalsForm = ({fieldReport = null, goalId = null, onSubmit}) => {
    const goal = fieldReport?.visit_goals ? fieldReport.visit_goals[goalId] : null;

    const defaultFormValues = {
        visit_goal: {
            text: FormUtil.getFormValue(goal?.text),
        },
    };

    const formMethods = useForm({
        defaultValues: defaultFormValues,
        reValidateMode: "onSubmit",
    });

    const onFormSubmit = data => {
        const updatedFieldReport = createFieldReport({
            ...fieldReport,
            // visit_goals: fieldReport
            //     ? [
            //           ...fieldReport.linked_localities,
            //           createGoal({
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
                <FieldReportGoalsFormFields />
            </EntityForm>
        </FormProvider>
    );
};

export default FieldReportGoalsForm;
