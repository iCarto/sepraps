import Grid from "@mui/material/Grid";
import {ProjectService} from "service/api";
import {ViewQuestionnaireInstanceFieldData} from "../container";

const QuestionnaireInstanceSummary = ({projectQuestionnaire}) => {
    return (
        projectQuestionnaire &&
        projectQuestionnaire.questionnaire.fields.map(field => (
            <ViewQuestionnaireInstanceFieldData
                key={field.code}
                service={ProjectService.getProjectsQuestionnaireInstancesFieldData}
                id={projectQuestionnaire.projectId}
                questionnaireCode={projectQuestionnaire.questionnaire.code}
                fieldCode={field.code}
                fieldLabel={field.label}
            />
        ))
    );
};

export default QuestionnaireInstanceSummary;
