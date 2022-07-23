import {
    createInfrastructure,
    createProvider,
    createContract,
    infrastructure_api_adapter,
    createLocalities,
    localities_api_adapter,
    provider_api_adapter,
    contract_api_adapter,
} from "model";
import {createQuestionnaires, questionnaires_api_adapter} from "model/questionnaires";
import {DateUtil} from "utilities";
import {infraestructure_view_adapter} from "./Infrastructure";
import {createMilestones, milestones_api_adapter} from "./Milestone";
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
    if (project["questionnaires"]) {
        project["questionnaires"] = createQuestionnaires(
            questionnaires_api_adapter(project["questionnaires"])
        );
    }

    return project;
};

const projects_api_adapter = projects => projects.map(project_api_adapter);

const project_view_adapter = project => {
    // in front-end falsy values are "" or undefined or null
    project["init_date"] = !!project["init_date"]
        ? DateUtil.formatDateForAPI(project["init_date"])
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
    project["construction_contract"] = !!project["construction_contract"]
        ? project["construction_contract"].id || project["construction_contract"]
        : null;

    delete project["name"];
    delete project["location"];
    delete project["milestones"];
    delete project["active_milestone"];
    delete project["folder"];
    delete project["featured_image"];
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
    code = null,
    closed = false,
    name = "",
    location = "",
    featured_image = "",
    project_type = "",
    project_class = "",
    project_type_name = "",
    project_class_name = "",
    description = "",
    init_date = null,
    main_infrastructure = createInfrastructure(),
    linked_localities = [],
    provider = createProvider(),
    construction_contract = null,
    folder = "",
    milestones = [],
    questionnaires = [],
    creation_user = "",
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
        project_type,
        project_class,
        project_type_name,
        project_class_name,
        description,
        init_date,
        main_infrastructure,
        linked_localities,
        provider,
        construction_contract,
        folder,
        milestones,
        questionnaires,
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
