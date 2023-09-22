import {AuthApiService} from "../../base/api/service";
import {
    createProject,
    project_api_adapter,
    createProjectsSummaries,
    projects_summaries_api_adapter,
} from "project/model";
import {createContacts, contacts_api_adapter} from "contact/model";
import {createPhases, phases_api_adapter} from "milestone/model";
import {
    createProjectQuestionnaire,
    project_questionnaire_api_adapter,
} from "questionnaire/model";
import {createEntityService} from "base/entity/service";

const basePath = "/api/app/projects";

const entityService = createEntityService(
    basePath,
    createProject,
    createProjectsSummaries,
    project_api_adapter,
    projects_summaries_api_adapter
);

const ProjectService = {
    getList(filter, sort, order, format = null) {
        return entityService.getList(filter, null, sort, order, format);
    },

    getPaginatedList(filter, page, sort, order) {
        return entityService.getList(filter, page, sort, order);
    },

    getFeatures(filter) {
        return entityService.getFeatures(filter);
    },

    getBySearchText(searchText) {
        return entityService.getBySearchText(searchText);
    },

    get(id) {
        return entityService.get(id);
    },

    create(entity) {
        return entityService.create(entity);
    },

    update(entity) {
        return entityService.update(entity);
    },

    updateWithPatch(entity) {
        return entityService.updateWithPatch(entity);
    },

    getProjectContacts(id) {
        return AuthApiService.get(basePath + "/" + id + "/contacts").then(response => {
            return createContacts(contacts_api_adapter(response));
        });
    },

    getProjectMilestones(id) {
        return AuthApiService.get(basePath + "/" + id + "/milestones").then(
            milestones => {
                let phases = [];
                milestones.forEach(milestone => {
                    let phase = phases.find(phase => phase.code === milestone["phase"]);
                    if (!phase) {
                        phase = {
                            code: milestone["phase"],
                            name: milestone["phase_name"],
                            milestones: [],
                        };
                        phases.push(phase);
                    }
                    phase["milestones"].push(milestone);
                });
                return createPhases(phases_api_adapter(phases));
            }
        );
    },

    updateProjectWithPatch(project) {
        return AuthApiService.patch(basePath + "/" + project.id, project).then(
            response => {
                return createProject(project_api_adapter(response));
            }
        );
    },

    closeProject(projectId) {
        return AuthApiService.put(basePath + "/" + projectId + "/close");
    },

    getProjectsQuestionnaireInstances(id, questionnaireCode) {
        return AuthApiService.get(
            `${basePath}/${id}/questionnaire_instances/${questionnaireCode}`
        ).then(response => {
            return createProjectQuestionnaire(
                project_questionnaire_api_adapter(response)
            );
        });
    },

    updateProjectQuestionnaireInstances(projectQuestionnaire) {
        return AuthApiService.put(
            `${basePath}/${projectQuestionnaire.project}/questionnaire_instances/${projectQuestionnaire.questionnaire.code}`,
            projectQuestionnaire
        ).then(response => {
            return createProjectQuestionnaire(
                project_questionnaire_api_adapter(response)
            );
        });
    },
};

export default ProjectService;
