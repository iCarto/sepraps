import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import QuestionnaireInstanceExpectedTable from "./QuestionnaireInstanceExpectedTable";
import Alert from "@mui/material/Alert";

const QuestionnaireInstanceEmpty = ({projectQuestionnaire}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        setSelectedOption(null);
    }, [location.state?.lastRefreshDate]);

    const onHandleSelecteOption = option => {
        setSelectedOption(option);
        if (option === "add") {
            navigate(
                `/projects/${projectQuestionnaire.projectId}/questionnaires/${projectQuestionnaire.questionnaire.code}/new/add`
            );
        }
    };

    const handleCancelExpected = () => {
        setSelectedOption(null);
    };

    return (
        <Grid container spacing={2} justifyContent="center">
            {!selectedOption && (
                <>
                    <Grid item>
                        <Alert severity="info" sx={{textAlign: "center"}}>
                            Este cuestionario no tiene todavía registros.
                            <br /> Puede comenzar introduciendo una previsión de
                            ejecución o puede comenzar añadiendo el primer registro.
                        </Alert>
                    </Grid>
                    <Grid item container justifyContent="center" spacing={2}>
                        <Grid item>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => onHandleSelecteOption("expected")}
                            >
                                Introducir previsión
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => onHandleSelecteOption("add")}
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
