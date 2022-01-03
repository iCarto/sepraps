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
    phase_name = "",
    project_type_name = "",
    project_class_name = "",
    init_date = null,
    main_infrastructure = {
        id: -1,
        department: -1,
        department_name: "",
        district: -1,
        district_name: "",
        locality: -1,
        locality_name: "",
        latitude: -1,
        longitude: -1,
        altitude: -1,
    },
    linked_localities = [
        {
            department: -1,
            department_name: "",
            district: -1,
            district_name: "",
            locality: -1,
            locality_name: "",
        },
    ],
    provider = {
        id: -1,
        name: "",
        area: "",
        department: -1,
        department_name: "",
        district: -1,
        district_name: "",
        locality: -1,
        locality_name: "",
    },
    financing_fund_name = "",
    financing_program_name = "",
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
        project_type_name,
        project_class_name,
        init_date,
        main_infrastructure,
        linked_localities,
        provider,
        financing_fund_name,
        financing_program_name,
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
