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
                            content: `Contrato ${contract.code}`,
                            colSpan: 2,
                            styles: {fillColor: CUSTOM_COLORS.grey["100"]},
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

    const drawContractHeader = (doc, title) => {
        autoTable(doc, {
            startY: doc.lastAutoTable.finalY + 10,
            theme: "plain",
            head: [[title.toUpperCase()]],
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
