import {FormProvider, useForm} from "react-hook-form";
import {createMQInstance, createMQInstanceValue} from "model/questionnaires";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import QuestionnaireInstanceFormFields from "./QuestionnaireInstanceFormFields";

const QuestionnaireInstanceForm = ({
    questionnaireFields,
    questionnaireInstance = null,
    onSubmit = null,
    onCancel = null,
}) => {
    const defaultValues = questionnaireInstance
        ? {
              id: questionnaireInstance.id,
              year_month: new Date(
                  questionnaireInstance.year,
                  questionnaireInstance.month - 1,
                  1
              ),
              comments: questionnaireInstance.comments,
          }
        : {
              id: null,
              year_month: new Date(),
              comments: "",
          };

    questionnaireFields.forEach(field => {
        defaultValues[field.code] = questionnaireInstance
            ? questionnaireInstance.values.find(value => value.code === field.code)
                  .value
            : "";
    });

    const formMethods = useForm({
        defaultValues,
        reValidateMode: "onSubmit",
    });

    const handleFormSubmit = data => {
        console.log({data});
        const dynamicFieldValues = questionnaireFields.map(field => {
            let updatedQuestionnaireValue = null;
            if (questionnaireInstance) {
                updatedQuestionnaireValue = questionnaireInstance.values.find(
                    value => value.code === field.code
                );
            }
            return createMQInstanceValue({
                id: updatedQuestionnaireValue ? updatedQuestionnaireValue.id : null,
                code: field.code,
                datatype: field.datatype,
                label: field.label,
                expected_value: updatedQuestionnaireValue
                    ? updatedQuestionnaireValue.expected_value
                    : null,
                value: data[field.code],
            });
        });
        const updatedQuestionnaireInstance = createMQInstance({
            ...questionnaireInstance,
            id: data.id,
            year: data.year_month.getFullYear(),
            month: data.year_month.getMonth() + 1,
            comments: data.comments,
            values: dynamicFieldValues,
        });
        console.log({updatedQuestionnaireInstance});
        onSubmit(updatedQuestionnaireInstance);
    };

    return (
        <FormProvider {...formMethods}>
            <Grid container component="form">
                <QuestionnaireInstanceFormFields
                    questionnaireFields={questionnaireFields}
                />
            </Grid>
            <Grid container justifyContent="center" sx={{mt: 2}}>
                <Grid>
                    {onCancel && (
                        <Button color="inherit" onClick={onCancel}>
                            Cancelar
                        </Button>
                    )}
                    {onSubmit && (
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ml: 3}}
                            onClick={formMethods.handleSubmit(handleFormSubmit)}
                        >
                            Guardar
                        </Button>
                    )}
                </Grid>
            </Grid>
        </FormProvider>
    );
};

export default QuestionnaireInstanceForm;
