import {useEffect, useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {useNavigateWithReload} from "hooks";
import {ProjectService} from "service/api";
import {project_questionnaire_view_adapter} from "model";

import {SidebarPanel} from "layout";
import {QuestionnaireInstanceForm} from "components/questionnaire/presentational";
import Alert from "@mui/material/Alert";

const UpdateProjectQuestionnaireInstancePanel = () => {
    const navigate = useNavigateWithReload();

    const {instanceId, action} = useParams();

    let projectQuestionnaire;
    [projectQuestionnaire] = useOutletContext();

    const [error, setError] = useState("");

    const handleSubmit = questionnaireInstance => {
        const instanceIndex = projectQuestionnaire.questionnaire_instances.findIndex(
            instance => instance.id === questionnaireInstance.id
        );
        if (instanceIndex >= 0) {
            projectQuestionnaire.questionnaire_instances[
                instanceIndex
            ] = questionnaireInstance;
        } else {
            projectQuestionnaire.questionnaire_instances.push(questionnaireInstance);
        }
        ProjectService.updateProjectQuestionnaireInstances(
            project_questionnaire_view_adapter({
                ...projectQuestionnaire,
            })
        )
            .then(() => {
                navigate(
                    selectedQuestionnaireInstance
                        ? `/projects/${projectQuestionnaire.projectId}/questionnaires/${projectQuestionnaire.questionnaire.code}/${questionnaireInstance.id}`
                        : `/projects/${projectQuestionnaire.projectId}/questionnaires/${projectQuestionnaire.questionnaire.code}`,
                    true
                );
            })
            .catch(error => {
                console.log(error);
                setError(error.toString());
            });
    };

    let selectedQuestionnaireInstance = null;
    if (projectQuestionnaire) {
        selectedQuestionnaireInstance = projectQuestionnaire.questionnaire_instances.find(
            instance => instance.id === parseInt(instanceId)
        );
    }

    const handleCloseSidebar = () => {
        navigate(
            selectedQuestionnaireInstance
                ? `/projects/${projectQuestionnaire.projectId}/questionnaires/${projectQuestionnaire.questionnaire.code}/${selectedQuestionnaireInstance.id}`
                : `/projects/${projectQuestionnaire.projectId}/questionnaires/${projectQuestionnaire.questionnaire.code}`
        );
    };

    return (
        <SidebarPanel
            sidebarTitle={
                action === "edit" ? "Modificar cuestionario" : "Añadir cuestionario"
            }
            closeSidebarClick={handleCloseSidebar}
        >
            {error && (
                <Alert severity="error" sx={{mb: 2}}>
                    {error}
                </Alert>
            )}
            {projectQuestionnaire && (
                <QuestionnaireInstanceForm
                    questionnaireInstance={selectedQuestionnaireInstance}
                    questionnaireFields={projectQuestionnaire.questionnaire.fields}
                    onSubmit={handleSubmit}
                />
            )}
        </SidebarPanel>
    );
};

export default UpdateProjectQuestionnaireInstancePanel;
