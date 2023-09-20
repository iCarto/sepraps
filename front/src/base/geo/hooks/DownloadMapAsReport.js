import {globalPDFElements} from "base/pdf/utilities";
import {jsPDF} from "jspdf";
import autoTable from "jspdf-autotable";

import {CUSTOM_COLORS} from "Theme";

export function useDownloadMapWithTablesAsPDF() {
    const download = async (
        tableEntities = [],
        mapImgData = null,
        mapDimensions = null,
        entityData = {},
        callback = null
    ) => {
        let doc = new jsPDF({orientation: "landscape"});

        // Sample summary table with dummy content
        const defaultDataForSummary = [
            {
                head: "Datos xerais",
                content: [
                    ["Nome:", entityData["name"]],
                    ["Código:", entityData["code"]],
                ],
            },
        ];

        const summarySections = entityData.hasOwnProperty("sections")
            ? entityData["sections"]
            : defaultDataForSummary;

        const pageWidth = globalPDFElements.getPageWidth(doc);
        const pageHeight = globalPDFElements.getPageHeight(doc);

        const widthRatio = pageWidth / mapDimensions.x;
        const heightRatio = pageHeight / mapDimensions.y;
        const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;

        const canvasWidth = mapDimensions.x * ratio - 30;
        const canvasHeight = mapDimensions.y * ratio - 40;
        let canvasMarginRight;

        let mapMarginX;
        let mapMarginY;
        let summaryPositionTop;
        let summaryMarginTop;
        let summaryMarginRight;

        // If map width takes less than half page, we make a 2-column layout: summary to the left, map to the right; else, we lay out the map on top and the summary below.
        if (canvasWidth > pageWidth / 2) {
            mapMarginX = globalPDFElements.pageMargin;
            mapMarginY = globalPDFElements.pagePaddingTop - 10;
            summaryPositionTop = canvasHeight + globalPDFElements.pagePaddingTop;
            summaryMarginRight = globalPDFElements.pageMargin;
            canvasMarginRight = canvasWidth + globalPDFElements.pageMargin;
            // If map height takes more than half page, then the summary is moved to next page and we need to push down the summary so that it does not overlap the header.
            if (canvasHeight > pageHeight / 2) {
                summaryMarginTop = 45;
            }
        } else {
            mapMarginX = pageWidth - canvasWidth;
            mapMarginY = (pageHeight - canvasHeight) / 2 + 20;
            summaryPositionTop = mapMarginY;
            summaryMarginTop = 14;
            summaryMarginRight = canvasWidth;
            canvasMarginRight = canvasWidth;
        }

        globalPDFElements.getHeader(doc, entityData);

        // Draw map image
        doc.addImage(
            mapImgData,
            "PNG",
            mapMarginX,
            mapMarginY,
            canvasMarginRight,
            canvasHeight
        );
        // Draw summary table
        summarySections.map((section, index) => {
            if (doc.lastAutoTable.finalY > pageHeight - 30) {
                summaryPositionTop = globalPDFElements.pagePaddingTop + 5;
                summaryMarginTop = 45;
            }
            globalPDFElements.getSummaryTable(
                doc,
                entityData,
                section.head,
                section.content,
                summaryMarginRight,
                summaryPositionTop,
                summaryMarginTop
            );
        });

        doc.addPage();

        tableEntities
            .filter(tableEntity => {
                return tableEntity.data?.length > 0;
            })
            .forEach((tableEntity, index) => {
                const tableTitle = `${tableEntity.title} (${tableEntity.data?.length})`;
                const tableHead = tableEntity.columns.map(
                    tableColumn => tableColumn.label
                );
                const tableBody = tableEntity.data?.map(item => {
                    const row = [];
                    tableEntity.columns.forEach(column => {
                        row.push(
                            column.formatFunction
                                ? column.formatFunction(item)
                                : item[column.id]
                        );
                    });
                    return row;
                });

                const tableColumnStyles = {};
                tableEntity.columns.forEach((tableColumn, index) => {
                    tableColumnStyles[index] = {
                        cellWidth:
                            (pageWidth - globalPDFElements.pageMargin) *
                            (tableColumn.width / 100),
                    };
                });

                let titlePositionTop;
                let tableStartY;
                let tableFinalY = doc.lastAutoTable.finalY;

                // For first table & tables after page break, we need to set title position at the top of the page; the rest will be placed after previous table.
                if (index === 0 || tableFinalY > pageHeight - 30) {
                    titlePositionTop = globalPDFElements.pagePaddingTop;
                    tableStartY = globalPDFElements.pagePaddingTop + 5;
                } else {
                    titlePositionTop = tableFinalY + 15;
                    tableStartY = tableFinalY + 20;
                }

                // Avoid table titles to get placed on the page bottom margin
                if (tableFinalY > pageHeight - 30) {
                    doc.addPage();
                }
                doc.setFontSize(14);
                doc.setTextColor(CUSTOM_COLORS.text.primary);
                doc.text(tableTitle, 14, titlePositionTop);

                autoTable(doc, {
                    startY: tableStartY,
                    head: [tableHead],
                    headStyles: {
                        fillColor: CUSTOM_COLORS.primary.main,
                        textColor: CUSTOM_COLORS.white,
                    },
                    body: tableBody,
                    bodyStyles: {
                        textColor: CUSTOM_COLORS.text.primary,
                    },
                    columnStyles: tableColumnStyles,
                    margin: {top: 45},
                    didDrawPage: function(data) {
                        globalPDFElements.getHeader(doc, entityData);
                        globalPDFElements.getFooter(doc);
                    },
                });
            });

        doc.save(`download_${entityData.name}.pdf`);

        if (callback) {
            callback();
        }
    };
    return {download};
}
