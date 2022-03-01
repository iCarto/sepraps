import {
    createInfrastructure,
    createLocality,
    createProvider,
    createContract,
    infrastructure_api_adapter,
    createLocalities,
    localities_api_adapter,
    locality_api_adapter,
    provider_api_adapter,
    contract_api_adapter,
} from "model";
import {DateUtil, DATE_FORMATS} from "utilities";
import {infraestructure_view_adapter} from "./Infrastructure";
import {provider_view_adapter} from "./Provider";

class Projects extends Array {}

const project_api_adapter = project => {
    project["init_date"] = new Date(project["init_date"]);
    if (project.construction_contract) {
        project["construction_contract"] = createContract(
            contract_api_adapter(project.construction_contract)
        );
    }
    project["created_at"] = new Date(project["created_at"]);
    project["updated_at"] = new Date(project["updated_at"]);
    if (project["linked_localities"]) {
        project["linked_localities"] = createLocalities(
            localities_api_adapter(project["linked_localities"])
        );
    }
    project["provider"] = project["provider"]
        ? createProvider(
              provider_api_adapter({...project["provider"], project: project["id"]})
          )
        : null;
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

const project_view_adapter = project => {
    // in front-end falsy values are "" or undefined or null
    project["init_date"] = !!project["init_date"]
        ? DateUtil.formatDate(project["init_date"], DATE_FORMATS.SERVER_DATEFORMAT)
        : null;
    // we must destructure object before its adapation because
    // nested objects are still inmutable inside project object
    if (!!project["provider"]) {
        project["provider"] = provider_view_adapter({...project["provider"]});
        // provider project and contacts fields are not necessary when processing a project
        delete project["provider"]["project"];
        delete project["provider"]["contacts"];
    } else {
        project["provider"] = null;
    }
    project["main_infrastructure"] = !!project["main_infrastructure"]
        ? infraestructure_view_adapter({...project["main_infrastructure"]})
        : null;
    project["linked_localities"] = project["linked_localities"].map(linked_locality => {
        return linked_locality.code;
    });
    project["construction_contract"] = !!project["construction_contract"]
        ? project["construction_contract"].id
        : null;
    delete project["creation_user"];
    delete project["created_at"];
    delete project["updated_at"];

    return project;
};

const createProjects = (data = []) => {
    const projects = Projects.from(data, project => createProject(project));
    return projects;
};

const createProject = ({
    id = -1,
    name = "",
    code = null,
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
    construction_contract = null,
    active_milestone = "",
    folder = "",
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
        construction_contract,
        active_milestone,
        folder,
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
    project_view_adapter,
};
