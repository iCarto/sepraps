import autoTable from "jspdf-autotable";
import {CUSTOM_COLORS} from "Theme";

export function getFieldReportActivityPDFElements(doc, dimensions, fieldReportContent) {
    const drawActivitySummary = activity => {
        const doesTableFitInPrevPage =
            doc.lastAutoTable.finalY < dimensions.pageHeight - 60;
        const tablePositionTop = doesTableFitInPrevPage
            ? doc.lastAutoTable.finalY + 5
            : doc.lastAutoTable.finalY + dimensions.pagePaddingTop;

        const tableMarginTop = doesTableFitInPrevPage
            ? 0
            : dimensions.pagePaddingTop - 10;

        autoTable(doc, {
            startY: tablePositionTop,
            margin: {top: tableMarginTop},
            theme: "plain",
            head: [[`${activity.date} | ${activity.title}`]],
            headStyles: {
                fontStyle: "bold",
                fillColor: CUSTOM_COLORS.grey["200"],
            },
            body: activity.notes ? [[activity.notes]] : null,
            bodyStyles: {
                fontStyle: "normal",
            },
            // Attempt to draw only bottom border for table head --fails (draws all borders around head)
            // didParseCell: function(data) {
            //     if (data.row.section === "head") {
            //         data.cell.styles.lineColor = CUSTOM_COLORS.text.primary;
            //         data.cell.styles.lineWidth = {
            //             top: 0,
            //             right: 0,
            //             bottom: 0.1,
            //             left: 0,
            //         };
            //     }
            // },
        });
    };

    const drawActivityPicturesTable = images => {
        const tableBody = fieldReportContent.getImageTableContent(images);

        const minCellHeight = 60;
        const textRowHeight = 11;
        const rowPairHeight = minCellHeight + textRowHeight;
        const tableHeight = (tableBody.length / 2) * rowPairHeight;

        const doesTableFitInPrevPage =
            dimensions.pageHeight > doc.lastAutoTable.finalY + tableHeight;

        const tablePositionTop = doesTableFitInPrevPage
            ? doc.lastAutoTable.finalY + 5
            : doc.lastAutoTable.finalY + dimensions.pagePaddingTop;

        const tableMarginTop = doesTableFitInPrevPage
            ? 0
            : dimensions.pagePaddingTop - 10;

        if (images.length) {
            autoTable(doc, {
                startY: tablePositionTop,
                margin: {top: tableMarginTop},
                theme: "plain",
                body: tableBody,
                bodyStyles: {cellPadding: 3, halign: "center"},
                alternateRowStyles: {
                    minCellHeight: minCellHeight,
                    textColor: CUSTOM_COLORS.white,
                    fillColor: CUSTOM_COLORS.white,
                },
                pageBreak: "avoid",
                didDrawCell: data => {
                    const cellData = data.cell;
                    const isImage = cellData.raw.hasOwnProperty("url");
                    if (isImage) {
                        const imageUrl = cellData.raw.url;
                        const imageOriginalHeight = cellData.raw.height;
                        const imageAdjustedHeight = minCellHeight;
                        const ratio = imageOriginalHeight / imageAdjustedHeight;
                        const imageAdjustedWidth = cellData.raw.width / ratio;
                        const imagePositionX =
                            cellData.x + (cellData.width - imageAdjustedWidth) / 2;
                        const imagePositionY = cellData.y;
                        doc.addImage(
                            imageUrl,
                            "jpg",
                            imagePositionX,
                            imagePositionY,
                            imageAdjustedWidth,
                            imageAdjustedHeight
                        );
                    }
                },
            });
        }
    };

    return {
        drawActivitySummary,
        drawActivityPicturesTable,
    };
}
