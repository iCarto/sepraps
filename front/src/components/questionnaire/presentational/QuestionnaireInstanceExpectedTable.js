import {useEffect, useState} from "react";
import {FormProvider, useFieldArray, useForm} from "react-hook-form";
import {useAuth} from "auth";
import {ProjectService} from "service/api";
import {project_questionnaire_view_adapter} from "model";
import {createMQInstance, createMQInstanceValue} from "model/questionnaires";
import {DateUtil} from "utilities";
import {useNavigateWithReload} from "hooks";

import {FormDatePicker, FormInputInteger, FormInputText} from "components/common/form";
import {AlertError} from "components/common/presentational";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const QuestionnaireInstanceExpectedTable = ({projectQuestionnaire}) => {
    const navigate = useNavigateWithReload();
    const {ROLES, hasRole} = useAuth();

    const [error, setError] = useState("");

    const questionnaireInstances = projectQuestionnaire.questionnaire_instances;

    const questionnaireFieldsWithExpectedValue = projectQuestionnaire.questionnaire.fields.filter(
        field => field.include_expected_value === true
    );

    const hasInstances = questionnaireInstances.length !== 0;

    const defaultMonthFrom = hasInstances
        ? new Date(
              questionnaireInstances[0].year,
              questionnaireInstances[0].month - 1,
              1
          )
        : new Date();

    // TODO: 12 months by default or get the number from other project fields?
    const defaultExpectedMonths = hasInstances ? questionnaireInstances.length : "12";

    const defaultExpectedMonthsValues = hasInstances
        ? questionnaireInstances.map(instance => {
              const defaultValue = {
                  year_month: new Date(instance.year, instance.month - 1, 1),
              };
              questionnaireFieldsWithExpectedValue.forEach(field => {
                  const valueFound = instance.values.find(
                      value => value.code === field.code
                  );
                  defaultValue[field.code] = valueFound.expected_value;
              });
              return defaultValue;
          })
        : [];

    const formMethods = useForm({
        defaultValues: {
            expected_month_from: defaultMonthFrom,
            expected_months: defaultExpectedMonths,
            expected_months_values: defaultExpectedMonthsValues,
        },
    });
    const {fields} = useFieldArray({
        control: formMethods.control,
        name: "expected_months_values",
    });

    useEffect(() => {
        if (!hasInstances) {
            refreshForm();
        }
    }, [projectQuestionnaire]);

    const refreshForm = () => {
        const values = formMethods.getValues();
        const expectedMonthsValues = [];
        let expectedMonth = values["expected_month_from"];
        for (let i = 0; i < parseInt(values["expected_months"]); i++) {
            const defaultValue = {
                year_month: expectedMonth,
            };
            questionnaireFieldsWithExpectedValue.forEach(field => {
                defaultValue[field.code] = "";
            });
            expectedMonthsValues.push(defaultValue);
            expectedMonth = DateUtil.addMonths(expectedMonth, 1);
        }
        formMethods.reset({
            ...values,
            expected_months_values: expectedMonthsValues,
        });
    };

    const onFormSubmit = data => {
        console.log({data});
        const questionnaireInstances = data.expected_months_values.map(
            expectedMonth => {
                // We should iterate over all fields and set a null value for fields with non expected value
                const dynamicFieldValues = projectQuestionnaire.questionnaire.fields.map(
                    field => {
                        return createMQInstanceValue({
                            id: null,
                            code: field.code,
                            datatype: field.datatype,
                            label: field.label,
                            expected_value: expectedMonth[field.code]
                                ? expectedMonth[field.code]
                                : null,
                            value: null,
                        });
                    }
                );
                return createMQInstance({
                    id: null,
                    year: expectedMonth.year_month.getFullYear(),
                    month: expectedMonth.year_month.getMonth() + 1,
                    comments: "",
                    values: dynamicFieldValues,
                });
            }
        );

        ProjectService.updateProjectQuestionnaireInstances(
            project_questionnaire_view_adapter({
                ...projectQuestionnaire,
                questionnaire_instances: questionnaireInstances,
            })
        )
            .then(() => {
                navigate(
                    `/projects/${projectQuestionnaire.projectId}/questionnaires/${projectQuestionnaire.questionnaire.code}`,
                    true
                );
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    const hasEditPermission = [ROLES.EDIT, ROLES.MANAGEMENT].some(role =>
        hasRole(role)
    );
    const isDisabled = hasInstances || !hasEditPermission;

    return (
        <FormProvider {...formMethods}>
            <Grid container spacing={2}>
                <Grid item>
                    <FormDatePicker
                        label="Mes de inicio previsto"
                        name="expected_month_from"
                        views={["month", "year"]}
                        onChangeHandler={refreshForm}
                        disabled={isDisabled}
                    />
                </Grid>
                <Grid item xs={2}>
                    <FormInputInteger
                        label="Meses previstos"
                        name="expected_months"
                        onBlurHandler={refreshForm}
                        disabled={isDisabled}
                    />
                </Grid>
            </Grid>
            <Paper sx={{p: 3, mt: 3}}>
                <Typography variant="h6" sx={{mb: 2}}>
                    Datos de previsión
                </Typography>
                <AlertError error={error} />
                {fields.map((field, index) => (
                    <Grid
                        container
                        key={field.id}
                        spacing={2}
                        wrap="nowrap"
                        justifyContent="center"
                    >
                        <Grid item>
                            <FormDatePicker
                                label="Mes previsto"
                                name={`expected_months_values.${index}.year_month`}
                                views={["month", "year"]}
                                disabled={true}
                            />
                        </Grid>
                        {questionnaireFieldsWithExpectedValue.map(
                            questionnaireField => (
                                <Grid
                                    item
                                    key={`${field.id}-${questionnaireField.code}`}
                                >
                                    <FormInputText
                                        label={questionnaireField.label}
                                        name={`expected_months_values.${index}.${questionnaireField.code}`}
                                        rules={{required: "Valor obligatorio"}}
                                        disabled={isDisabled}
                                    />
                                </Grid>
                            )
                        )}
                    </Grid>
                ))}
                {!isDisabled && (
                    <Grid container justifyContent="center" sx={{mt: 2}}>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ml: 2}}
                            onClick={formMethods.handleSubmit(onFormSubmit)}
                        >
                            Guardar
                        </Button>
                    </Grid>
                )}
            </Paper>
        </FormProvider>
    );
};

export default QuestionnaireInstanceExpectedTable;
