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

    const getDataService = (id, questionnaireCode, fieldCode) => {
        return ContractService.getContractsQuestionnaireInstancesFieldData(
            id,
            questionnaireCode,
            fieldCode
        );
    };

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
                            getDataService={() => {
                                return getDataService(
                                    id,
                                    questionnaireCode,
                                    field.code
                                );
                            }}
                            fieldLabel={field.label}
                        />
                    ))}
                </QuestionnaireInstanceViewProvider>
            </Paper>
        </SubPageLayout>
    );
};

export default ViewContractQuestionnairesSubPage;
