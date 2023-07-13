import autoTable from "jspdf-autotable";
import {CUSTOM_COLORS} from "Theme";
import {getFieldReportContent} from ".";
import {globalPDFElements} from "base/pdf/utilities";

export function getFieldReportPDFElements(doc, reportData) {
    const dimensions = globalPDFElements.getPDFDimensions(doc);
    const fieldReportContent = getFieldReportContent(reportData);

    const drawReportHeader = () => {
        globalPDFElements.drawHeader(doc, `Informe de viaje - ${reportData.code}`);
    };

    const drawReportFirstPageHeader = logosData => {
        const headerLogos = [];
        logosData.map(logo => headerLogos.push(logo.url));

        const numberOfLogos = headerLogos.length;

        autoTable(doc, {
            startY: dimensions.pageMargin,
            theme: "plain",
            body: [headerLogos],
            styles: {
                cellPadding: 3,
                halign: "center",
                valign: "middle",
                textColor: CUSTOM_COLORS.white,
                fillColor: CUSTOM_COLORS.white,
            },
            didDrawCell: data => {
                const cellData = data.cell;
                const paddingX = cellData.padding("horizontal");
                const imageUrl = cellData.raw;
                const logoOriginalWidth = logosData[data.column.index].width;
                const logoAdjustedWidth =
                    data.column.index === 2
                        ? dimensions.pageWidth / numberOfLogos - paddingX * 7
                        : dimensions.pageWidth / numberOfLogos - paddingX * 2;
                const ratio = logoOriginalWidth / logoAdjustedWidth;
                const logoAdjustedHeight = logosData[data.column.index].height / ratio;
                const logoPositionX =
                    cellData.x + (cellData.width - logoAdjustedWidth) / 2;
                const logoPositionY =
                    cellData.y + (cellData.height - logoAdjustedHeight) / 2;

                doc.addImage(
                    imageUrl,
                    "png",
                    logoPositionX,
                    logoPositionY,
                    logoAdjustedWidth,
                    logoAdjustedHeight
                );
            },
            // Attempt to change page internal margins --fails
            // didDrawPage: function(data) {
            //     data.settings.margin = {
            //         top: 20,
            //         right: 20,
            //         bottom: 20,
            //         left: 20,
            //     };
            // },
        });
    };

    const drawReportMainLogo = logo => {
        const logoAdjustedWidth = logo.width / 3;
        const ratio = logo.width / logoAdjustedWidth;
        // Original logo is slightly distorted vertically, so we need to fix it here by reducing the high.
        const logoAdjustedHeight = (logo.height - 10) / ratio;

        doc.addImage(
            logo.url,
            "png",
            (dimensions.pageWidth + dimensions.pageMargin - logoAdjustedWidth) / 2,
            doc.lastAutoTable.finalY + 20,
            logoAdjustedWidth,
            logoAdjustedHeight
        );
    };

    const drawReportTitle = () => {
        const getTextPositionY = text => {
            return (
                (dimensions.pageWidth +
                    dimensions.pageMargin -
                    doc.getTextWidth(text)) /
                2
            );
        };

        const initialPositionY = doc.lastAutoTable.finalY + 80;
        const title = `Informe de viaje - ${reportData.code}`;

        doc.setFontSize(dimensions.fontSizeHeadingOne)
            .setTextColor(CUSTOM_COLORS.primary.main)
            .text(title, getTextPositionY(title), initialPositionY, {
                lineHeightFactor: 2,
            });

        doc.setFontSize(dimensions.fontSizeHeadingTwo)
            .setTextColor(CUSTOM_COLORS.text.primary)
            .text(
                reportData.name,
                getTextPositionY(reportData.name),
                initialPositionY + 10
            );

        doc.setFont(undefined, "bold").text(
            reportData.date,
            getTextPositionY(reportData.date),
            initialPositionY + 20
        );
    };

    const drawReportDetailsTable = () => {
        autoTable(doc, {
            startY: 160,
            theme: "grid",
            body: fieldReportContent.headTableBody,
            bodyStyles: {
                textColor: CUSTOM_COLORS.text.primary,
            },
            columnStyles: {
                0: {
                    cellWidth: 40,
                    fontSize: dimensions.fontSizeRegular,
                    fontStyle: "bold",
                },
                1: {halign: "left", fontSize: dimensions.fontSizeRegular},
            },
            styles: {
                cellPadding: 2,
            },
            didParseCell: data => {
                if (data.row.index === data.table.body.length - 1) {
                    data.cell.styles.minCellHeight = 60;
                    data.cell.styles.valign = "middle";
                }
            },
        });
    };

    const drawSectionIntro = (title, text) => {
        autoTable(doc, {
            startY: dimensions.contentPositionTop,
            theme: "plain",
            head: [[title.toUpperCase()]],
            headStyles: {
                fillColor: CUSTOM_COLORS.primary.dark,
                textColor: CUSTOM_COLORS.white,
                fontSize: dimensions.fontSizeRegular,
                fontStyle: "bold",
            },
            body: [[""], [text]],
            bodyStyles: {
                fontSize: dimensions.fontSizeRegular,
                fontStyle: "italic",
                textColor: CUSTOM_COLORS.text.primary,
            },
        });
    };

    const drawVisitedProjectsList = () => {
        doc.setFont(undefined, "bold")
            .setFontSize(dimensions.fontSizeRegular)
            .setTextColor(CUSTOM_COLORS.text.primary)
            .text(
                "Relación de contratos y proyectos visitados",
                dimensions.pageMargin,
                doc.lastAutoTable.finalY + 10
            );

        globalPDFElements.drawLine(doc, doc.lastAutoTable.finalY + 12);

        doc.setFont(undefined, "normal").text(
            "Los proyectos y contratos objetivo de la visita al campo fueron:",
            dimensions.pageMargin,
            doc.lastAutoTable.finalY + 20
        );

        autoTable(doc, {
            startY: doc.lastAutoTable.finalY + 25,
            theme: "plain",
            body: fieldReportContent.projectsList,
            columnStyles: {
                0: {
                    cellWidth: 10,
                },
            },
        });
    };

    const drawVisitGoalsList = () => {
        doc.setFont(undefined, "bold")
            .setFontSize(dimensions.fontSizeRegular)
            .setTextColor(CUSTOM_COLORS.text.primary)
            .text("Objetivos", dimensions.pageMargin, doc.lastAutoTable.finalY + 10);

        globalPDFElements.drawLine(doc, doc.lastAutoTable.finalY + 12);

        autoTable(doc, {
            startY: doc.lastAutoTable.finalY + 20,
            theme: "plain",
            body: fieldReportContent.goalsList,
            columnStyles: {
                0: {
                    cellWidth: 10,
                },
            },
        });
    };

    const drawReportClosure = () => {
        const closingText = fieldReportContent.closingText;

        if (closingText) {
            doc.setFont(undefined, "italic").text(
                closingText,
                dimensions.pageMargin,
                doc.lastAutoTable.finalY + 15,
                {
                    maxWidth: dimensions.pageWidth - dimensions.pageMargin,
                }
            );
        }
    };

    const drawVisitedProjectTitle = project => {
        autoTable(doc, {
            startY: doc.lastAutoTable.finalY + 10,
            theme: "plain",
            head: [
                [
                    `Proyecto ${project.code.toUpperCase()}, ${project.name} - ${
                        project.location
                    }`,
                ],
            ],
            headStyles: {
                fillColor: CUSTOM_COLORS.primary.main,
                textColor: CUSTOM_COLORS.white,
                fontStyle: "bold",
            },
        });
    };

    const drawVisitedProjectHistory = project => {
        if (project.history) {
            autoTable(doc, {
                startY: doc.lastAutoTable.finalY + 5,
                theme: "plain",
                head: [["Antecedentes"]],
                headStyles: {
                    fontStyle: "bold",
                },
                body: [[project.history]],
            });
        }
    };

    const drawVisitedProjectAgreementsList = project => {
        if (project.agreements) {
            doc.setFont(undefined, "bold")
                .setFontSize(dimensions.fontSizeRegular)
                .setTextColor(CUSTOM_COLORS.text.primary)
                .text(
                    "Acuerdos alcanzados",
                    dimensions.pageMargin,
                    doc.lastAutoTable.finalY + 10
                );
            autoTable(doc, {
                startY: doc.lastAutoTable.finalY + 15,
                theme: "plain",
                body: fieldReportContent.getProjectAgreementsList(project.agreements),
                columnStyles: {
                    0: {
                        cellWidth: 10,
                    },
                },
            });
        }
    };

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

    const drawReportSummary = () => {
        let textPositionTop = doc.lastAutoTable.finalY + 20;
        const projectsTablePositionTop = textPositionTop + 30;

        doc.setFontSize(10)
            .setTextColor(CUSTOM_COLORS.text.primary)
            .text(
                fieldReportContent.introText,
                dimensions.pageMargin,
                textPositionTop,
                {
                    maxWidth: dimensions.pageWidth - dimensions.pageMargin,
                    lineHeightFactor: 2,
                }
            );

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
                fontSize: dimensions.fontSizeRegular,
            },
            body: fieldReportContent.projectsTableBody,
            bodyStyles: {textColor: CUSTOM_COLORS.text.primary},
            columnStyles: {
                text: {fontSize: dimensions.fontSizeRegular},
            },
        });
    };

    return {
        drawReportHeader,
        drawReportFirstPageHeader,
        drawReportMainLogo,
        drawReportTitle,
        drawReportDetailsTable,
        drawSectionIntro,
        drawVisitedProjectsList,
        drawVisitGoalsList,
        drawReportClosure,
        drawVisitedProjectTitle,
        drawVisitedProjectHistory,
        drawVisitedProjectAgreementsList,
        drawActivitySummary,
        drawActivityPicturesTable,
    };
}
