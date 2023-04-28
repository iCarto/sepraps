import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";

import {ProjectService} from "project/service";
import {SubPageLayout} from "base/ui/main";
import {ViewQuestionnaireInstance} from "questionnaire/container";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

const ViewProjectQuestionnairesSubPage = () => {
    const {projectId, questionnaireCode} = useParams();
    const location = useLocation();

    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
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

    const getIsSidePanelOpen = isOpen => {
        setIsSidePanelOpen(isOpen);
    };

    return (
        <SubPageLayout
            outletContext={[projectQuestionnaire]}
            getIsSidePanelOpen={getIsSidePanelOpen}
            isSidePanelOpen={isSidePanelOpen}
        >
            <Container maxWidth="lg">
                <Paper sx={{p: 3}}>
                    {loading ? (
                        <Grid item container justifyContent="center" xs={12}>
                            <CircularProgress color="inherit" size={20} />
                        </Grid>
                    ) : (
                        projectQuestionnaire && (
                            <ViewQuestionnaireInstance
                                projectQuestionnaire={projectQuestionnaire}
                            />
                        )
                    )}
                </Paper>
            </Container>
        </SubPageLayout>
    );
};

export default ViewProjectQuestionnairesSubPage;
