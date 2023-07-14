import autoTable from "jspdf-autotable";
import {DateUtil} from "base/format/utilities";
import {APP_LOGO_URL} from "sepraps/config/appInfo";
import {CUSTOM_COLORS} from "Theme";

export const globalPDFElements = {
    pageMargin: 15,
    // pageMargin: 20,
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

    getPDFDimensions(doc) {
        const contentPositionTop = globalPDFElements.pagePaddingTop - 10;

        return {
            pageWidth: this.getPageWidth(doc),
            pageHeight: this.getPageHeight(doc),
            pageMargin: this.pageMargin,
            pageMargins: this.getPageMargins(),
            pagePaddingTop: this.pagePaddingTop,
            contentPositionTop: contentPositionTop,
            fontSizeRegular: 10,
            fontSizeHeadingOne: 18,
            fontSizeHeadingTwo: 14,
        };
    },

    drawLine(doc, positionY) {
        doc.setDrawColor(CUSTOM_COLORS.text.primary).line(
            this.pageMargin,
            positionY,
            globalPDFElements.getPageWidth(doc),
            positionY
        );
    },

    drawHeader(doc, reportHeading) {
        const logoWidth = 45;
        const logoHeight = 14;
        const logoPositionRight = this.getPageWidth(doc) - logoWidth;
        const textPositionTop = 24;

        const pageCount = doc.internal.getNumberOfPages();

        for (let i = 2; i <= pageCount; i++) {
            if (i !== 0) doc.setPage(i);
            doc.setFontSize(18)
                .setFont(undefined, "normal")
                .setTextColor(CUSTOM_COLORS.primary.main)
                .text(reportHeading, this.pageMargin, textPositionTop, {
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
            doc.setDrawColor(CUSTOM_COLORS.primary.main).line(
                this.pageMargin,
                30,
                this.getPageWidth(doc),
                30
            );
        }

        doc.setFontSize(18)
            .setTextColor(CUSTOM_COLORS.primary.main)
            .text(reportHeading, this.pageMargin, textPositionTop, {
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
        doc.setDrawColor(CUSTOM_COLORS.primary.main).line(
            this.pageMargin,
            30,
            this.getPageWidth(doc),
            30
        );
    },

    drawFooter(doc) {
        const pageCount = doc.internal.getNumberOfPages();

        for (let i = 2; i <= pageCount; i++) {
            const footerText = `${DateUtil.formatDate(new Date())} - Página ${String(
                i
            )} de ${String(pageCount)}`;

            if (i !== 0)
                doc.setPage(i)
                    .setFont(undefined, "normal")
                    .setFontSize(8)
                    .setTextColor(CUSTOM_COLORS.grey["500"])
                    .text(
                        footerText,
                        this.getPageWidth(doc) - 33,
                        this.getPageHeight(doc) + 5
                    );
        }
    },

    drawSectionIntro(doc, title, text) {
        autoTable(doc, {
            startY: this.getPDFDimensions(doc).contentPositionTop,
            theme: "plain",
            head: [[title.toUpperCase()]],
            headStyles: {
                fillColor: CUSTOM_COLORS.primary.dark,
                textColor: CUSTOM_COLORS.white,
                fontSize: this.getPDFDimensions(doc).fontSizeRegular,
                fontStyle: "bold",
            },
            body: [[""], [text || ""]],
            bodyStyles: {
                fontSize: this.getPDFDimensions(doc).fontSizeRegular,
                fontStyle: "italic",
                textColor: CUSTOM_COLORS.text.primary,
            },
        });
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
            didDrawPage: () => {
                globalPDFElements.drawHeader(doc, entityData);
                globalPDFElements.drawFooter(doc);
            },
        });
    },
};
