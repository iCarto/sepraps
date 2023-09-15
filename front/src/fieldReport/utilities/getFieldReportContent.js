import {DateUtil} from "base/format/utilities";

export function getFieldReportContent(reportData) {
    const headTableBody = [
        [
            "Fechas de la intervención:",
            `${DateUtil.formatDate(
                reportData?.visit_date_start
            )} - ${DateUtil.formatDate(reportData?.visit_date_end)}`,
        ],
        ["Elaborado por:", `${reportData.reporting_person}`],
        [
            "Otros participantes en la intervención:",
            reportData.participant_persons?.join(", "),
        ],
        ["A la atención de:", reportData.reported_persons?.join(", ")],
        ["Firmas y sellos:", ""],
    ];

    const introText = reportData.report_comments_start;
    const closingText = reportData.report_comments_end;
    const visitedProjects = reportData.field_report_projects;

    const projectsTableColumns = ["N.º", "Localidad", "Distrito", "Departamento"];

    const contractsList = [];
    visitedProjects.forEach(project => {
        contractsList.push({
            number: project.construction_contract_number,
            comments: project.construction_contract_comments,
        });
    });

    const getContractsList = () => {
        const contracts = [];
        contractsList.forEach(contract => {
            const existingContract = contracts.find(
                item => item.number === contract.number
            );

            if (!existingContract) {
                const contractObject = createContractObject(contract);

                visitedProjects.forEach(project => {
                    if (project.construction_contract_number === contract.number) {
                        contractObject.projects.push(createProjectEntry(project));
                    }
                });
                contracts.push(contractObject);
            }
        });
        return contracts;
    };

    const createContractObject = contract => {
        return {
            number: contract.number,
            comments: contract.comments,
            projects: [],
        };
    };

    const createProjectEntry = project => {
        // Unicode for bullet point
        return ["\u2022 ", `${project.code}, ${project.name}`];
    };

    const goalsList = [];
    if (reportData.goals) {
        reportData.goals.map((goal, index) => {
            goalsList.push([`${index + 1}.`, goal]);
        });
    }

    const sectionTwoIntroText =
        "En este apartado se resume el trabajo realizado en cada uno de los proyectos y entidades asociadas, exponiendo los comentarios y observaciones de los técnicos en las diferentes reuniones y visitas realizadas.";

    const getProjectAgreementsList = agreements => {
        const projectAgreementsList = [];
        if (agreements) {
            agreements.map((agreement, index) => {
                projectAgreementsList.push([`${index + 1}.`, agreement]);
            });
        }
        return projectAgreementsList;
    };

    const getImageUrls = images => {
        let imageUrls = [];
        images.map(image => imageUrls.push(image));

        return imageUrls;
    };

    const getImageTableContent = images => {
        const groupedArray = [];
        const urls = [];
        const comments = [];

        images.map(image => {
            comments.push(image.label);
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
        goalsList,
        sectionTwoIntroText,
        getContractsList,
        getProjectAgreementsList,
        getImageUrls,
        getImageTableContent,
    };
}
