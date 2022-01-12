import {
    createProjects,
    createProject,
    projects_api_adapter,
    project_api_adapter,
} from "model";
import AuthApiService from "./AuthApiService";

const basePath = "/api/monitoring/projects";

const ProjectService = {
    getProjects(showClosed = false) {
        const path = basePath + (showClosed ? "?status=all" : "?status=active");
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
    getProjectsName() {
        return AuthApiService.get(basePath).then(response => {
            const projects = response.map(project => ({
                id: project.id,
                name: project.name,
                code: project.code,
            }));
            return projects;
        });
    },
};

export default ProjectService;
