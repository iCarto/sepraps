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
    report_name = "",
    report_code = "",
    report_date = null,
    visit_date_start = null,
    visit_date_end = null,
    reporting_person_name = "", // project id
    reporting_person_role = "",
    created_by = "",
    created_at = null,
    updated_at = null,
    updated_by = "",
} = {}) => {
    const publicApi = {
        id,
        report_name,
        report_code,
        report_date,
        visit_date_start,
        visit_date_end,
        reporting_person_name,
        reporting_person_role,
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
