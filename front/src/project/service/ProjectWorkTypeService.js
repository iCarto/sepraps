import {AuthApiService} from "base/api/service";

const basePath = "/api/app/projectworktypes";

const project_work_type_api_adapter = projectWorkType => {
    // strange behaviour with "value" property but keeping it for domains compatibility in back
    projectWorkType["label"] = projectWorkType["value"];
    projectWorkType["value"] = projectWorkType["key"];
    delete projectWorkType["key"];

    return projectWorkType;
};

const project_work_types_api_adapter = projectWorkTypes => {
    return projectWorkTypes.map(project_work_type_api_adapter);
};

const ProjectWorkTypeService = {
    getList() {
        return AuthApiService.get(basePath).then(response => {
            return project_work_types_api_adapter(response);
        });
    },
};

export default ProjectWorkTypeService;
