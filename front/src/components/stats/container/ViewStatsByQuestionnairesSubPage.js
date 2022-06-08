import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {StatsService} from "service/api";
import {QuestionnaireService} from "service/api/questionnaires";

import {SubPageLayout} from "layout";
import {ViewQuestionnaireInstanceFieldData} from "components/questionnaire/container";
import {QuestionnaireInstanceViewProvider} from "components/questionnaire/provider";
import {SectionHeading} from "components/common/presentational";
import {StatsFilterForm} from "../presentational";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

const ViewStatsByQuestionnairesSubPage = () => {
    const {questionnaireCode} = useParams();
    const location = useLocation();

    const [questionnaire, setQuestionnaire] = useState(null);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState({});

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

    return (
        <SubPageLayout>
            <Paper sx={{p: 3}}>
                {loading ? (
                    <Grid item container justifyContent="center" xs={12}>
                        <CircularProgress color="inherit" size={20} />
                    </Grid>
                ) : (
                    <>
                        <SectionHeading>{questionnaire?.name}</SectionHeading>
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
                                    fieldCode={field.code}
                                    filter={filter}
                                    fieldLabel={field.label}
                                />
                            ))}
                        </QuestionnaireInstanceViewProvider>
                    </>
                )}
            </Paper>
        </SubPageLayout>
    );
};

export default ViewStatsByQuestionnairesSubPage;
