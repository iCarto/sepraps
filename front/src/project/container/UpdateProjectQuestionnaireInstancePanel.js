import {useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";

import {useNavigateWithReload} from "base/navigation/hooks";
import {ProjectService} from "project/service";
import {project_questionnaire_view_adapter} from "questionnaire/model";

import {EntityUpdatePanel} from "base/entity/components/presentational";
import {QuestionnaireInstanceForm} from "questionnaire/presentational";

const UpdateProjectQuestionnaireInstancePanel = () => {
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    const navigate = useNavigateWithReload();
    const {questionnaireCode, instanceId, action} = useParams();

    const outletContext = useOutletContext();
    const projectQuestionnaire = outletContext[3];

    const basePath = `/projects/${projectQuestionnaire?.projectId}/questionnaires/${questionnaireCode}`;

    let selectedQuestionnaireInstance = null;
    if (projectQuestionnaire) {
        selectedQuestionnaireInstance = projectQuestionnaire?.questionnaire_instances.find(
            instance => instance.id === parseInt(instanceId)
        );
    }

    const validate = questionnaireInstance => {
        if (
            !questionnaireInstance.id &&
            projectQuestionnaire?.questionnaire_instances.some(
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
        const instanceIndex = projectQuestionnaire?.questionnaire_instances.findIndex(
            instance => instance.id === questionnaireInstance.id
        );
        const questionnaire_instances = [
            ...projectQuestionnaire?.questionnaire_instances,
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
                navigate(basePath, true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
                setSaving(false);
            });
    };

    const handleFormCancel = () => {
        navigate(basePath);
    };

    return (
        <EntityUpdatePanel
            title={action === "edit" ? "Modificar cuestionario" : "Añadir cuestionario"}
            form={
                projectQuestionnaire && (
                    <QuestionnaireInstanceForm
                        questionnaireInstance={selectedQuestionnaireInstance}
                        questionnaireFields={projectQuestionnaire?.questionnaire.fields}
                        onSubmit={handleSubmit}
                        saving={saving}
                    />
                )
            }
            onCancel={handleFormCancel}
            error={error}
        />
    );
};

export default UpdateProjectQuestionnaireInstancePanel;
