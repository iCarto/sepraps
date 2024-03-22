import {
    FieldReportFormGeneralDataFields,
    FieldReportFormBasicDataFields,
    FieldReportFormParticipantsFields,
    FieldReportFormReportedPersonsFields,
    FieldReportFormCommentsEndFields,
    FieldReportFormCommentsStartFields,
    FieldReportFormGoalsFields,
} from ".";
import {FormSection} from "base/form/components";
import Stack from "@mui/material/Stack";

const FieldReportFormFields = ({section}) => {
    const displayCommentsStart = section === "report_comments_start";
    const displayGoals = section === "goals";
    const displayCommentsEnd = section === "report_comments_end";
    const displayBasicData = section === "basic_data";
    const displayParticipants = section === "participant_persons";
    const displayReportedPersons = section === "reported_persons";

    return (
        <Stack spacing={1}>
            {!section ? (
                <FormSection>
                    <FieldReportFormGeneralDataFields orientation={"row"} />
                </FormSection>
            ) : null}
            {displayBasicData ? <FieldReportFormBasicDataFields /> : null}
            {displayParticipants ? <FieldReportFormParticipantsFields /> : null}
            {displayReportedPersons ? <FieldReportFormReportedPersonsFields /> : null}
            {displayCommentsStart ? <FieldReportFormCommentsStartFields /> : null}
            {displayGoals ? <FieldReportFormGoalsFields /> : null}
            {displayCommentsEnd ? <FieldReportFormCommentsEndFields /> : null}
        </Stack>
    );
};

export default FieldReportFormFields;
