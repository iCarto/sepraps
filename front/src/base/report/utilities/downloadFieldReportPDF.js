import {jsPDF} from "jspdf";
import autoTable from "jspdf-autotable";
import {CUSTOM_COLORS} from "Theme";
import {getFieldReportData, pdfElements} from ".";

export function downloadFieldReportPDF() {
    const download = reportData => {
        let doc = new jsPDF({orientation: "portrait"});

        const dimensions = pdfElements.getPDFDimensions(doc);
        const fieldReportData = getFieldReportData(reportData);

        autoTable(doc, {
            startY: dimensions.contentPositionTop + 5,
            theme: "plain",
            body: fieldReportData.headTableBody,
            bodyStyles: {textColor: CUSTOM_COLORS.text.primary},
            columnStyles: {
                0: {cellWidth: 30, fontSize: 9, fontStyle: "bold"},
                1: {halign: "left", fontSize: 9},
            },

            didDrawPage: function(data) {
                pdfElements.drawHeader(
                    doc,
                    `${reportData.report_name} - ${reportData.report_code}`
                );
                pdfElements.drawFooter(doc);
            },
        });

        doc.setDrawColor(CUSTOM_COLORS.grey["200"]);
        doc.line(
            dimensions.pageMargin,
            doc.lastAutoTable.finalY + 5,
            pdfElements.getPageWidth(doc),
            doc.lastAutoTable.finalY + 5
        );

        let textPositionTop = doc.lastAutoTable.finalY + 20;
        const projectsTablePositionTop = textPositionTop + 30;

        doc.setFontSize(10);
        doc.setTextColor(CUSTOM_COLORS.text.primary);
        doc.text(fieldReportData.introText, dimensions.pageMargin, textPositionTop, {
            maxWidth: dimensions.pageWidth - dimensions.pageMargin,
            lineHeightFactor: 2,
        });

        autoTable(doc, {
            startY: projectsTablePositionTop,
            theme: "grid",
            head: [
                fieldReportData.projectsTableColumns.map(column =>
                    column.toUpperCase()
                ),
            ],
            headStyles: {
                valign: "middle",
                fillColor: CUSTOM_COLORS.primary.main,
                textColor: CUSTOM_COLORS.white,
                fontSize: 9,
            },
            body: fieldReportData.projectsTableBody,
            bodyStyles: {textColor: CUSTOM_COLORS.text.primary},
            columnStyles: {
                text: {fontSize: 9},
            },
        });

        doc.text(
            fieldReportData.endingText,
            dimensions.pageMargin,
            doc.lastAutoTable.finalY + 20,
            {
                maxWidth: dimensions.pageWidth - dimensions.pageMargin,
                lineHeightFactor: 2,
            }
        );

        doc.addPage();

        reportData.visited_localities.map((locality, index) => {
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
                    pdfElements.drawHeader(
                        doc,
                        `${reportData.report_name} - ${reportData.report_code}`
                    );
                    pdfElements.drawFooter(doc);
                },
            });

            const minCellHeight = 60;

            autoTable(doc, {
                theme: "plain",
                body: fieldReportData.getImageTableContent(locality.images),
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
                    const isImage =
                        data.cell.raw.endsWith(".png") ||
                        data.cell.raw.endsWith(".jpg");
                    if (isImage) {
                        const imageUrl = data.cell.raw;
                        const cellData = data.cell;
                        const dim = minCellHeight - data.cell.padding("vertical");
                        doc.addImage(imageUrl, "png", cellData.x, cellData.y, dim, dim);
                    }
                },
                didDrawPage: function() {
                    if (reportData.visited_localities.length - 1 !== index) {
                        doc.addPage();
                    }
                },
            });
        });

        doc.save(`download_report.pdf`);
    };
    return {download};
}
