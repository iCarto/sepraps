import {FormProvider, useForm} from "react-hook-form";
import {DateUtil} from "base/format/utilities";
import {useAuth} from "base/user/provider";
import {createMQInstance, createMQInstanceValue} from "questionnaire/model";
import {QuestionnaireInstanceFormFields} from "questionnaire/presentational";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const QuestionnaireInstanceForm = ({
    questionnaireFields,
    questionnaireInstance = null,
    onSubmit = null,
    onCancel = null,
    saving = false,
}) => {
    const {ROLES, hasRole} = useAuth();

    const defaultValues = questionnaireInstance
        ? {
              id: questionnaireInstance.id,
              year_month: new Date(
                  questionnaireInstance.year,
                  questionnaireInstance.month - 1,
                  1
              ),
              comments: questionnaireInstance.comments || "",
          }
        : {
              id: null,
              year_month: DateUtil.getToday(),
              comments: "",
          };

    questionnaireFields.forEach(field => {
        defaultValues[field.code] = questionnaireInstance
            ? questionnaireInstance.values.find(value => value.code === field.code)
                  .value
            : "";
        if (field.include_expected_value) {
            defaultValues[field.code + "_expected"] = questionnaireInstance
                ? questionnaireInstance.values.find(value => value.code === field.code)
                      .expected_value
                : "";
        }
    });

    const formMethods = useForm({
        defaultValues,
        reValidateMode: "onSubmit",
    });

    const handleFormSubmit = data => {
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
                expected_value: field.include_expected_value
                    ? data[field.code + "_expected"]
                    : null,
                value: data[field.code],
            });
        });

        const updatedQuestionnaireInstance = createMQInstance({
            ...questionnaireInstance,
            id: data.id,
            year: new Date(data.year_month).getFullYear(),
            month: new Date(data.year_month).getMonth() + 1,
            comments: data.comments,
            values: dynamicFieldValues,
        });
        console.log({updatedQuestionnaireInstance});
        onSubmit(updatedQuestionnaireInstance);
    };

    const isExpectedDisabled = () => {
        return questionnaireInstance != null && !hasRole(ROLES.SUPERVISION);
    };

    return (
        <FormProvider {...formMethods}>
            <Grid container component="form">
                <QuestionnaireInstanceFormFields
                    questionnaireFields={questionnaireFields}
                    disableExpected={isExpectedDisabled()}
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
                            disabled={saving}
                        >
                            Guardar
                            {saving && (
                                <CircularProgress
                                    color="inherit"
                                    size={20}
                                    sx={{marginLeft: 2}}
                                />
                            )}
                        </Button>
                    )}
                </Grid>
            </Grid>
        </FormProvider>
    );
};

export default QuestionnaireInstanceForm;
