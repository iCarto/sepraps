import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import Grid from "@mui/material/Grid";
import QuestionnaireInstanceDetail from "./QuestionnaireInstanceDetail";
import QuestionnaireInstanceTree from "./QuestionnaireInstanceTree";

const QuestionnaireInstanceList = ({projectQuestionnaire}) => {
    const {instanceId} = useParams();
    const navigate = useNavigate();

    const [instanceSelected, setInstanceSelected] = useState(null);

    useEffect(() => {
        if (instanceId) {
            setInstanceSelectedById(parseInt(instanceId));
        }
    }, [instanceId]);

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
                <QuestionnaireInstanceTree
                    projectQuestionnaire={projectQuestionnaire}
                    instanceSelectedId={instanceId}
                    onInstanceSelected={handleInstanceSelected}
                />
            </Grid>
            <Grid item xs>
                <QuestionnaireInstanceDetail instance={instanceSelected} />
            </Grid>
        </Grid>
    );
};

export default QuestionnaireInstanceList;
