import {DateUtil} from "base/format/utilities";
import {
    createFieldReportProjects,
    fieldReportProjects_api_adapter,
} from "fieldReportProject/model";

class FieldReports extends Array {}

const fieldReport_api_adapter = fieldReport => {
    if (fieldReport["field_report_projects"]) {
        fieldReport["field_report_projects"] = createFieldReportProjects(
            fieldReportProjects_api_adapter(fieldReport["field_report_projects"])
        );
    }
    return fieldReport;
};

const fieldReport_view_adapter = fieldReport => {
    fieldReport["participant_persons"] = fieldReport["participant_persons"].filter(
        item => item
    );
    fieldReport["reported_persons"] = fieldReport["reported_persons"].filter(
        item => item
    );
    fieldReport["goals"] =
        fieldReport["goals"] && fieldReport["goals"].length
            ? fieldReport["goals"].filter(item => item)
            : null;

    fieldReport["date"] = DateUtil.formatDateForAPI(new Date());

    delete fieldReport["folder"];
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
    reporting_person = "",
    reported_persons = [],
    participant_persons = [],
    report_comments_start = "",
    report_comments_end = "",
    goals = [],
    field_report_projects = [],
    folder = "",
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
        reporting_person,
        reported_persons,
        participant_persons,
        report_comments_start,
        report_comments_end,
        goals,
        field_report_projects,
        folder,
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
