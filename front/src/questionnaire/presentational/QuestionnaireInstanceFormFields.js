import {Fragment} from "react";
import {
    FormDatePicker,
    FormInputInteger,
    FormInputDecimal,
    FormInputText,
    FormTextArea,
} from "base/form/components";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const QuestionnaireInstanceFormFields = ({
    questionnaireFields,
    disableExpected = true,
}) => {
    const getInput = (datatype, name, label, disabled = false) => {
        if (datatype === "decimal2") {
            return <FormInputDecimal name={name} label={label} disabled={disabled} />;
        }
        if (datatype === "integer") {
            return <FormInputInteger name={name} label={label} disabled={disabled} />;
        }
        return <FormInputText name={name} label={label} disabled={disabled} />;
    };

    return (
        <Fragment>
            <FormDatePicker
                name="year_month"
                label="Mes y año"
                views={["month", "year"]}
            />
            <FormTextArea name="comments" label="Observaciones" />
            {questionnaireFields.map(field => {
                return (
                    <Grid key={field.code} sx={{mt: 3}}>
                        <Grid item container alignItems="center" sx={{mb: 1}}>
                            <Typography variant="h6">{field.label}</Typography>
                        </Grid>
                        <Divider />
                        <Grid item container spacing={2}>
                            {field.include_expected_value && (
                                <Grid item xs={6}>
                                    {getInput(
                                        field.datatype,
                                        field.code + "_expected",
                                        "Previsto",
                                        disableExpected
                                    )}
                                </Grid>
                            )}
                            <Grid item xs={6}>
                                {getInput(field.datatype, field.code, "Real")}
                            </Grid>
                        </Grid>
                    </Grid>
                );
            })}
        </Fragment>
    );
};

export default QuestionnaireInstanceFormFields;
