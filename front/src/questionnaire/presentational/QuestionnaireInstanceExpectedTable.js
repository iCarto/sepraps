import {useEffect, useState} from "react";
import {FormProvider, useFieldArray, useForm} from "react-hook-form";
import {useAuth} from "base/user/provider";
import {ProjectService} from "project/service";
import {
    createMQInstance,
    createMQInstanceValue,
    project_questionnaire_view_adapter,
} from "questionnaire/model";
import {DateUtil} from "base/format/utilities";
import {useNavigateWithReload} from "base/navigation/hooks";

import {FormDatePicker, FormInputInteger, FormInputText} from "base/form/components";
import {AlertError} from "base/error/components";
import {BorderedTableCell as TableCell} from "base/table/components";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import CircularProgress from "@mui/material/CircularProgress";

const QuestionnaireInstanceExpectedTable = ({
    projectQuestionnaire,
    onCancel = null,
}) => {
    const navigate = useNavigateWithReload();
    const {ROLES, hasRole} = useAuth();

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const questionnaireFieldsWithExpectedValue = projectQuestionnaire.questionnaire.fields.filter(
        field => field.include_expected_value === true
    );

    const defaultMonthFrom = DateUtil.getToday();

    // TODO: 12 months by default or get the number from other project fields?
    const defaultExpectedMonths = "12";

    const defaultExpectedMonthsValues = [];

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
        refreshForm();
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
        setSaving(true);
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
            })
            .finally(() => {
                setSaving(true);
            });
    };

    const getMonth = index => {
        const values = formMethods.getValues();
        return values["expected_months_values"][index]["year_month"];
    };

    return (
        <FormProvider {...formMethods}>
            <Grid container spacing={2}>
                <Grid item>
                    <FormDatePicker
                        label="Mes de inicio previsto"
                        name="expected_month_from"
                        views={["month", "year"]}
                        onChangeHandler={refreshForm}
                    />
                </Grid>
                <Grid item xs={2}>
                    <FormInputInteger
                        label="Meses previstos"
                        name="expected_months"
                        onBlurHandler={refreshForm}
                    />
                </Grid>
            </Grid>
            <Paper sx={{p: 3, mt: 3}}>
                <Typography variant="h6" sx={{mb: 2}}>
                    Datos de previsión
                </Typography>
                <AlertError error={error} />
                <TableContainer sx={{overflowX: "auto"}}>
                    <Table aria-labelledby="Projects table" sx={{tableLayout: "fixed"}}>
                        <TableBody>
                            {fields.map((field, index) => (
                                <TableRow key={field.id}>
                                    <TableCell
                                        sx={{
                                            fontStyle: "italic",
                                            width: "20%",
                                            textAlign: "center",
                                        }}
                                    >
                                        {DateUtil.formatYearAndMonth(getMonth(index))}
                                    </TableCell>
                                    {questionnaireFieldsWithExpectedValue.map(
                                        questionnaireField => (
                                            <TableCell
                                                key={`${field.id}-${questionnaireField.code}`}
                                            >
                                                <FormInputText
                                                    label={questionnaireField.label}
                                                    name={`expected_months_values.${index}.${questionnaireField.code}`}
                                                    rules={{
                                                        required: "Valor obligatorio",
                                                    }}
                                                />
                                            </TableCell>
                                        )
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container justifyContent="center" sx={{mt: 2}}>
                    {onCancel && !saving && (
                        <Button sx={{ml: 2}} onClick={onCancel}>
                            Cancelar
                        </Button>
                    )}
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ml: 2}}
                        onClick={formMethods.handleSubmit(onFormSubmit)}
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
                </Grid>
            </Paper>
        </FormProvider>
    );
};

export default QuestionnaireInstanceExpectedTable;
