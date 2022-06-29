import {useNavigate} from "react-router-dom";

import {QuestionnaireInstanceTable} from ".";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const QuestionnaireInstanceData = ({projectQuestionnaire, isProjectClosed}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(
            `/projects/${projectQuestionnaire.projectId}/questionnaires/${projectQuestionnaire.questionnaire.code}/new/add`
        );
    };

    return (
        <Grid container spacing={2} justifyContent="center">
            <Grid item>
                <QuestionnaireInstanceTable
                    projectQuestionnaire={projectQuestionnaire}
                    isProjectClosed={isProjectClosed}
                />
            </Grid>
            {!isProjectClosed && (
                <Grid item container justifyContent="center" spacing={2}>
                    <Grid item>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => handleClick()}
                        >
                            Añadir registro
                        </Button>
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
};

export default QuestionnaireInstanceData;
