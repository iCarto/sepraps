import {useOutletContext} from "react-router-dom";
import {useEffect, useState} from "react";
import {downloadFieldReportPDF} from "fieldReport/utilities";

import {
    ProjectFinancingSection,
    ProjectGeneralDataSection,
    ProjectLocationSection,
} from "project/presentational/section";

import {EntityAuditSection} from "base/entity/components/presentational/sections";
import {EntityViewSubPage} from "base/entity/components/container";

const ViewProjectSummarySubPage = () => {
    let project;
    [project] = useOutletContext();

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
        <ProjectGeneralDataSection
            project={project}
            handleGeneratePDF={handleGeneratePDF}
        />,
        <ProjectLocationSection project={project} />,
        <ProjectFinancingSection project={project} />,
        <EntityAuditSection entity={project} />,
    ];

    return project && <EntityViewSubPage sections={sections} />;
};

export default ViewProjectSummarySubPage;
