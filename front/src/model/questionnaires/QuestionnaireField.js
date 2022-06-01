class QuestionnaireFields extends Array {}

const questionnaire_field_api_adapter = questionnaire_field => {
    return questionnaire_field;
};

const questionnaire_fields_api_adapter = questionnaire_fields =>
    questionnaire_fields.map(questionnaire_field_api_adapter);

const questionnaire_field_view_adapter = mq_instance_value => {
    return mq_instance_value;
};

const createQuestionnaireFields = (data = []) => {
    const questionnaire_fields = QuestionnaireFields.from(data, questionnaire_field =>
        createQuestionnaireField(questionnaire_field)
    );
    return questionnaire_fields;
};

const createQuestionnaireField = ({
    code = "",
    label = "",
    datatype = "",
    include_expected_value = false,
} = {}) => {
    const publicApi = {
        code,
        label,
        datatype,
        include_expected_value,
    };

    return Object.freeze(publicApi);
};

export {
    createQuestionnaireField as default,
    createQuestionnaireFields,
    questionnaire_field_api_adapter,
    questionnaire_fields_api_adapter,
    questionnaire_field_view_adapter,
};
