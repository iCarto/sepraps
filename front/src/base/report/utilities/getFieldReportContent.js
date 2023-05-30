import {DateUtil} from "base/format/utilities";

export function getFieldReportContent(reportData) {
    const getReporting_persons = () => {
        let reporting_persons = `${reportData.reporting_person_name}`;
        if (reportData.other_reporting_persons.length) {
            reportData.other_reporting_persons.map(
                person => (reporting_persons += `, ${person.name} (${person.role})`)
            );
        }
        return reporting_persons;
    };

    const headTableBody = [
        [
            "A:",
            `${reportData.reported_person_name}, ${reportData.reported_person_role}`,
        ],
        [
            "De:",
            `${reportData.reporting_person_name}, ${reportData.reporting_person_role}`,
        ],
        ["Fecha:", DateUtil.formatDate(reportData.report_date)],
        [
            "Ref:",
            `Informe de las actividades realizadas en el marco del proyecto ${reportData.project_name}`,
        ],
        ["Contrato:", reportData.contract_code],
        ["Participantes:", getReporting_persons()],
    ];

    const introText = `Por este medio me dirijo a Usted y por su intermedio a quien corresponde, a fin de remitirle el informe de las Actividades realizadas por las personas participantes mencionadas arriba, en fechas ${reportData.activities_dates} del corriente, en el marco ${reportData.project_name}, correspondiente a las localidades de:`;

    const projectsTableColumns = ["N.º", "Localidad", "Distrito", "Departamento"];

    const projectsTableBody = [];
    reportData.visited_localities.map((project, index) => {
        projectsTableBody.push([
            index + 1,
            project.locality,
            project.district,
            project.department,
        ]);
    });

    const endingText = reportData.report_comments
        ? `${reportData.report_comments}
    
    Atentamente,`
        : "Atentamente,";

    const getImageTableContent = images => {
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

    return {
        headTableBody,
        introText,
        endingText,
        projectsTableColumns,
        projectsTableBody,
        getImageTableContent,
    };
}
