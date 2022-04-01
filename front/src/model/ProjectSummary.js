import {DateUtil, DATE_FORMATS} from "utilities";
import {infraestructure_view_adapter} from "./Infrastructure";
import {createMilestones, milestones_api_adapter} from "./Milestone";
import {provider_view_adapter} from "./Provider";

class Projects extends Array {}

const project_summary_api_adapter = project => {
    // Fake image loaded from public folder in front-end
    project["featured_image"] = "/images/senasa" + (project["id"] % 5) + ".png";

    project["init_date"] = new Date(project["init_date"]);
    project["created_at"] = new Date(project["created_at"]);

    if (project["milestones"]) {
        project["milestones"] = createMilestones(
            milestones_api_adapter(project["milestones"])
        );
    }

    project["updated_at"] = new Date(project["updated_at"]);

    return project;
};

const projects_summaries_api_adapter = projectsSummaries =>
    projectsSummaries.map(project_summary_api_adapter);

const createProjectsSummaries = (data = []) => {
    const projectsSummaries = Projects.from(data, projectSummary =>
        createProjectSummary(projectSummary)
    );
    return projectsSummaries;
};

const createProjectSummary = ({
    id = -1,
    featured_image = null,
    locality = null,
    locality_name = null,
    district = null,
    district_name = null,
    department = null,
    department_name = null,
    name = null,
    code = null,
    project_type = null,
    project_type_name = null,
    project_class = null,
    project_class_name = null,
    init_date = null,
    provider = null,
    provider_name = null,
    construction_contract = null,
    construction_contract_number = null,
    construction_contract_bid_request_number = null,
    financing_fund = null,
    financing_fund_name = null,
    financing_program = null,
    financing_program_name = null,
    milestones = null,
    latitude = null,
    longitude = null,
    created_at = null,
    updated_at = null,
} = {}) => {
    const publicApi = {
        id,
        featured_image,
        locality,
        locality_name,
        district,
        district_name,
        department,
        department_name,
        name,
        code,
        project_type,
        project_type_name,
        project_class,
        project_class_name,
        init_date,
        provider,
        provider_name,
        construction_contract,
        construction_contract_number,
        construction_contract_bid_request_number,
        financing_fund,
        financing_fund_name,
        financing_program,
        financing_program_name,
        milestones,
        latitude,
        longitude,
        created_at,
        updated_at,
    };

    return Object.freeze(publicApi);
};

export {
    createProjectSummary as default,
    createProjectsSummaries,
    project_summary_api_adapter,
    projects_summaries_api_adapter,
};
