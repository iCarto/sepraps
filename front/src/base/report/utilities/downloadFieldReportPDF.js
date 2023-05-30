import {jsPDF} from "jspdf";
import {getFieldReportPDFElements} from ".";

export function downloadFieldReportPDF() {
    const download = reportData => {
        let doc = new jsPDF({orientation: "portrait"});

        const fieldReportElements = getFieldReportPDFElements(doc, reportData);

        // First page
        fieldReportElements.drawReportDetailsTable();
        fieldReportElements.drawReportSummary();
        fieldReportElements.drawReportClosure();

        doc.addPage();

        // Subsequent pages for visited localities
        reportData.visited_localities.map((locality, index) => {
            fieldReportElements.drawVisitSummary(locality);
            fieldReportElements.drawVisitPicturesTable(locality, index);
        });

        doc.save(`download_report.pdf`);
    };
    return {download};
}
