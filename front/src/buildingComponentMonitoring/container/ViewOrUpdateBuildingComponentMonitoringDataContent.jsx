import {useState} from "react";
import {useNavigateWithReload} from "base/navigation/hooks";

import {BuildingComponentMonitoringService} from "buildingComponentMonitoring/service";
import {building_component_monitoring_view_adapter} from "buildingComponentMonitoring/model";

import {SectionCard, SectionCardHeaderAction} from "base/ui/section/components";
import {BuildingComponentMonitoringData} from "buildingComponentMonitoring/presentational";
import {BuildingComponentMonitoringForm} from "buildingComponentMonitoring/presentational/form";

import EditIcon from "@mui/icons-material/Edit";
import {ViewBuildingComponentsHistoricTable} from ".";
import Box from "@mui/material/Box";

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
            text="Modificar"
            icon={<EditIcon />}
            onClick={() => {
                setMode("edit");
            }}
        />,
    ];

    const getComponent = mode => {
        if (mode === "view") {
            return (
                <>
                    <BuildingComponentMonitoringData bcMonitoring={bcMonitoring} />
                    <ViewBuildingComponentsHistoricTable
                        buildingComponentId={bcMonitoring.id}
                    />
                </>
            );
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
