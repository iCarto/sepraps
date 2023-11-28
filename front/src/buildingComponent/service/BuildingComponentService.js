import {
    createBuildingComponent,
    createBuildingComponents,
    building_component_api_adapter,
    building_components_api_adapter,
} from "buildingComponent/model";
import {createEntityService} from "base/entity/service";
import {AuthApiService} from "base/api/service";
import {comment_api_adapter, createComment} from "comment/model";

const basePath = "/api/app/buildingcomponents";

const entityService = createEntityService(
    basePath,
    createBuildingComponent,
    createBuildingComponents,
    building_component_api_adapter,
    building_components_api_adapter
);

const BuildingComponentService = {
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

    delete(id) {
        return entityService.delete(id);
    },

    createComment(buildingComponentId, comment) {
        return AuthApiService.post(
            `${basePath}/${buildingComponentId}/comments`,
            comment
        ).then(response => {
            return createComment(comment_api_adapter(response));
        });
    },
};

export default BuildingComponentService;
