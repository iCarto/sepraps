import {useLocation, useParams} from "react-router-dom";

import {SubPageLayout} from "layout";
import {ViewQuestionnaireInstance} from "components/questionnaire/container";

const ViewProjectQuestionnairesSubPage = () => {
    const {id, questionnaireCode} = useParams();
    const location = useLocation();

    return (
        <SubPageLayout>
            <ViewQuestionnaireInstance
                projectId={id}
                questionnaireCode={questionnaireCode}
            />
        </SubPageLayout>
    );
};

export default ViewProjectQuestionnairesSubPage;
