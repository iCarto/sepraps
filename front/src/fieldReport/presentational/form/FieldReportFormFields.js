import Grid from "@mui/material/Grid";
import {
    FieldReportFormCommentsEndFields,
    FieldReportFormCommentsStartFields,
    FieldReportFormGeneralDataFields,
    FieldReportFormGoalsFields,
} from ".";

const FieldReportFormFields = ({section}) => {
    const displayCommentsStart = section === "report_comments_start";
    const displayGoals = section === "goals";
    const displayCommentsEnd = section === "report_comments_end";

    return (
        <Grid container columnSpacing={1}>
            {!section ? (
                <Grid item xs={12}>
                    <FieldReportFormGeneralDataFields orientation={"row"} />
                </Grid>
            ) : null}
            {displayCommentsStart ? (
                <Grid item xs={12}>
                    <FieldReportFormCommentsStartFields />
                </Grid>
            ) : null}
            {displayGoals ? (
                <Grid item xs={12}>
                    <FieldReportFormGoalsFields
                        isEditFormSection={section === "goals"}
                    />
                </Grid>
            ) : null}
            {displayCommentsEnd ? (
                <Grid item xs={12}>
                    <FieldReportFormCommentsEndFields />
                </Grid>
            ) : null}
        </Grid>
    );
};

export default FieldReportFormFields;
