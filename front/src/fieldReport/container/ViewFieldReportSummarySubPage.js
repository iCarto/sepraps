import {useOutletContext} from "react-router-dom";
import {useEffect, useState} from "react";
import {downloadFieldReportPDF} from "fieldReport/utilities";

import {EntityViewSubPage} from "base/entity/components/container";
import {EntityAuditSection} from "base/entity/components/presentational/sections";
import {
    FieldReportGeneralDataSection,
    FieldReportProjectsListSection,
} from "fieldReport/presentational/section";

const ViewFieldReportSummarySubPage = () => {
    let fieldReport;
    [fieldReport] = useOutletContext();

    const [data, setData] = useState(null);

    const {download: handleDownloadFieldReportPdf} = downloadFieldReportPDF();

    useEffect(() => {
        fetch("/testing_report_data/fieldReportDummyData.json")
            .then(response => {
                return response.json();
            })
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.log(error.message);
            });
    }, []);

    const handleGeneratePDF = () => {
        handleDownloadFieldReportPdf(data);
    };

    const sections = [
        <FieldReportGeneralDataSection
            fieldReport={fieldReport}
            handleGeneratePDF={handleGeneratePDF}
        />,
        <FieldReportProjectsListSection projects={fieldReport?.visited_projects} />,
        <EntityAuditSection entity={fieldReport} />,
    ];

    return fieldReport && <EntityViewSubPage sections={sections} />;
};

export default ViewFieldReportSummarySubPage;
