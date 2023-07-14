import {
    createFieldReportProjectActivities,
    fieldReportProjectActivities_api_adapter,
} from "fieldReportProjectActivity/model";

class FieldReportProjects extends Array {}

const fieldReportProject_api_adapter = fieldReportProject => {
    fieldReportProject["code"] = fieldReportProject.project.code;
    fieldReportProject["projectId"] = fieldReportProject.project.id;
    fieldReportProject["name"] = fieldReportProject.project["linked_localities"]
        .map(locality => locality.name)
        .join(" - ");
    fieldReportProject["location"] = Array.from(
        new Set(
            fieldReportProject.project["linked_localities"].map(
                locality => `${locality.district_name} (${locality.department_name})`
            )
        )
    ).join(", ");
    if (fieldReportProject["field_report_project_activities"]) {
        fieldReportProject[
            "field_report_project_activities"
        ] = createFieldReportProjectActivities(
            fieldReportProjectActivities_api_adapter(
                fieldReportProject["field_report_project_activities"]
            )
        );
    }

    return fieldReportProject;
};

const fieldReportProject_view_adapter = fieldReportProject => {
    fieldReportProject["agreements"] = fieldReportProject["agreements"].filter(
        item => item
    );

    delete fieldReportProject["code"];
    delete fieldReportProject["name"];
    delete fieldReportProject["location"];

    delete fieldReportProject["folder"];
    delete fieldReportProject["created_by"];
    delete fieldReportProject["created_at"];
    delete fieldReportProject["updated_at"];
    delete fieldReportProject["updated_by"];

    return fieldReportProject;
};

const fieldReportProjects_api_adapter = fieldReportProjects => {
    return fieldReportProjects.map(fieldReportProject_api_adapter);
};

const createFieldReportProjects = (data = []) => {
    const fieldReportProjects = FieldReportProjects.from(data, fieldReportProject =>
        createFieldReportProject(fieldReportProject)
    );
    return fieldReportProjects;
};

const createFieldReportProject = ({
    id = null,
    code = "",
    name = "",
    history = "",
    agreements = [],
    location = "",
    projectId = null,
    project = null,
    construction_contract_number = "",
    field_report_project_activities = [],
    folder = "",
    created_by = "",
    created_at = null,
    updated_at = null,
    updated_by = "",
} = {}) => {
    const publicApi = {
        id,
        code,
        name,
        history,
        agreements,
        location,
        projectId,
        project,
        construction_contract_number,
        field_report_project_activities,
        folder,
        created_by,
        created_at,
        updated_at,
        updated_by,
    };

    return Object.freeze(publicApi);
};

export {
    createFieldReportProject as default,
    createFieldReportProjects,
    fieldReportProject_api_adapter,
    fieldReportProjects_api_adapter,
    fieldReportProject_view_adapter,
};
