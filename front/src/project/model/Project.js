import {
    createContract,
    contract_api_adapter,
    contracts_api_adapter,
    createContracts,
} from "contract/model";
import {
    createInfrastructure,
    infrastructure_view_adapter,
    infrastructure_api_adapter,
    createLocalities,
    localities_api_adapter,
} from "location/model";
import {createMilestones, milestones_api_adapter} from "milestone/model";
import {
    createProvider,
    provider_api_adapter,
    provider_view_adapter,
} from "provider/model";

class Projects extends Array {}

const project_api_adapter = project => {
    if (project.construction_contract) {
        project["construction_contract"] = createContract(
            contract_api_adapter(project.construction_contract)
        );
    }
    if (project.related_contracts) {
        project["related_contracts"] = createContracts(
            contracts_api_adapter(project.related_contracts)
        );
    }
    if (project["linked_localities"]) {
        project["linked_localities"] = createLocalities(
            localities_api_adapter(project["linked_localities"])
        );
    }

    project["name"] = project["linked_localities"]
        .map(locality => locality.name)
        .join(" - ");
    project["location"] = Array.from(
        new Set(
            project["linked_localities"].map(
                locality => `${locality.district_name} (${locality.department_name})`
            )
        )
    ).join(", ");

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
    if (project["milestones"]) {
        project["milestones"] = createMilestones(
            milestones_api_adapter(project["milestones"])
        );
    }

    project["created_by"] = project["creation_user"] || null;

    return project;
};

const projects_api_adapter = projects => {
    return projects.map(project_api_adapter);
};

const project_view_adapter = project => {
    // in front-end falsy values are "" or undefined or null
    // we must destructure object before its adaptation because
    // nested objects are still inmutable inside project object

    project["provider"] = !!project["provider"] ? project["provider"].id : null;

    project["main_infrastructure"] = !!project["main_infrastructure"]
        ? infrastructure_view_adapter({...project["main_infrastructure"]})
        : null;
    project["construction_contract"] = !!project["construction_contract"]
        ? project["construction_contract"].id || project["construction_contract"]
        : null;

    delete project["related_contracts"];
    delete project["financial_progress_percentage"];
    delete project["physical_progress_percentage"];
    delete project["number_of_bcomponents"];
    delete project["bm_total_expected_amount"];
    delete project["name"];
    delete project["location"];
    delete project["milestones"];
    delete project["active_milestone"];
    delete project["folder"];
    delete project["featured_image"];
    delete project["created_by"];
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
    code = null,
    closed = false,
    name = "",
    location = "",
    featured_image = "",
    project_works = [],
    description = "",
    init_date = null,
    main_infrastructure = createInfrastructure(),
    linked_localities = [],
    provider = createProvider(),
    construction_contract = null,
    construction_contract_number = null,
    construction_contract_bid_request_number = null,
    financing_program_name = null,
    related_contracts = [],
    financial_progress_percentage = null,
    physical_progress_percentage = null,
    number_of_bcomponents = null,
    bm_total_expected_amount = null,
    folder = "",
    milestones = [],
    created_by = "",
    created_at = null,
    updated_at = null,
} = {}) => {
    const publicApi = {
        id,
        code,
        closed,
        name,
        location,
        featured_image,
        project_works,
        description,
        init_date,
        main_infrastructure,
        linked_localities,
        provider,
        construction_contract,
        construction_contract_number,
        construction_contract_bid_request_number,
        financing_program_name,
        related_contracts,
        financial_progress_percentage,
        physical_progress_percentage,
        number_of_bcomponents,
        bm_total_expected_amount,
        folder,
        milestones,
        created_by,
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
