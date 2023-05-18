import {useOutletContext, useParams} from "react-router-dom";

import {ViewQuestionnaireInstanceFieldData} from "questionnaire/container";
import {QuestionnaireInstanceViewProvider} from "questionnaire/provider";
import {SectionCard} from "base/ui/section/components";
import {EntityViewSubPage} from "base/entity/components/container";

const ViewContractQuestionnairesSubPage = () => {
    const {contractId, questionnaireCode} = useParams();

    let contract;
    [contract] = useOutletContext();

    const questionnaire = contract?.questionnaires.find(
        questionnaire => questionnaire.code === questionnaireCode
    );

    const sections = [
        <SectionCard title={questionnaire?.name}>
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
        </SectionCard>,
    ];

    return contract && <EntityViewSubPage sections={sections} />;
};

export default ViewContractQuestionnairesSubPage;
