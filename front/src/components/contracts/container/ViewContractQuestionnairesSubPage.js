import {useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {SubPageLayout} from "layout";

import {ViewQuestionnaireInstanceFieldData} from "components/questionnaire/container";
import {QuestionnaireInstanceViewProvider} from "components/questionnaire/provider";
import {SectionHeading} from "components/common/presentational";
import Paper from "@mui/material/Paper";

const ViewContractQuestionnairesSubPage = () => {
    const {contractId, questionnaireCode} = useParams();

    let contract;
    [contract] = useOutletContext();

    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
    const getIsSidePanelOpen = isOpen => {
        setIsSidePanelOpen(isOpen);
    };

    const questionnaire = contract?.questionnaires.find(
        questionnaire => questionnaire.code === questionnaireCode
    );

    return (
        <SubPageLayout
            getIsSidePanelOpen={getIsSidePanelOpen}
            isSidePanelOpen={isSidePanelOpen}
        >
            <Paper sx={{p: 3}}>
                <SectionHeading>{questionnaire?.name}</SectionHeading>
                <QuestionnaireInstanceViewProvider>
                    {questionnaire?.fields.map(field => (
                        <ViewQuestionnaireInstanceFieldData
                            key={field.code}
                            questionnaireCode={questionnaireCode}
                            field={field}
                            filter={{construction_contract: contractId}}
                        />
                    ))}
                </QuestionnaireInstanceViewProvider>
            </Paper>
        </SubPageLayout>
    );
};

export default ViewContractQuestionnairesSubPage;
