import Grid from "@mui/material/Grid";
import {ViewQuestionnaireInstanceFieldData} from "../container";

const QuestionnaireInstanceSummary = ({projectQuestionnaire}) => {
    return (
        projectQuestionnaire &&
        projectQuestionnaire.questionnaire.fields.map(field => (
            <ViewQuestionnaireInstanceFieldData
                key={field.code}
                projectId={projectQuestionnaire.projectId}
                questionnaireCode={projectQuestionnaire.questionnaire.code}
                fieldCode={field.code}
                fieldLabel={field.label}
            />
        ))
    );
};

export default QuestionnaireInstanceSummary;
