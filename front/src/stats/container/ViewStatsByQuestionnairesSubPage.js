import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";

import {QuestionnaireService} from "questionnaire/service";
import {QuestionnaireInstanceViewProvider} from "questionnaire/provider";

import {Spinner} from "base/shared/components";
import {SectionCard} from "base/section/components";
import {EntityViewSubPage} from "base/entity/pages";
import {StatsFilterForm} from "stats/presentational";
import {ViewQuestionnaireInstanceFieldData} from "questionnaire/container";

const ViewStatsByQuestionnairesSubPage = () => {
    const [questionnaire, setQuestionnaire] = useState(null);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState({});

    const {questionnaireCode} = useParams();
    const location = useLocation();

    useEffect(() => {
        setLoading(true);
        QuestionnaireService.getQuestionnaire(questionnaireCode).then(questionnaire => {
            setQuestionnaire(questionnaire);
            setLoading(false);
        });
    }, [questionnaireCode, location.state?.lastRefreshDate]);

    const handleFilterChange = (attribute, value) => {
        setFilter({...filter, [attribute]: value});
    };

    const handleFilterClear = () => {
        setFilter({});
    };

    const sections = [
        <SectionCard title={questionnaire?.name}>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <StatsFilterForm
                        filter={filter}
                        views={[
                            "financingFunds",
                            "financingPrograms",
                            "contracts",
                            "contractors",
                            "administrativeDivisions",
                            "dates",
                        ]}
                        onChange={handleFilterChange}
                        onClear={handleFilterClear}
                    />
                    <QuestionnaireInstanceViewProvider>
                        {questionnaire?.fields.map(field => (
                            <ViewQuestionnaireInstanceFieldData
                                key={field.code}
                                questionnaireCode={questionnaire.code}
                                field={field}
                                filter={filter}
                            />
                        ))}
                    </QuestionnaireInstanceViewProvider>
                </>
            )}
        </SectionCard>,
    ];

    return questionnaire && <EntityViewSubPage sections={sections} />;
};

export default ViewStatsByQuestionnairesSubPage;
