import autoTable from "jspdf-autotable";
import {CUSTOM_COLORS} from "Theme";
import {getFieldReportContent, globalPDFElements} from ".";

export function getFieldReportPDFElements(doc, reportData) {
    const dimensions = globalPDFElements.getPDFDimensions(doc);
    const fieldReportContent = getFieldReportContent(reportData);

    const drawReportDetailsTable = () => {
        autoTable(doc, {
            startY: dimensions.contentPositionTop + 5,
            theme: "plain",
            body: fieldReportContent.headTableBody,
            bodyStyles: {textColor: CUSTOM_COLORS.text.primary},
            columnStyles: {
                0: {cellWidth: 30, fontSize: 9, fontStyle: "bold"},
                1: {halign: "left", fontSize: 9},
            },

            didDrawPage: function(data) {
                globalPDFElements.drawHeader(
                    doc,
                    `${reportData.report_name} - ${reportData.report_code}`
                );
                globalPDFElements.drawFooter(doc);
            },
        });

        doc.setDrawColor(CUSTOM_COLORS.grey["200"]);
        doc.line(
            dimensions.pageMargin,
            doc.lastAutoTable.finalY + 5,
            globalPDFElements.getPageWidth(doc),
            doc.lastAutoTable.finalY + 5
        );
    };

    const drawReportSummary = () => {
        let textPositionTop = doc.lastAutoTable.finalY + 20;
        const projectsTablePositionTop = textPositionTop + 30;

        doc.setFontSize(10);
        doc.setTextColor(CUSTOM_COLORS.text.primary);
        doc.text(fieldReportContent.introText, dimensions.pageMargin, textPositionTop, {
            maxWidth: dimensions.pageWidth - dimensions.pageMargin,
            lineHeightFactor: 2,
        });

        autoTable(doc, {
            startY: projectsTablePositionTop,
            theme: "grid",
            head: [
                fieldReportContent.projectsTableColumns.map(column =>
                    column.toUpperCase()
                ),
            ],
            headStyles: {
                valign: "middle",
                fillColor: CUSTOM_COLORS.primary.main,
                textColor: CUSTOM_COLORS.white,
                fontSize: 9,
            },
            body: fieldReportContent.projectsTableBody,
            bodyStyles: {textColor: CUSTOM_COLORS.text.primary},
            columnStyles: {
                text: {fontSize: 9},
            },
        });
    };

    const drawReportClosure = () => {
        doc.text(
            fieldReportContent.endingText,
            dimensions.pageMargin,
            doc.lastAutoTable.finalY + 20,
            {
                maxWidth: dimensions.pageWidth - dimensions.pageMargin,
                lineHeightFactor: 2,
            }
        );
    };

    const drawVisitSummary = locality => {
        const localityTableBody = [
            [
                `${locality.locality}, distrito de ${locality.district}, departamento de ${locality.department}`,
            ],
            [locality.notes],
        ];

        autoTable(doc, {
            startY: dimensions.contentPositionTop,
            margin: {top: 35},
            theme: "plain",
            body: localityTableBody,
            bodyStyles: {textColor: CUSTOM_COLORS.text.primary},
            pageBreak: "avoid",
            didParseCell: function(data) {
                if (data.row.index === 0) {
                    data.cell.styles.fontSize = 10;
                    data.cell.styles.fontStyle = "bold";
                }
            },
            didDrawPage: function(data) {
                globalPDFElements.drawHeader(
                    doc,
                    `${reportData.report_name} - ${reportData.report_code}`
                );
                globalPDFElements.drawFooter(doc);
            },
        });
    };

    const drawVisitPicturesTable = (locality, index) => {
        const minCellHeight = 60;

        autoTable(doc, {
            theme: "plain",
            body: fieldReportContent.getImageTableContent(locality.images),
            bodyStyles: {cellPadding: 3},
            alternateRowStyles: {
                minCellHeight: minCellHeight,
                halign: "center",
                cellPadding: 2,
                textColor: CUSTOM_COLORS.white,
                fillColor: CUSTOM_COLORS.white,
            },
            pageBreak: "avoid",
            didDrawCell: function(data) {
                const cellData = data.cell;
                const isImage =
                    cellData.raw.endsWith(".png") || cellData.raw.endsWith(".jpg");
                if (isImage) {
                    const imageUrl = cellData.raw;
                    const paddingY = cellData.padding("vertical");
                    const dim = minCellHeight - paddingY;
                    doc.addImage(
                        imageUrl,
                        "png",
                        cellData.x + paddingY,
                        cellData.y + paddingY,
                        dim,
                        dim
                    );
                }
            },
            didDrawPage: function() {
                if (reportData.visited_localities.length - 1 !== index) {
                    doc.addPage();
                }
            },
        });
    };

    return {
        drawReportDetailsTable,
        drawReportSummary,
        drawReportClosure,
        drawVisitSummary,
        drawVisitPicturesTable,
    };
}
