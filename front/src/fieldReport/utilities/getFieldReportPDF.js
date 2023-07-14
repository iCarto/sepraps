import {globalPDFElements} from "base/pdf/utilities";
import {
    getFieldReportContent,
    getFieldReportPDFElements,
    getFieldReportProjectPDFElements,
    getFieldReportActivityPDFElements,
} from ".";

export function getFieldReportPDF(doc, reportData) {
    const dimensions = globalPDFElements.getPDFDimensions(doc);
    const fieldReportContent = getFieldReportContent(reportData);

    const fieldReportElements = getFieldReportPDFElements(
        doc,
        reportData,
        dimensions,
        fieldReportContent
    );
    const fieldReportProjectElements = getFieldReportProjectPDFElements(
        doc,
        dimensions,
        fieldReportContent
    );
    const fieldReportActivityElements = getFieldReportActivityPDFElements(
        doc,
        dimensions,
        fieldReportContent
    );

    return {
        fieldReportElements,
        fieldReportProjectElements,
        fieldReportActivityElements,
    };
}
