import {
    questionnaire_fields_api_adapter,
    createQuestionnaireFields,
} from "./QuestionnaireField";

class Questionnaire extends Array {}

const questionnaire_api_adapter = questionnaire => {
    if (questionnaire["fields"]) {
        questionnaire["fields"] = createQuestionnaireFields(
            questionnaire_fields_api_adapter(questionnaire["fields"])
        );
    }
    return questionnaire;
};

const questionnaires_api_adapter = questionnaire =>
    questionnaire.map(questionnaire_api_adapter);

const questionnaire_view_adapter = questionnaire => {
    return questionnaire;
};

const createQuestionnaires = (data = []) => {
    const questionnaires = Questionnaire.from(data, questionnaire =>
        createQuestionnaire(questionnaire)
    );
    return questionnaires;
};

const createQuestionnaire = ({
    code = null,
    version = "",
    name = -1,
    category = -1,
    fields = [],
} = {}) => {
    const publicApi = {
        code,
        version,
        name,
        category,
        fields,
    };

    return Object.freeze(publicApi);
};

export {
    createQuestionnaire as default,
    createQuestionnaires,
    questionnaire_api_adapter,
    questionnaires_api_adapter,
    questionnaire_view_adapter,
};
