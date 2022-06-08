import {StatsService} from "service/api";
import {ViewQuestionnaireInstanceFieldData} from "../container";

const QuestionnaireInstanceMonitoring = ({projectQuestionnaire}) => {
    return (
        projectQuestionnaire &&
        projectQuestionnaire.questionnaire.fields.map(field => (
            <ViewQuestionnaireInstanceFieldData
                key={field.code}
                questionnaireCode={projectQuestionnaire.questionnaire.code}
                fieldCode={field.code}
                filter={{project: projectQuestionnaire.projectId}}
                fieldLabel={field.label}
            />
        ))
    );
};

export default QuestionnaireInstanceMonitoring;
