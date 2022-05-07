import {
    createLocalities,
    localities_api_adapter,
    createMilestones,
    milestones_api_adapter,
} from "./";

class ProjectsSummaries extends Array {}

const project_summary_api_adapter = project => {
    // Fake image loaded from public folder in front-end
    project["featured_image"] = "/images/senasa" + (project["id"] % 5) + ".png";

    project["init_date"] = new Date(project["init_date"]);
    project["created_at"] = new Date(project["created_at"]);

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
    const projectsSummaries = ProjectsSummaries.from(data, projectSummary =>
        createProjectSummary(projectSummary)
    );
    return projectsSummaries;
};

const createProjectSummary = ({
    id = -1,
    featured_image = null,
    code = null,
    name = null,
    location = null,
    project_type = null,
    project_type_name = null,
    project_class = null,
    project_class_name = null,
    description = null,
    init_date = null,
    linked_localities = [],
    provider = null,
    provider_name = null,
    construction_contract = null,
    construction_contract_number = null,
    construction_contract_bid_request_number = null,
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
        code,
        name,
        location,
        project_type,
        project_type_name,
        project_class,
        project_class_name,
        description,
        init_date,
        linked_localities,
        provider,
        provider_name,
        construction_contract,
        construction_contract_number,
        construction_contract_bid_request_number,
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
