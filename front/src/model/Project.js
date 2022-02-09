import {createInfrastructure, createLocality, createProvider} from "model";
import {infrastructure_api_adapter} from "./Infrastructure";
import {
    createLocalities,
    localities_api_adapter,
    locality_api_adapter,
} from "./Locality";
import {provider_api_adapter} from "./Provider";

class Projects extends Array {}

const project_api_adapter = project => {
    project["init_date"] = new Date(project["init_date"]);
    project["created_at"] = new Date(project["created_at"]);
    project["updated_at"] = new Date(project["updated_at"]);
    if (project["linked_localities"]) {
        project["linked_localities"] = createLocalities(
            localities_api_adapter(project["linked_localities"])
        );
    }
    project["provider"] = createProvider(
        project["provider"] ? provider_api_adapter(project["provider"]) : {}
    );
    if (project["main_infrastructure"]) {
        project["main_infrastructure"] = createInfrastructure(
            infrastructure_api_adapter(project["main_infrastructure"])
        );
    }
    if (project["locality"]) {
        project["locality"] = createLocality(locality_api_adapter(project["locality"]));
    }
    return project;
};

const projects_api_adapter = projects => projects.map(project_api_adapter);

const createProjects = (data = []) => {
    const projects = Projects.from(data, project => createProject(project));
    return projects;
};

// ----------- TO-DO: REVIEW & REPLACE project_type_name (& class, financing fund & financing program) BY project_type IN ALL COMPONENTS
const createProject = ({
    id = -1,
    name = "",
    code = "",
    featured_image = "",
    phase_name = "",
    project_type = "",
    project_class = "",
    project_type_name = "",
    project_class_name = "",
    init_date = null,
    locality = createLocality(),
    main_infrastructure = createInfrastructure(),
    linked_localities = [],
    provider = createProvider(),
    financing_fund = null,
    financing_program = null,
    financing_fund_name = "",
    financing_program_name = "",
    contacts = [],
    creation_user = "",
    created_at = null,
    updated_at = null,
} = {}) => {
    const publicApi = {
        id,
        name,
        code,
        featured_image,
        phase_name,
        project_type,
        project_class,
        project_type_name,
        project_class_name,
        init_date,
        locality,
        main_infrastructure,
        linked_localities,
        provider,
        financing_fund,
        financing_program,
        financing_fund_name,
        financing_program_name,
        contacts,
        creation_user,
        created_at,
        updated_at,
    };

    return Object.freeze(publicApi);
};

export {
    createProject as default,
    createProjects,
    project_api_adapter,
    projects_api_adapter,
};
