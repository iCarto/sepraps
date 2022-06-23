import {Fragment} from "react";
import {FormDatePicker, FormInputText} from "components/common/form";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const QuestionnaireInstanceFormFields = ({
    questionnaireFields,
    disableExpected = true,
}) => {
    return (
        <Fragment>
            <FormDatePicker
                name="year_month"
                label="Mes y año"
                views={["month", "year"]}
            />
            <FormInputText name="comments" label="Observaciones" />
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
                                    <FormInputText
                                        name={field.code + "_expected"}
                                        label="Previsto"
                                        disabled={disableExpected}
                                    />
                                </Grid>
                            )}
                            <Grid item xs={6}>
                                <FormInputText name={field.code} label="Real" />
                            </Grid>
                        </Grid>
                    </Grid>
                );
            })}
        </Fragment>
    );
};

export default QuestionnaireInstanceFormFields;
