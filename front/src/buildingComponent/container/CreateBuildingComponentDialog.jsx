import {useState} from "react";
import {useParams} from "react-router-dom";

import {ProjectService} from "project/service";
import {building_component_view_adapter} from "buildingComponent/model";
import {useNavigateWithReload} from "base/navigation/hooks";

import {BuildingComponentForm} from "buildingComponent/presentational/form";
import {DialogLayout} from "base/dialog/components";

const CreateBuildingComponentDialog = ({isDialogOpen, onCloseDialog}) => {
    const navigate = useNavigateWithReload();
    const {id: projectId} = useParams();

    const [error, setError] = useState("");

    const basePath = `/projects/list/${projectId}/buildingcomponents/list`;

    const handleFormSubmit = data => {
        return ProjectService.createProjectBuildingComponentMonitoring(
            projectId,
            building_component_view_adapter(data)
        )
            .then(createdBCMonitoring => {
                onCloseDialog();
                navigate(`${basePath}/${createdBCMonitoring.id}`, true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    return (
        <DialogLayout
            dialogTitle={`Crear un componente de obra nuevo`}
            dialogContent={
                <BuildingComponentForm
                    projectId={projectId}
                    onSubmit={handleFormSubmit}
                    onCancel={onCloseDialog}
                    error={error}
                />
            }
            isDialogOpen={isDialogOpen}
            fullWidth
            maxWidth="md"
        />
    );
};

export default CreateBuildingComponentDialog;
