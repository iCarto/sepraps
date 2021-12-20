import {createProjects, projects_api_adapter} from "model";
import AuthApiService from "./AuthApiService";

const basePath = "/api/monitoring/projects";

const ProjectService = {
    getProjects() {
        return AuthApiService.get(basePath).then(response => {
            return createProjects(projects_api_adapter(response));
        });
    },
};

export default ProjectService;
