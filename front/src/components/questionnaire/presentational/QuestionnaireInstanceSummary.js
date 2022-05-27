import Grid from "@mui/material/Grid";
import {ProjectService} from "service/api";
import {ViewQuestionnaireInstanceFieldData} from "../container";

const QuestionnaireInstanceSummary = ({projectQuestionnaire}) => {
    const getDataService = (id, questionnaireCode, fieldCode) => {
        return ProjectService.getProjectsQuestionnaireInstancesFieldData(
            id,
            questionnaireCode,
            fieldCode
        );
    };

    return (
        projectQuestionnaire &&
        projectQuestionnaire.questionnaire.fields.map(field => (
            <ViewQuestionnaireInstanceFieldData
                key={field.code}
                getDataService={() => {
                    return getDataService(
                        projectQuestionnaire.projectId,
                        projectQuestionnaire.questionnaire.code,
                        field.code
                    );
                }}
                fieldLabel={field.label}
            />
        ))
    );
};

export default QuestionnaireInstanceSummary;
