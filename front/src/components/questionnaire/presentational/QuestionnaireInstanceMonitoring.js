import {StatsService} from "service/api";
import {ViewQuestionnaireInstanceFieldData} from "../container";

const QuestionnaireInstanceMonitoring = ({projectQuestionnaire}) => {
    return (
        projectQuestionnaire &&
        projectQuestionnaire.questionnaire.fields.map(field => (
            <ViewQuestionnaireInstanceFieldData
                key={field.code}
                questionnaireCode={projectQuestionnaire.questionnaire.code}
                field={field}
                filter={{project: projectQuestionnaire.projectId}}
            />
        ))
    );
};

export default QuestionnaireInstanceMonitoring;
