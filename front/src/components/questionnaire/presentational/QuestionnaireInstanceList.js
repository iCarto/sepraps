import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import Grid from "@mui/material/Grid";
import QuestionnaireInstanceDetail from "./QuestionnaireInstanceDetail";
import QuestionnaireInstanceTree from "./QuestionnaireInstanceTree";
import {ButtonLink} from "components/common/presentational";
import Stack from "@mui/material/Stack";

const QuestionnaireInstanceList = ({projectQuestionnaire}) => {
    const {instanceId} = useParams();
    const navigate = useNavigate();

    const [instanceSelected, setInstanceSelected] = useState(null);

    useEffect(() => {
        if (instanceId) {
            setInstanceSelectedById(parseInt(instanceId));
        } else {
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
                    <QuestionnaireInstanceTree
                        projectQuestionnaire={projectQuestionnaire}
                        instanceSelectedId={instanceId}
                        onInstanceSelected={handleInstanceSelected}
                    />
                    <ButtonLink
                        text="Añadir"
                        to={`/projects/${projectQuestionnaire.projectId}/questionnaires/${projectQuestionnaire.questionnaire.code}/new/add`}
                    />
                </Stack>
            </Grid>
            <Grid item xs>
                <QuestionnaireInstanceDetail instance={instanceSelected} />
            </Grid>
        </Grid>
    );
};

export default QuestionnaireInstanceList;
