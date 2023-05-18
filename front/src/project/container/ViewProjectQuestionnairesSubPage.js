import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";

import {ProjectService} from "project/service";
import {EntityViewSubPage} from "base/entity/components/container";
import {ProjectQuestionnaireSection} from "questionnaire/presentational";

const ViewProjectQuestionnairesSubPage = () => {
    const {id: projectId, questionnaireCode} = useParams();
    const location = useLocation();

    const [projectQuestionnaire, setProjectQuestionnaire] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        ProjectService.getProjectsQuestionnaireInstances(
            projectId,
            questionnaireCode
        ).then(projectQuestionnaire => {
            console.log({projectQuestionnaire});
            setIsLoading(false);
            setProjectQuestionnaire(projectQuestionnaire);
        });
    }, [projectId, questionnaireCode, location.state?.lastRefreshDate]);

    const sections = [
        <ProjectQuestionnaireSection
            questionnaire={projectQuestionnaire}
            isLoading={isLoading}
        />,
    ];

    return (
        <EntityViewSubPage
            sections={sections}
            additionalContext={projectQuestionnaire}
        />
    );
};

export default ViewProjectQuestionnairesSubPage;
