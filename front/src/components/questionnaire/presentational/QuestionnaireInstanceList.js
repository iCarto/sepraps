import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {AuthAction, useAuth} from "auth";

import Grid from "@mui/material/Grid";
import QuestionnaireInstanceDetail from "./QuestionnaireInstanceDetail";
import QuestionnaireInstanceTree from "./QuestionnaireInstanceTree";
import {ButtonLink} from "components/common/presentational";
import Stack from "@mui/material/Stack";

const QuestionnaireInstanceList = ({projectQuestionnaire}) => {
    const {instanceId} = useParams();
    const navigate = useNavigate();
    const {ROLES} = useAuth();

    const [instanceSelected, setInstanceSelected] = useState(null);

    useEffect(() => {
        if (instanceId) {
            setInstanceSelectedById(parseInt(instanceId));
        } else if (projectQuestionnaire.questionnaire_instances.length) {
            setInstanceSelectedById(
                projectQuestionnaire.questionnaire_instances[
                    projectQuestionnaire.questionnaire_instances.length - 1
                ].id
            );
        }
    }, [instanceId, projectQuestionnaire]);

    const setInstanceSelectedById = instanceId => {
        const instanceFound = projectQuestionnaire.questionnaire_instances.find(
            instance => instance.id === instanceId
        );
        if (instanceFound) {
            setInstanceSelected(instanceFound);
        }
    };

    const handleInstanceSelected = instanceSelectedId => {
        navigate(
            `/projects/${projectQuestionnaire.projectId}/questionnaires/${projectQuestionnaire.questionnaire.code}/${instanceSelectedId}`
        );
    };

    return (
        <Grid container spacing={2}>
            <Grid item>
                <Stack alignItems="center">
                    {projectQuestionnaire.questionnaire_instances.length !== 0 && (
                        <QuestionnaireInstanceTree
                            projectQuestionnaire={projectQuestionnaire}
                            instanceSelectedId={instanceId}
                            onInstanceSelected={handleInstanceSelected}
                        />
                    )}
                    <AuthAction roles={[ROLES.EDIT, ROLES.MANAGEMENT]}>
                        <ButtonLink
                            text="Añadir"
                            to={`/projects/${projectQuestionnaire.projectId}/questionnaires/${projectQuestionnaire.questionnaire.code}/new/add`}
                        />
                    </AuthAction>
                </Stack>
            </Grid>
            {instanceSelected && (
                <Grid item xs>
                    <QuestionnaireInstanceDetail instance={instanceSelected} />
                </Grid>
            )}
        </Grid>
    );
};

export default QuestionnaireInstanceList;
