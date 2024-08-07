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
import createBuildingComponentMonitoring, {
    building_component_monitoring_api_adapter,
    createBuildingComponentMonitorings,
} from "buildingComponentMonitoring/model/BuildingComponentMonitoring";
import {
    createSocialComponentMonitorings,
    createSocialComponentMonitoring,
    social_component_monitoring_api_adapter,
} from "socialComponentMonitoring/model";
import {connection_api_adapter, createConnections} from "connection/model";
import {ServiceUtil} from "base/api/utilities";
import {
    certification_api_adapter,
    createCertification,
    createCertifications,
} from "certification/model";

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
        return entityService.getList(filter, null, sort, order, null, format);
    },

    // TODO: Review for projects
    getListSummary(filter) {
        return AuthApiService.get(
            `${basePath}?template=short&${ServiceUtil.getFilterQueryString(filter)}`
        ).then(response => {
            return createProjectsSummaries(projects_summaries_api_adapter(response));
        });
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

    getProjectBuildingComponentTypes(projectId) {
        return AuthApiService.get(
            `${basePath}/${projectId}/buildingcomponenttypes`
        ).then(response => {
            return response;
        });
    },

    getProjectBuildingComponentMonitorings(projectId) {
        return AuthApiService.get(
            `${basePath}/${projectId}/buildingcomponentmonitorings`
        ).then(response => {
            return createBuildingComponentMonitorings(
                building_component_monitoring_api_adapter(response)
            );
        });
    },

    /**
     * Creates a monitoring for a project's building component.
     * If the buildingComponentMonitoring parameter includes a "building_component" attribute, then the monitoring will be created for an existing component.
     * Otherwise, a new component will be created first, and then a new monitoring for that component will be created.
     * The attributes for the newly-created bcMonitoring will always be empty, except for the project.
     *
     * @param {string} projectId - The ID of the project.
     * @param {object} buildingComponentMonitoring - The building component object.
     */
    createProjectBuildingComponentMonitoring(projectId, buildingComponentMonitoring) {
        return AuthApiService.post(
            `${basePath}/${projectId}/buildingcomponentmonitorings`,
            buildingComponentMonitoring
        ).then(response => {
            return createBuildingComponentMonitoring(
                building_component_monitoring_api_adapter(response)
            );
        });
    },

    orderProjectBuildingComponentMonitoring(projectId, componentsOrder) {
        return AuthApiService.post(
            `${basePath}/${projectId}/buildingcomponentmonitorings/order`,
            componentsOrder
        );
    },

    getProjectSocialComponentTypes(projectId) {
        return AuthApiService.get(`${basePath}/${projectId}/socialcomponenttypes`).then(
            response => {
                return response;
            }
        );
    },

    getProjectSocialComponents(projectId) {
        return AuthApiService.get(
            `${basePath}/${projectId}/socialcomponentmonitorings`
        ).then(response => {
            return createSocialComponentMonitorings(
                social_component_monitoring_api_adapter(response)
            );
        });
    },

    createProjectSocialComponent(projectId, socialComponent) {
        return AuthApiService.post(
            `${basePath}/${projectId}/socialcomponentmonitorings`,
            socialComponent
        ).then(response => {
            return createSocialComponentMonitoring(
                social_component_monitoring_api_adapter(response)
            );
        });
    },

    getProjectConnections(projectId) {
        return AuthApiService.get(`${basePath}/${projectId}/connections`).then(
            response => {
                return createConnections(connection_api_adapter(response));
            }
        );
    },

    getProjectCertifications(projectId) {
        return AuthApiService.get(`${basePath}/${projectId}/certifications`).then(
            response => {
                return createCertifications(certification_api_adapter(response));
            }
        );
    },

    createProjectCertification(projectId, certification) {
        return AuthApiService.post(
            `${basePath}/${projectId}/certification`,
            certification
        ).then(response => {
            return createCertification(certification_api_adapter(response));
        });
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
