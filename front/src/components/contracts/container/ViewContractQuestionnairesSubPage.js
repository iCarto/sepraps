import {useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {ContractService} from "service/api";
import {SubPageLayout} from "layout";

import {ViewQuestionnaireInstanceFieldData} from "components/questionnaire/container";
import {QuestionnaireInstanceViewProvider} from "components/questionnaire/provider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const ViewContractQuestionnairesSubPage = () => {
    const {id, questionnaireCode} = useParams();

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
                <Typography variant="h5" sx={{mb: 2}}>
                    {questionnaire?.name}
                </Typography>
                <QuestionnaireInstanceViewProvider>
                    {questionnaire?.fields.map(field => (
                        <ViewQuestionnaireInstanceFieldData
                            key={field.code}
                            service={
                                ContractService.getContractsQuestionnaireInstancesFieldData
                            }
                            id={id}
                            questionnaireCode={questionnaireCode}
                            fieldCode={field.code}
                            fieldLabel={field.label}
                        />
                    ))}
                </QuestionnaireInstanceViewProvider>
            </Paper>
        </SubPageLayout>
    );
};

export default ViewContractQuestionnairesSubPage;
