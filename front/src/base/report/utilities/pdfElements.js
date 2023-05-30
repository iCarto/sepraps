import autoTable from "jspdf-autotable";
import {DateUtil} from "base/format/utilities";
import {APP_LOGO_URL} from "sepraps/config/appInfo";
import {CUSTOM_COLORS} from "Theme";

export const pdfElements = {
    pageMargin: 15,
    pagePaddingTop: 45,

    getPageMargins() {
        return this.pageMargin * 2;
    },

    getPageWidth(doc) {
        return doc.internal.pageSize.getWidth() - this.pageMargin;
    },

    getPageHeight(doc) {
        return doc.internal.pageSize.getHeight() - this.pageMargin;
    },

    getPDFDimensions(doc, imageDimensions = null) {
        // const widthRatio = this.getPageWidth(doc) / imageDimensions.x;
        // const heightRatio = this.getPageHeight(doc) / imageDimensions.y;
        // const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;

        // let canvasWidth = imageDimensions.x * ratio - this.getPageMargins();
        // let canvasHeight = imageDimensions.y * ratio - this.getPageMargins();

        // if (canvasHeight > this.getPageHeight(doc) / 2) {
        //     canvasWidth = canvasWidth * 0.5;
        //     canvasHeight = canvasHeight * 0.5;
        // }

        const contentPositionTop = pdfElements.pagePaddingTop - 10;
        // const imagePositionLeft = (this.getPageWidth(doc) - canvasWidth) / 2;
        // const imageWidth = canvasWidth + pdfElements.pageMargin;

        return {
            pageWidth: this.getPageWidth(doc),
            pageHeight: this.getPageHeight(doc),
            pageMargin: this.pageMargin,
            pageMargins: this.getPageMargins(),
            pagePaddingTop: this.pagePaddingTop,
            contentPositionTop: contentPositionTop,
            // canvasWidth: canvasWidth,
            // canvasHeight: canvasHeight,
            // imagePositionLeft: imagePositionLeft,
            // imageWidth: imageWidth,
        };
    },

    drawHeader(doc, reportHeading) {
        const logoWidth = 45;
        const logoHeight = 13;
        const logoPositionRight = this.getPageWidth(doc) - logoWidth;
        const textPositionTop = 24;

        // doc.setFont("XuntaSans-Bold", "normal");
        doc.setFontSize(18);
        doc.setTextColor(CUSTOM_COLORS.primary.main);
        doc.text(reportHeading, this.pageMargin, textPositionTop, {
            maxWidth: logoPositionRight,
            baseline: "bottom",
        });

        doc.addImage(
            APP_LOGO_URL,
            "png",
            logoPositionRight,
            logoHeight,
            logoWidth,
            logoHeight
        );
        doc.setDrawColor(CUSTOM_COLORS.primary.main);
        doc.line(this.pageMargin, 30, this.getPageWidth(doc), 30);
    },

    drawFooter(doc) {
        const pageCount = doc.internal.getNumberOfPages();
        const currentPage = doc.internal.getCurrentPageInfo().pageNumber;

        const footerText = `${DateUtil.formatDate(
            new Date()
            // )} - Página ${currentPage} de ${pageCount}`;
        )} - Página ${currentPage}`;

        // doc.setFont("XuntaSans-Regular", "normal");
        doc.setFontSize(8);
        doc.setTextColor(CUSTOM_COLORS.grey["500"]);
        doc.text(footerText, this.getPageWidth(doc) - 28, this.getPageHeight(doc) + 5);
    },

    drawSummaryTable(doc, entityData, sectionData, summaryPositionTop) {
        const getTableStartY = () => {
            if (doc.lastAutoTable) return doc.lastAutoTable.finalY + 5;
            return summaryPositionTop;
        };

        autoTable(doc, {
            startY: getTableStartY(),
            margin: {top: this.pagePaddingTop - 10},
            theme: "plain",
            head: [
                [
                    {
                        content: sectionData?.head.toUpperCase(),
                        colSpan: 2,
                        styles: {
                            cellPadding: 0.75,
                            valign: "middle",
                            fillColor: CUSTOM_COLORS.primary.main,
                            textColor: CUSTOM_COLORS.white,
                            fontSize: 9,
                        },
                    },
                ],
            ],
            body: sectionData?.content,
            bodyStyles: {textColor: CUSTOM_COLORS.text.primary},
            columnStyles: {
                0: {cellPadding: 0.5, cellWidth: 75, fontSize: 9, fontStyle: "bold"},
                1: {cellPadding: 0.5, halign: "left", fontSize: 9},
            },
            pageBreak: "avoid",
            didDrawPage: function(data) {
                pdfElements.drawHeader(doc, entityData);
                pdfElements.drawFooter(doc);
            },
        });
    },
};
