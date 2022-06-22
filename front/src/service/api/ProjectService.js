import {
    createProject,
    project_api_adapter,
    createContacts,
    contacts_api_adapter,
    createPhases,
    phases_api_adapter,
    createProjectsSummaries,
    projects_summaries_api_adapter,
    createProjectQuestionnaire,
    project_questionnaire_api_adapter,
} from "model";
import AuthApiService from "./AuthApiService";

const basePath = "/api/monitoring/projects";

const getQueryStringByFilter = filter => {
    return Object.keys(filter)
        .filter(key => filter[key])
        .map(key => {
            return key + "=" + filter[key];
        })
        .join("&");
};

const ProjectService = {
    getProjects(filter) {
        return AuthApiService.get(`${basePath}?${getQueryStringByFilter(filter)}`).then(
            response => {
                return createProjectsSummaries(
                    projects_summaries_api_adapter(response)
                );
            }
        );
    },

    getProjectsBySearchText(searchText) {
        return AuthApiService.get(basePath + `?search=${searchText}`).then(response => {
            return createProjectsSummaries(projects_summaries_api_adapter(response));
        });
    },

    getProject(id) {
        return AuthApiService.get(basePath + "/" + id).then(response => {
            return createProject(project_api_adapter(response));
        });
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

    createProject(project) {
        return AuthApiService.post(basePath, project).then(response => {
            return createProject(project_api_adapter(response));
        });
    },

    updateProject(project) {
        return AuthApiService.put(basePath + "/" + project.id, project).then(
            response => {
                return createProject(project_api_adapter(response));
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
