class Projects extends Array {}

const project_api_adapter = project => {
    project["init_date"] = new Date(project["init_date"]);
    project["created_at"] = new Date(project["created_at"]);
    project["updated_at"] = new Date(project["updated_at"]);
    return project;
};

const projects_api_adapter = projects => projects.map(project_api_adapter);

const createProjects = (data = []) => {
    const projects = Projects.from(data, project => createProject(project));
    return projects;
};

const createProject = ({
    id = -1,
    name = "",
    code = "",
    featured_image = "",
    department_name = "",
    district_name = "",
    locality_name = "",
    phase_name = "",
    project_type_name = "",
    project_class_name = "",
    init_date = null,
    provider_name = "",
    financing_fund_name = "",
    financing_program_name = "",
    created_at = null,
    updated_at = null,
} = {}) => {
    const publicApi = {
        id,
        name,
        code,
        featured_image,
        department_name,
        district_name,
        locality_name,
        phase_name,
        project_type_name,
        project_class_name,
        init_date,
        provider_name,
        financing_fund_name,
        financing_program_name,
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
