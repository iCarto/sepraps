import {useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {useNavigateWithReload} from "base/navigation/hooks";
import {ProjectService} from "project/service";
import {project_questionnaire_view_adapter} from "questionnaire/model";

import {SidebarPanel} from "base/ui/sidebar";
import {QuestionnaireInstanceForm} from "questionnaire/presentational";
import {AlertError} from "base/error/components";

const UpdateProjectQuestionnaireInstancePanel = () => {
    const navigate = useNavigateWithReload();

    const {instanceId, action} = useParams();

    let projectQuestionnaire;
    [projectQuestionnaire] = useOutletContext();

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const validate = questionnaireInstance => {
        if (
            !questionnaireInstance.id &&
            projectQuestionnaire.questionnaire_instances.some(
                instance =>
                    instance.month === questionnaireInstance.month &&
                    instance.year === questionnaireInstance.year
            )
        ) {
            setError("Ya existe un registro para ese mes.");
            return false;
        }
        return true;
    };

    const handleSubmit = questionnaireInstance => {
        if (!validate(questionnaireInstance)) {
            return;
        }
        setSaving(true);
        const instanceIndex = projectQuestionnaire.questionnaire_instances.findIndex(
            instance => instance.id === questionnaireInstance.id
        );
        const questionnaire_instances = [
            ...projectQuestionnaire.questionnaire_instances,
        ];
        if (instanceIndex >= 0) {
            questionnaire_instances[instanceIndex] = questionnaireInstance;
        } else {
            questionnaire_instances.push({
                ...questionnaireInstance,
                extended: true,
            });
        }
        ProjectService.updateProjectQuestionnaireInstances(
            project_questionnaire_view_adapter({
                ...projectQuestionnaire,
                questionnaire_instances,
            })
        )
            .then(() => {
                setSaving(false);
                navigate(
                    `/projects/${projectQuestionnaire.projectId}/questionnaires/${projectQuestionnaire.questionnaire.code}`,
                    true
                );
            })
            .catch(error => {
                console.log(error);
                setError(error);
                setSaving(false);
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
            `/projects/${projectQuestionnaire.projectId}/questionnaires/${projectQuestionnaire.questionnaire.code}`
        );
    };

    return (
        <SidebarPanel
            sidebarTitle={
                action === "edit" ? "Modificar cuestionario" : "Añadir cuestionario"
            }
            closeSidebarClick={handleCloseSidebar}
        >
            <AlertError error={error} />
            {projectQuestionnaire && (
                <QuestionnaireInstanceForm
                    questionnaireInstance={selectedQuestionnaireInstance}
                    questionnaireFields={projectQuestionnaire.questionnaire.fields}
                    onSubmit={handleSubmit}
                    saving={saving}
                />
            )}
        </SidebarPanel>
    );
};

export default UpdateProjectQuestionnaireInstancePanel;
