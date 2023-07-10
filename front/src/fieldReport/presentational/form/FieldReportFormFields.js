import Grid from "@mui/material/Grid";
import {
    FieldReportFormGeneralDataFields,
    FieldReportFormBasicDataFields,
    FieldReportFormParticipantsFields,
    FieldReportFormReportedPersonsFields,
    FieldReportFormCommentsEndFields,
    FieldReportFormCommentsStartFields,
    FieldReportFormGoalsFields,
} from ".";

const FieldReportFormFields = ({section}) => {
    const displayCommentsStart = section === "report_comments_start";
    const displayGoals = section === "goals";
    const displayCommentsEnd = section === "report_comments_end";
    const displayBasicData = section === "basic_data";
    const displayParticipants = section === "participants";
    const displayReportedPersons = section === "reported_persons";

    return (
        <Grid container columnSpacing={1}>
            {!section ? (
                <Grid item xs={12}>
                    <FieldReportFormGeneralDataFields orientation={"row"} />
                </Grid>
            ) : null}
            {displayBasicData ? (
                <Grid item xs={12}>
                    <FieldReportFormBasicDataFields />
                </Grid>
            ) : null}
            {displayParticipants ? (
                <Grid item xs={12}>
                    <FieldReportFormParticipantsFields />
                </Grid>
            ) : null}
            {displayReportedPersons ? (
                <Grid item xs={12}>
                    <FieldReportFormReportedPersonsFields />
                </Grid>
            ) : null}
            {displayCommentsStart ? (
                <Grid item xs={12}>
                    <FieldReportFormCommentsStartFields />
                </Grid>
            ) : null}
            {displayGoals ? (
                <Grid item xs={12}>
                    <FieldReportFormGoalsFields />
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
