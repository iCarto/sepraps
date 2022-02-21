import {
    createProjects,
    createProject,
    projects_api_adapter,
    project_api_adapter,
    createMilestones,
    milestones_api_adapter,
    createContacts,
    contacts_api_adapter,
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
            console.log({response});
            return createProjects(projects_api_adapter(response));
        });
    },

    getProject(id) {
        return AuthApiService.get(basePath + "/" + id).then(response => {
            console.log({response});
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
            response => {
                return createMilestones(milestones_api_adapter(response));
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
