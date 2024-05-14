import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

import {QuestionnaireInstanceExpectedTable} from ".";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

const QuestionnaireInstanceEmpty = ({projectQuestionnaire, isProjectClosed}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        setSelectedOption(null);
    }, [location.state?.lastRefreshDate]);

    const onHandleSelectedOption = option => {
        setSelectedOption(option);
        if (option === "add") {
            navigate(
                `/projects/list/${projectQuestionnaire.projectId}/questionnaires/${projectQuestionnaire.questionnaire.code}/new/add`
            );
        }
    };

    const handleCancelExpected = () => {
        setSelectedOption(null);
    };

    return (
        <Grid container spacing={2} justifyContent="center">
            {isProjectClosed && (
                <Grid item>
                    <Alert severity="info" sx={{textAlign: "center"}}>
                        Este cuestionario no tiene registros.
                    </Alert>
                </Grid>
            )}
            {!selectedOption && !isProjectClosed && (
                <>
                    <Grid item>
                        <Alert severity="info" sx={{textAlign: "center"}}>
                            Este cuestionario aún no tiene registros.
                            <br /> Puede comenzar introduciendo una previsión de
                            ejecución o puede comenzar añadiendo el primer registro.
                        </Alert>
                    </Grid>
                    <Grid item container justifyContent="center" spacing={2}>
                        <Grid item>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => onHandleSelectedOption("expected")}
                            >
                                Introducir previsión
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => onHandleSelectedOption("add")}
                            >
                                Añadir registro
                            </Button>
                        </Grid>
                    </Grid>
                </>
            )}
            {selectedOption === "expected" ? (
                <QuestionnaireInstanceExpectedTable
                    projectQuestionnaire={projectQuestionnaire}
                    onCancel={handleCancelExpected}
                />
            ) : null}
        </Grid>
    );
};

export default QuestionnaireInstanceEmpty;
