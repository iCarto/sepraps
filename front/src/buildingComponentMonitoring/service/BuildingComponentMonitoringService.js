import {
    createBuildingMonitoringComponent,
    createBuildingComponentMonitorings,
    building_component_monitoring_api_adapter,
    building_component_monitorings_api_adapter,
} from "buildingComponentMonitoring/model";
import {comment_api_adapter, createComment} from "comment/model";
import {createEntityService} from "base/entity/service";
import {AuthApiService} from "base/api/service";

const basePath = "/api/app/buildingcomponentmonitorings";

const entityService = createEntityService(
    basePath,
    createBuildingMonitoringComponent,
    createBuildingComponentMonitorings,
    building_component_monitoring_api_adapter,
    building_component_monitorings_api_adapter
);

const BuildingComponentMonitoringService = {
    get(id) {
        return entityService.get(id).then(data => {
            return data;
        });
    },

    create(entity) {
        return entityService.create(entity);
    },

    update(entity) {
        return entityService.update(entity);
    },

    updateWithPatch(entity) {
        return entityService.updateWithPatch(entity);
    },

    delete(id) {
        return entityService.delete(id);
    },

    createComment(buildingComponentMonitoringId, comment) {
        return AuthApiService.post(
            `${basePath}/${buildingComponentMonitoringId}/comments`,
            comment
        ).then(response => {
            return createComment(comment_api_adapter(response));
        });
    },

    getBuildingComponentHistoric(buildingComponentId) {
        return AuthApiService.get(`${basePath}/${buildingComponentId}/history`).then(
            response => {
                return createBuildingComponentMonitorings(
                    building_component_monitorings_api_adapter(response)
                );
            }
        );
    },
};

export default BuildingComponentMonitoringService;
