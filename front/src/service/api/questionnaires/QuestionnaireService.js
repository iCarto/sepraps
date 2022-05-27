import {
    createQuestionnaires,
    createQuestionnaire,
    questionnaires_api_adapter,
    questionnaire_api_adapter,
} from "model";
import AuthApiService from "../AuthApiService";

const basePath = "/api/questionnaires/questionnaires";

const QuestionnaireService = {
    getQuestionnaires() {
        return AuthApiService.get(basePath).then(response => {
            return createQuestionnaires(questionnaires_api_adapter(response));
        });
    },

    getQuestionnaire(questionnaireCode) {
        return AuthApiService.get(`${basePath}/${questionnaireCode}`).then(response => {
            return createQuestionnaire(questionnaire_api_adapter(response));
        });
    },
};

export default QuestionnaireService;
