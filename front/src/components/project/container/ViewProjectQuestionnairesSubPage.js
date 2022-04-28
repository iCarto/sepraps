import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";

import {ProjectService} from "service/api";
import {SubPageLayout} from "layout";
import {ViewQuestionnaireInstance} from "components/questionnaire/container";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

const ViewProjectQuestionnairesSubPage = () => {
    const {id, questionnaireCode} = useParams();
    const location = useLocation();

    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
    const [projectQuestionnaire, setProjectQuestionnaire] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        ProjectService.getProjectsQuestionnaireInstances(id, questionnaireCode).then(
            projectQuestionnaire => {
                console.log({projectQuestionnaire});
                setLoading(false);
                setProjectQuestionnaire(projectQuestionnaire);
            }
        );
    }, [id, questionnaireCode, location.state?.lastRefreshDate]);

    const getIsSidePanelOpen = isOpen => {
        setIsSidePanelOpen(isOpen);
    };

    return (
        <SubPageLayout
            outletContext={[projectQuestionnaire]}
            getIsSidePanelOpen={getIsSidePanelOpen}
            isSidePanelOpen={isSidePanelOpen}
        >
            {loading && (
                <Grid item container justifyContent="center" xs={12}>
                    <CircularProgress color="inherit" size={20} />
                </Grid>
            )}
            {projectQuestionnaire && (
                <ViewQuestionnaireInstance
                    projectQuestionnaire={projectQuestionnaire}
                />
            )}
        </SubPageLayout>
    );
};

export default ViewProjectQuestionnairesSubPage;
