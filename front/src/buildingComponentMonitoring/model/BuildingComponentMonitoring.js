import {
    createBuildingComponent,
    building_component_api_adapter,
} from "buildingComponent/model";
import {comments_api_adapter, createComments} from "comment/model";

class BuildingComponentMonitorings extends Array {}

const building_component_monitoring_api_adapter = buildingComponentMonitoring => {
    if (buildingComponentMonitoring["comments"]) {
        buildingComponentMonitoring["comments"] = createComments(
            comments_api_adapter(buildingComponentMonitoring["comments"])
        );
    }
    if (buildingComponentMonitoring["building_component"]) {
        buildingComponentMonitoring["building_component"] = createBuildingComponent(
            building_component_api_adapter({
                ...buildingComponentMonitoring["building_component"],
            })
        );
    }
    if (
        buildingComponentMonitoring["execution_status"] ===
        COMPONENT_EXECUTION_STATUS_COMPLETED
    ) {
        buildingComponentMonitoring["pending_amount"] = 0;
    }

    return buildingComponentMonitoring;
};

const building_component_monitoring_view_adapter = buildingComponentMonitoring => {
    delete buildingComponentMonitoring["folder"];
    delete buildingComponentMonitoring["created_by"];
    delete buildingComponentMonitoring["created_at"];
    delete buildingComponentMonitoring["updated_at"];
    delete buildingComponentMonitoring["updated_by"];

    delete buildingComponentMonitoring["comments"];

    return buildingComponentMonitoring;
};

const building_component_monitorings_api_adapter = buildingComponentMonitorings => {
    return buildingComponentMonitorings.map(building_component_monitoring_api_adapter);
};

const createBuildingComponentMonitorings = (data = []) => {
    const buildingComponentMonitorings = BuildingComponentMonitorings.from(
        data,
        buildingComponentMonitoring =>
            createBuildingComponentMonitoring(buildingComponentMonitoring)
    );
    return buildingComponentMonitorings;
};

const createBuildingComponentMonitoring = ({
    id = null,
    code = "",
    name = "",
    execution_status = "",
    execution_status_label = "",
    quality_status = "",
    quality_status_label = "",
    expected_amount = "",
    expected_end_date = "",
    paid_amount = "",
    pending_amount = "",
    total_amount = "",
    financial_progress_percentage = "",
    physical_progress_percentage = "",
    real_end_date = "",
    building_component = null,
    comments = [],
    project = null,
    folder = "",
    created_by = "",
    created_at = null,
    updated_by = "",
    updated_at = null,
} = {}) => {
    const publicApi = {
        id,
        code,
        name,
        execution_status,
        execution_status_label,
        quality_status,
        quality_status_label,
        expected_amount,
        expected_end_date,
        paid_amount,
        pending_amount,
        total_amount,
        financial_progress_percentage,
        physical_progress_percentage,
        real_end_date,
        building_component,
        comments,
        project,
        folder,
        created_by,
        created_at,
        updated_at,
        updated_by,
    };

    return Object.freeze(publicApi);
};

export const COMPONENT_EXECUTION_STATUS_COMPLETED = "finalizado";
export const COMPONENT_EXECUTION_STATUS_IN_PROGRESS = "en_proceso";

export {
    createBuildingComponentMonitoring as default,
    createBuildingComponentMonitorings,
    building_component_monitoring_api_adapter,
    building_component_monitorings_api_adapter,
    building_component_monitoring_view_adapter,
};
