import {DateUtil} from "base/format/utilities";

export function getFieldReportContent(reportData) {
    const headTableBody = [
        ["Memorándum n.º:", reportData.code],
        ["Fecha de la visita:", DateUtil.formatDate(reportData.date)],
        ["Elaborado por:", `${reportData.reporting_person}`],
        [
            "Otros participantes en la visita:",
            reportData.participant_persons?.join(", "),
        ],
        ["A la atención de:", reportData.reported_persons?.join(", ")],
        ["Firmas y sellos:", ""],
    ];

    const introText = reportData.report_comments_start;
    const closingText = reportData.report_comments_end;

    const projectsTableColumns = ["N.º", "Localidad", "Distrito", "Departamento"];

    const projectsList = [];
    reportData.field_report_projects.map(project => {
        // Unicode for bullet point
        projectsList.push([
            "\u2022 ",
            `${project.code}, ${project.name} (contrato ${project.contract})`,
        ]);
    });

    const goalsList = [];
    if (reportData.goals) {
        reportData.goals.map((goal, index) => {
            goalsList.push([`${index + 1}.`, goal]);
        });
    }

    const sectionTwoIntroText =
        "En este apartado se resume el trabajo realizado en cada uno de los proyectos y entidades asociadas, exponiendo los comentarios y observaciones de los técnicos en las diferentes reuniones y visitas realizadas.";

    const getImageUrls = images => {
        let imageUrls = [];
        // images.map(image => imageUrls.push(image.url));
        images.map(image => imageUrls.push(image));

        return imageUrls;
    };

    const getImageTableContent = images => {
        const groupedArray = [];
        const urls = [];
        const comments = [];

        images.map((image, index) => {
            comments.push(`Figura ${index + 1}`);
            urls.push(image);
        });

        const maxLength = Math.max(urls.length, comments.length);

        for (let i = 0; i < maxLength; i += 2) {
            const urlPair = [urls[i] || "", urls[i + 1] || ""];
            const commentPair = [comments[i] || "", comments[i + 1] || ""];
            groupedArray.push(urlPair, commentPair);
        }

        return groupedArray;
    };

    // ------- Unused ------- //
    // Image url + custom comment
    const getImageTableContent2 = images => {
        const groupedArray = [];
        const urls = [];
        const comments = [];

        images.map(image => {
            urls.push(image.url);
            comments.push(image.comment);
        });

        const maxLength = Math.max(urls.length, comments.length);

        for (let i = 0; i < maxLength; i += 2) {
            const urlPair = [urls[i] || "", urls[i + 1] || ""];
            const commentPair = [comments[i] || "", comments[i + 1] || ""];
            groupedArray.push(urlPair, commentPair);
        }

        return groupedArray;
    };

    const projectsTableBody = [];
    reportData.field_report_projects.map((project, index) => {
        projectsTableBody.push([
            index + 1,
            project.locality,
            project.district,
            project.department,
        ]);
    });
    // -------------------- //

    return {
        headTableBody,
        introText,
        closingText,
        projectsTableColumns,
        projectsTableBody,
        projectsList,
        goalsList,
        sectionTwoIntroText,
        getImageUrls,
        getImageTableContent,
    };
}
