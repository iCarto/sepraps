import {useEffect, useState} from "react";
import {downloadFieldReportPDF} from "base/report/utilities";

import {PageLayout} from "base/ui/main";
import {PaperContainer} from "base/shared/components";
import {DownloadPDFButton} from "base/report/components";

const ViewProjectsSupervisionPage = () => {
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

    return (
        <PageLayout subPage={true}>
            <PaperContainer justifyContent="space-between" alignItems="center">
                <DownloadPDFButton handleGeneratePDF={handleGeneratePDF} />
            </PaperContainer>
        </PageLayout>
    );
};
export default ViewProjectsSupervisionPage;
