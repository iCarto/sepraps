import {DateUtil} from "base/format/utilities";

export function getFieldReportContent(reportData) {
    const getInvolvedPersons = persons => {
        let involvedPersons = "";
        if (persons.length) {
            persons.map((person, index) => {
                if (index === persons.length - 1)
                    involvedPersons += `${person.name} (${person.role})`;
                else involvedPersons += `${person.name} (${person.role}), `;
            });
        }
        return involvedPersons;
    };

    const headTableBody = [
        ["Memorándum n.º:", reportData.report_code],
        ["Fecha de la visita:", DateUtil.formatDate(reportData.report_date)],
        [
            "Elaborado por:",
            `${reportData.reporting_person_name}, ${reportData.reporting_person_role}`,
        ],
        [
            "Otros participantes en la visita:",
            getInvolvedPersons(reportData.other_reporting_persons),
        ],
        ["A la atención de:", getInvolvedPersons(reportData.reported_persons)],
        ["Firmas y sellos:", ""],
    ];

    const introText = `Por este medio me dirijo a Usted y por su intermedio a quien corresponde, a fin de remitirle el informe de las Actividades realizadas por las personas participantes mencionadas arriba, en fechas ${reportData.visit_dates} del corriente.`;

    const projectsTableColumns = ["N.º", "Localidad", "Distrito", "Departamento"];

    const projectsList = [];
    reportData.visited_projects.map(project => {
        // Unicode for bullet point
        projectsList.push([
            "\u2022 ",
            `${project.code} (contrato ${project.contract})`,
        ]);
    });

    const goalsList = [];
    reportData.visit_goals.map((goal, index) => {
        goalsList.push([`${index + 1}.`, goal.goal]);
    });

    const sectionTwoIntroText =
        "En este apartado se resume el trabajo realizado en cada uno de los proyectos y entidades asociadas, exponiendo los comentarios y observaciones de los técnicos en las diferentes reuniones y visitas realizadas.";

    const getImageUrls = images => {
        let imageUrls = [];
        images.map(image => imageUrls.push(image.url));

        return imageUrls;
    };

    const getImageTableContent = images => {
        const groupedArray = [];
        const urls = [];
        const comments = [];

        images.map((image, index) => {
            comments.push(`Figura ${index + 1}`);
            urls.push(image.url);
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
    reportData.visited_projects.map((project, index) => {
        projectsTableBody.push([
            index + 1,
            project.locality,
            project.district,
            project.department,
        ]);
    });

    const endingText = reportData.report_comments
        ? `${reportData.report_comments}`
        : "";
    // -------------------- //

    return {
        headTableBody,
        introText,
        endingText,
        projectsTableColumns,
        projectsTableBody,
        projectsList,
        goalsList,
        sectionTwoIntroText,
        getImageUrls,
        getImageTableContent,
    };
}
