import autoTable from "jspdf-autotable";
import {CUSTOM_COLORS} from "Theme";
import {globalPDFElements} from "base/pdf/utilities";
import {getFieldReportPDF} from ".";

export function getFieldReportProjectPDFElements(
    doc,
    dimensions,
    reportData,
    fieldReportContent
) {
    const drawVisitedProjectsSection = () => {
        if (reportData.field_report_projects.length) {
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

            drawVisitedProjectsList();
        }
    };

    const drawVisitedProjectsList = () => {
        const contracts = fieldReportContent?.getContractsList();

        contracts.forEach((contract, index) => {
            autoTable(doc, {
                startY:
                    index === 0
                        ? doc.lastAutoTable.finalY + 25
                        : doc.lastAutoTable.finalY + 5,
                theme: "plain",
                head: [
                    [
                        {
                            content: `Contrato ${contract.number}`,
                            colSpan: 2,
                            styles: {fillColor: CUSTOM_COLORS.grey["100"]},
                        },
                    ],
                    [
                        {
                            content: contract.comments,
                            colSpan: 2,
                            styles: {fontStyle: "normal"},
                        },
                    ],
                ],
                body: contract.projects,
                columnStyles: {
                    0: {
                        cellWidth: 10,
                        halign: "center",
                    },
                },
            });
        });
    };

    const drawContractHeader = (doc, contract) => {
        const tablePosition = globalPDFElements.getTableTopPosition(
            doc.lastAutoTable.finalY,
            dimensions
        );

        autoTable(doc, {
            startY: tablePosition.positionTop,
            margin: {top: tablePosition.marginTop},
            theme: "plain",
            head: [[`Contrato ${contract.number.toUpperCase()}`]],
            body: [[contract.comments]],
            headStyles: {
                fillColor: CUSTOM_COLORS.primary.main,
                textColor: CUSTOM_COLORS.white,
                fontSize: dimensions.fontSizeRegular,
                fontStyle: "bold",
            },
        });
    };

    const drawVisitedProjectHeader = project => {
        autoTable(doc, {
            startY: doc.lastAutoTable.finalY + 5,
            theme: "plain",
            head: [
                [
                    `Proyecto ${project.code.toUpperCase()}, ${project.name} - ${
                        project.location
                    }`,
                ],
            ],
            headStyles: {
                fillColor: CUSTOM_COLORS.primary.light,
                textColor: CUSTOM_COLORS.white,
                fontStyle: "bold",
            },
        });
    };

    const drawVisitedProjectHistory = project => {
        if (project.history) {
            const tablePosition = globalPDFElements.getTableTopPosition(
                doc.lastAutoTable.finalY,
                dimensions
            );

            autoTable(doc, {
                startY: tablePosition.positionTop,
                margin: {top: tablePosition.marginTop + 30},
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
        if (project.agreements.length) {
            const tablePosition = globalPDFElements.getTableTopPosition(
                doc.lastAutoTable.finalY,
                dimensions
            );

            autoTable(doc, {
                startY: tablePosition.positionTop,
                margin: {
                    top: tablePosition.marginTop || tablePosition.marginTop + 30,
                },
                theme: "plain",
                head: [
                    [
                        {
                            content: "Acuerdos alcanzados",
                            colSpan: 2,
                            styles: {
                                fontStyle: "bold",
                            },
                        },
                    ],
                ],
                body: fieldReportContent.getProjectAgreementsList(project.agreements),
                columnStyles: {
                    0: {
                        cellWidth: 10,
                    },
                },
            });
        }
    };

    const drawVisitedProjectSection = (project, activitiesImages) => {
        const fieldReport = getFieldReportPDF(doc, reportData);
        const fieldReportActivityElements = fieldReport.fieldReportActivityElements;

        drawVisitedProjectHeader(project);
        drawVisitedProjectHistory(project);

        project.field_report_project_activities.forEach(projectActivity => {
            fieldReportActivityElements.drawActivitySummary(projectActivity);
            fieldReportActivityElements.drawActivityPicturesTable(
                activitiesImages.find(activity => projectActivity.id === activity.id)
                    .images
            );
        });

        drawVisitedProjectAgreementsList(project);
    };

    return {
        drawVisitedProjectsSection,
        drawContractHeader,
        drawVisitedProjectSection,
    };
}
