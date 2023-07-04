class FieldReports extends Array {}

const fieldReport_api_adapter = fieldReport => {
    return fieldReport;
};

const fieldReport_view_adapter = fieldReport => {
    delete fieldReport["created_by"];
    delete fieldReport["created_at"];
    delete fieldReport["updated_at"];
    delete fieldReport["updated_by"];

    return fieldReport;
};

const fieldReports_api_adapter = fieldReports => {
    return fieldReports.map(fieldReport_api_adapter);
};

const createFieldReports = (data = []) => {
    const fieldReports = FieldReports.from(data, fieldReport =>
        createFieldReport(fieldReport)
    );
    return fieldReports;
};

const createFieldReport = ({
    id = null,
    name = "",
    code = "",
    date = null,
    visit_date_start = null,
    visit_date_end = null,
    reporting_person_name = "",
    reporting_person_role = "",
    report_comments_start = "",
    report_comments_end = "",
    goals = [],
    created_by = "",
    created_at = null,
    updated_at = null,
    updated_by = "",
} = {}) => {
    const publicApi = {
        id,
        name,
        code,
        date,
        visit_date_start,
        visit_date_end,
        reporting_person_name,
        reporting_person_role,
        report_comments_start,
        report_comments_end,
        goals,
        created_by,
        created_at,
        updated_at,
        updated_by,
    };

    return Object.freeze(publicApi);
};

export {
    createFieldReport as default,
    createFieldReports,
    fieldReport_api_adapter,
    fieldReports_api_adapter,
    fieldReport_view_adapter,
};
