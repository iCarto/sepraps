import {createQuestionnaire, questionnaire_api_adapter} from "questionnaire/model";
import {createMQInstance, mq_instance_api_adapter} from ".";

class ProjectQuestionnaires extends Array {}

const project_questionnaire_api_adapter = project_questionnaire => {
    project_questionnaire["projectId"] = project_questionnaire["project"];
    if (project_questionnaire.questionnaire) {
        project_questionnaire["questionnaire"] = createQuestionnaire(
            questionnaire_api_adapter(project_questionnaire.questionnaire)
        );
    }
    if (project_questionnaire.questionnaire_instances) {
        project_questionnaire[
            "questionnaire_instances"
        ] = project_questionnaire.questionnaire_instances.map(
            questionnaire_instance => {
                return createMQInstance(
                    mq_instance_api_adapter(questionnaire_instance)
                );
            }
        );
    }
    return project_questionnaire;
};

const project_questionnaires_api_adapter = project_questionnaires =>
    project_questionnaires.map(project_questionnaire_api_adapter);

const project_questionnaire_view_adapter = project_questionnaire => {
    project_questionnaire["project"] = project_questionnaire["projectId"];

    delete project_questionnaire["projectId"];
    return project_questionnaire;
};

const createProjectQuestionnaires = (data = []) => {
    const project_questionnaires = ProjectQuestionnaires.from(
        data,
        project_questionnaire => createProjectQuestionnaire(project_questionnaire)
    );
    return project_questionnaires;
};

const createProjectQuestionnaire = ({
    projectId = -1,
    questionnaire = null,
    questionnaire_instances = [],
} = {}) => {
    const publicApi = {
        projectId,
        questionnaire,
        questionnaire_instances,
    };

    return Object.freeze(publicApi);
};

export {
    createProjectQuestionnaire as default,
    createProjectQuestionnaires,
    project_questionnaire_api_adapter,
    project_questionnaires_api_adapter,
    project_questionnaire_view_adapter,
};
