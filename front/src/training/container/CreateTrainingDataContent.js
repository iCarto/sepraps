import {useState} from "react";
import {SocialComponentMonitoringService} from "socialComponentMonitoring/service";
import {training_view_adapter} from "training/model";
import {useNavigateWithReload} from "base/navigation/hooks";
import {TrainingForm} from "training/presentational/form";
import {AddNewInlineItemButton, AddNewInlineItemFormBox} from "base/shared/components";

const CreateTrainingDataContent = ({socialComponentId}) => {
    const navigate = useNavigateWithReload();

    const [mode, setMode] = useState("button");
    const [error, setError] = useState(null);

    const handleFormSubmit = training => {
        SocialComponentMonitoringService.createTraining(
            socialComponentId,
            training_view_adapter({...training})
        )
            .then(createdTraining => {
                setMode("button");
                navigate("", true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    return mode === "button" ? (
        <AddNewInlineItemButton
            onClick={() => {
                setMode("create");
            }}
            label="Añadir nueva capacitación"
        />
    ) : mode === "create" ? (
        <AddNewInlineItemFormBox label="Nueva capacitación">
            <TrainingForm
                socialComponentId={socialComponentId}
                onSubmit={handleFormSubmit}
                onCancel={() => {
                    setMode("button");
                }}
                error={error}
            />
        </AddNewInlineItemFormBox>
    ) : null;
};

export default CreateTrainingDataContent;
