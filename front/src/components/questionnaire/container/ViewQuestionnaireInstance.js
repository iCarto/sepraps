import {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";
import {ProjectService} from "service/api";

import {QuestionnaireInstanceSummary} from "../presentational";
import {QuestionnaireInstanceViewProvider} from "components/questionnaire/provider";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

const ViewQuestionnaireInstance = ({projectId, questionnaireCode}) => {
    const location = useLocation();

    const [projectQuestionnaire, setProjectQuestionnaire] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        ProjectService.getProjectsQuestionnaireInstances(
            projectId,
            questionnaireCode
        ).then(projectQuestionnaire => {
            console.log({projectQuestionnaire});
            setLoading(false);
            setProjectQuestionnaire(projectQuestionnaire);
        });
    }, [projectId, questionnaireCode, location.state?.lastRefreshDate]);

    return (
        <Container maxWidth="lg">
            <Paper sx={{p: 3}}>
                <Stack direction="row" justifyContent="space-between" sx={{mb: 3}}>
                    <Typography variant="h5">
                        {projectQuestionnaire?.questionnaire?.name}
                    </Typography>
                </Stack>
                {loading && (
                    <Grid item container justifyContent="center" xs={12}>
                        <CircularProgress color="inherit" size={20} />
                    </Grid>
                )}
                {projectQuestionnaire && (
                    <QuestionnaireInstanceViewProvider>
                        <QuestionnaireInstanceSummary
                            projectQuestionnaire={projectQuestionnaire}
                        />
                    </QuestionnaireInstanceViewProvider>
                )}
            </Paper>
        </Container>
    );
};

export default ViewQuestionnaireInstance;
