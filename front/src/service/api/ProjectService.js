import {
    createProjects,
    createProject,
    projects_api_adapter,
    project_api_adapter,
    createContacts,
    contacts_api_adapter,
    createPhases,
    phases_api_adapter,
} from "model";
import AuthApiService from "./AuthApiService";

export const PROJECT_TEMPLATE = {
    SHORT: "short",
};

const basePath = "/api/monitoring/projects";

const ProjectService = {
    getProjects(showClosed = false, template = null) {
        const path =
            basePath +
            (showClosed ? "?status=all" : "?status=active") +
            (template ? `&template=${template}` : "");
        console.log({showClosed}, {path});
        return AuthApiService.get(path).then(response => {
            return createProjects(projects_api_adapter(response));
        });
    },

    getProjectsBySearchText(searchText) {
        return AuthApiService.get(basePath + `?search=${searchText}`).then(response => {
            return createProjects(projects_api_adapter(response));
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

    getProjectsForStats(id) {
        return AuthApiService.get(basePath + "/projects_with_current_milestone").then(
            response => {
                return response;
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
};

export default ProjectService;
