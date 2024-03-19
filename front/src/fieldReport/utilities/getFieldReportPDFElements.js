import autoTable from "jspdf-autotable";
import {CUSTOM_COLORS} from "Theme";
import {globalPDFElements} from "base/pdf/utilities";
import {DateUtil} from "base/format/utilities";

export function getFieldReportPDFElements(
    doc,
    reportData,
    dimensions,
    fieldReportContent
) {
    const getCenteredPositionX = text => {
        return (
            (dimensions.pageWidth + dimensions.pageMargin - doc.getTextWidth(text)) / 2
        );
    };

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
        const logoAdjustedWidth = logo.width / 12; // reduces the logo width
        const ratio = logo.width / logoAdjustedWidth;
        const logoAdjustedHeight = logo.height / ratio;

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
        const initialPositionY = doc.lastAutoTable.finalY + 80;
        const title = `Informe de viaje`;

        doc.setFontSize(dimensions.fontSizeHeadingOne)
            .setTextColor(CUSTOM_COLORS.primary.main)
            .text(title, getCenteredPositionX(title), initialPositionY, {
                lineHeightFactor: 2,
            });

        doc.setFont(undefined, "bold")
            .setFontSize(dimensions.fontSizeHeadingTwo)
            .setTextColor(CUSTOM_COLORS.text.primary)
            .text(
                `Número de memorándum: ${reportData.code}`,
                getCenteredPositionX(`Número de memorándum: ${reportData.code}`),
                initialPositionY + 10
            );

        const nameLines = doc.splitTextToSize(
            reportData.name,
            dimensions.pageWidth - 2 * dimensions.pageMargin
        );

        const firstLinePositionY = initialPositionY + 20;

        nameLines.forEach((line, index) => {
            doc.setFont(undefined, "normal")
                .setFontSize(dimensions.fontSizeHeadingTwo)
                .setTextColor(CUSTOM_COLORS.text.primary)
                .text(line, getCenteredPositionX(line), firstLinePositionY + index * 8);
        });

        const getDatePositionY = () => {
            if (nameLines.length === 1) return initialPositionY + 30;
            else return initialPositionY + 20 + (nameLines.length - 1) * 20;
        };

        doc.text(
            `(${DateUtil.formatDate(reportData.date)})`,
            getCenteredPositionX(`(${DateUtil.formatDate(reportData.date)})`),
            getDatePositionY()
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
                    cellWidth: 50,
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

    const drawReportGoalsList = () => {
        if (fieldReportContent.goalsList.length) {
            doc.setFont(undefined, "bold")
                .setFontSize(dimensions.fontSizeRegular)
                .setTextColor(CUSTOM_COLORS.text.primary)
                .text(
                    "Objetivos",
                    dimensions.pageMargin,
                    doc.lastAutoTable.finalY + 10
                );

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
        }
    };

    const drawReportClosure = () => {
        const closingText = fieldReportContent.closingText;

        if (closingText) {
            let startY = globalPDFElements.getStartY(doc.lastAutoTable, dimensions);

            // Split text to fit on the current page and subsequent pages
            const textFragments = doc.splitTextToSize(
                closingText,
                dimensions.pageWidth - dimensions.pageMargins
            );
            // Get remaining height on the current page
            let remainingHeight = dimensions.pageHeight - startY;

            textFragments.forEach((textFragment, index) => {
                // If remaining space on the current page is not enough for the text fragment
                if (
                    index > 0 &&
                    remainingHeight < doc.getTextDimensions(textFragment).h
                ) {
                    doc.addPage(); // Add a new page
                    startY = dimensions.contentPositionTop; // Reset startY for new page
                    remainingHeight = dimensions.pageHeight - dimensions.pageMargins; // Reset remaining height
                }

                // Draw text fragment
                doc.setFont(undefined, "italic").text(
                    textFragment,
                    dimensions.pageMargin,
                    startY,
                    {
                        maxWidth: dimensions.pageWidth - dimensions.pageMargins,
                    }
                );

                // Update startY and remainingHeight
                startY += doc.getTextDimensions(textFragment).h;
                remainingHeight -= doc.getTextDimensions(textFragment).h;
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
        drawReportGoalsList,
        drawReportClosure,
    };
}
