import {jsPDF} from "jspdf";
import {getFieldReportContent, getFieldReportPDF} from ".";
import {getImagesData} from "base/image/utilities/getImagesData";
import {globalPDFElements} from "base/pdf/utilities";

export function downloadFieldReportPDF() {
    const download = async reportData => {
        const doc = new jsPDF({orientation: "portrait"});
        const fieldReportContent = getFieldReportContent(reportData);
        const fieldReport = getFieldReportPDF(doc, reportData);
        const fieldReportElements = fieldReport.fieldReportElements;
        const fieldReportProjectElements = fieldReport.fieldReportProjectElements;

        const firstHeaderLogo = {
            url: "/logo/logo_bilingue_M_Salud_Publica.png",
            label: "Ministerio de Salud Pública",
        };
        const secondHeaderLogo = {
            url: "/logo/logo_bilingue_gobierno_PY.png",
            label: "Gobierno de Paraguay",
        };
        const thirdHeaderLogo = {
            url: "/logo/logo_eslogan_guarani.png",
            label: "Eslogan guaraní",
        };
        const mainLogo = {
            url: "/logo/logo_senasa_tagline.png",
            label: "SENASA",
        };

        const logos = await getImagesData([
            firstHeaderLogo,
            secondHeaderLogo,
            thirdHeaderLogo,
            mainLogo,
        ]);

        // First page
        fieldReportElements.drawReportFirstPageHeader(logos.slice(0, -1));
        fieldReportElements.drawReportMainLogo(logos[3]);
        fieldReportElements.drawReportTitle();
        fieldReportElements.drawReportDetailsTable();

        doc.addPage();

        // Second page
        globalPDFElements.drawSectionIntro(
            doc,
            "1. Introducción",
            fieldReportContent.introText
        );

        fieldReportProjectElements.drawVisitedProjectsSection();
        fieldReportElements.drawReportGoalsList();
        fieldReportElements.drawReportClosure();

        doc.addPage();

        // Third and subsequent pages for visited projects
        globalPDFElements.drawSectionIntro(
            doc,
            "2. Trabajo realizado",
            fieldReportContent.sectionTwoIntroText
        );

        // Create array of promises for all calls to load activity images
        const activitiesImages = [];
        const activitiesImagesPromises = reportData.field_report_projects.flatMap(
            project =>
                project.field_report_project_activities.map(async activity => {
                    const images = [1, 2, 3, 4]
                        .map(imageIndex => {
                            return activity[`image${imageIndex}`]
                                ? {
                                      url: activity[`image${imageIndex}`],
                                      label: `Imagen ${imageIndex}`,
                                  }
                                : null;
                        })
                        .filter(item => item);
                    const activityImages = await getImagesData(images);
                    activitiesImages.push({id: activity.id, images: activityImages});
                })
        );

        // Wait for all promises and then execute the rest of the code and doc.save()
        await Promise.all(activitiesImagesPromises);

        const contracts = fieldReportContent.getContractsList();

        contracts.forEach(contract => {
            fieldReportProjectElements.drawContractHeader(doc, contract);

            reportData.field_report_projects.forEach(fieldReportProject => {
                if (
                    fieldReportProject.construction_contract_number === contract.number
                ) {
                    fieldReportProjectElements.drawVisitedProjectSection(
                        fieldReportProject,
                        activitiesImages
                    );
                }
            });
        });

        // Page count can only be calculated after all pages have been drawn. With this code we go back to page 2 and draw the Report closure there.
        // doc.setPage(2);
        // fieldReportElements.drawReportClosure();

        // Draw header & footer in all pages
        fieldReportElements.drawReportHeader();
        globalPDFElements.drawFooter(doc);

        doc.save(`informe_viaje_${reportData.date}.pdf`);

        return Promise.resolve(true);
    };

    return {download};
}
