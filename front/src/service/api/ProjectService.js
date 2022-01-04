import {createProjects, projects_api_adapter} from "model";
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
};

export default ProjectService;
