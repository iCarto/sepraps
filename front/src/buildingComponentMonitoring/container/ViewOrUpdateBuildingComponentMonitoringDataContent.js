import {useState} from "react";
import {useNavigateWithReload} from "base/navigation/hooks";

import {BuildingComponentMonitoringService} from "buildingComponentMonitoring/service";
import {BuildingComponentService} from "buildingComponent/service";
import {building_component_view_adapter} from "buildingComponent/model";
import {building_component_monitoring_view_adapter} from "buildingComponentMonitoring/model";

import {SectionCard, SectionCardHeaderAction} from "base/ui/section/components";
import {BuildingComponentMonitoringData} from "buildingComponentMonitoring/presentational";
import {BuildingComponentMonitoringForm} from "buildingComponentMonitoring/presentational/form";
import {BuildingComponentNameForm} from "buildingComponent/presentational/form";

import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DonutLargeOutlinedIcon from "@mui/icons-material/DonutLargeOutlined";

const ViewOrUpdateBuildingComponentMonitoringDataContent = ({bcMonitoring}) => {
    const navigate = useNavigateWithReload();

    const [mode, setMode] = useState("view");
    const [error, setError] = useState(null);

    const handleBcMonitoringFormSubmit = updatedBcMonitoring => {
        updateEntity(
            {...updatedBcMonitoring},
            BuildingComponentMonitoringService,
            building_component_monitoring_view_adapter
        );
    };

    const handleBuildingComponentFormSubmit = updatedBuildingComponent => {
        updateEntity(
            {...bcMonitoring.building_component, ...updatedBuildingComponent},
            BuildingComponentService,
            building_component_view_adapter
        );
    };

    const updateEntity = (formData, updateService, dataAdapter) => {
        updateService
            .update(dataAdapter(formData))
            .then(updatedData => {
                setMode("view");
                navigate("", true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    const actions = [
        <SectionCardHeaderAction
            key="edit"
            name="edit"
            text="Editar seguimiento"
            icon={<DonutLargeOutlinedIcon />}
            onClick={() => {
                setMode("edit");
            }}
        />,
        <SectionCardHeaderAction
            key="edit-name"
            name="edit-name"
            text="Editar nombre"
            icon={<DriveFileRenameOutlineIcon />}
            onClick={() => {
                setMode("edit-name");
            }}
        />,
    ];

    const getComponent = mode => {
        if (mode === "view") {
            return <BuildingComponentMonitoringData bcMonitoring={bcMonitoring} />;
        }
        if (mode === "edit") {
            return (
                <BuildingComponentMonitoringForm
                    bcMonitoring={bcMonitoring}
                    onSubmit={handleBcMonitoringFormSubmit}
                    onCancel={() => {
                        setMode("view");
                    }}
                    error={error}
                />
            );
        }
        if (mode === "edit-name") {
            return (
                <BuildingComponentNameForm
                    buildingComponent={bcMonitoring.building_component}
                    onSubmit={handleBuildingComponentFormSubmit}
                    onCancel={() => {
                        setMode("view");
                    }}
                    error={error}
                />
            );
        }
    };

    return (
        bcMonitoring && (
            <SectionCard title="Seguimiento" secondaryActions={actions}>
                {getComponent(mode)}
            </SectionCard>
        )
    );
};

export default ViewOrUpdateBuildingComponentMonitoringDataContent;
