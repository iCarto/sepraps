import {useOutletContext} from "react-router-dom";

import {downloadFieldReportPDF} from "fieldReport/utilities";

import {EntityViewSubPage} from "base/entity/components/container";
import {EntityAuditSection} from "base/entity/components/presentational/sections";
import {FieldReportSummarySection} from "fieldReport/presentational/section";
import {FieldReportProjectsListSection} from "fieldReportProject/presentational/section";

const ViewFieldReportSummarySubPage = () => {
    let fieldReport;
    [fieldReport] = useOutletContext();

    const {download: handleDownloadFieldReportPdf} = downloadFieldReportPDF();

    const handleGeneratePDF = () => {
        handleDownloadFieldReportPdf(fieldReport);
    };

    const sections = [
        <FieldReportSummarySection
            fieldReport={fieldReport}
            handleGeneratePDF={handleGeneratePDF}
        />,
        <FieldReportProjectsListSection
            fieldReportProjects={fieldReport?.field_report_projects}
        />,
        <EntityAuditSection entity={fieldReport} />,
    ];

    return fieldReport && <EntityViewSubPage sections={sections} />;
};

export default ViewFieldReportSummarySubPage;
