import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {StatsService} from "service/api";
import {QuestionnaireService} from "service/api/questionnaires";
import {SubPageLayout} from "layout";

import {ViewQuestionnaireInstanceFieldData} from "components/questionnaire/container";
import {QuestionnaireInstanceViewProvider} from "components/questionnaire/provider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import {StatsFilterForm} from "../presentational";

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

    const getDataService = (questionnaireCode, fieldCode) => {
        return StatsService.getStatsByQuestionnaires(
            questionnaireCode,
            fieldCode,
            filter
        );
    };

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
                        <Typography variant="h5" sx={{mb: 2}}>
                            {questionnaire?.name}
                        </Typography>
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
                                    getDataService={() => {
                                        return getDataService(
                                            questionnaire.code,
                                            field.code
                                        );
                                    }}
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
