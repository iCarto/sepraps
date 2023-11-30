import {
    createSocialComponentMonitoring,
    createSocialComponentMonitorings,
    social_component_monitoring_api_adapter,
    social_component_monitorings_api_adapter,
} from "socialComponentMonitoring/model";
import {comment_api_adapter, createComment} from "comment/model";
import {createEntityService} from "base/entity/service";
import {AuthApiService} from "base/api/service";

const basePath = "/api/app/socialcomponentmonitorings";

const entityService = createEntityService(
    basePath,
    createSocialComponentMonitoring,
    createSocialComponentMonitorings,
    social_component_monitoring_api_adapter,
    social_component_monitorings_api_adapter
);

const SocialComponentMonitoringService = {
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

    createComment(socialComponentMonitoringId, comment) {
        return AuthApiService.post(
            `${basePath}/${socialComponentMonitoringId}/comments`,
            comment
        ).then(response => {
            return createComment(comment_api_adapter(response));
        });
    },
};

export default SocialComponentMonitoringService;
