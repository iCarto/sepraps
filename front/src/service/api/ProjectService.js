import {
    createProjects,
    createProject,
    projects_api_adapter,
    project_api_adapter,
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

    getProject(id) {
        return AuthApiService.get(basePath + "/" + id).then(response => {
            return createProject(project_api_adapter(response));
        });
    },

    createProject(project) {
        return AuthApiService.post(basePath, project).then(response => {
            return createProject(project_api_adapter(response));
        });
    },

    updateProject(project, id) {
        return AuthApiService.put(basePath + "/" + id, project).then(response => {
            return createProject(project_api_adapter(response));
        });
    },
};

export default ProjectService;
