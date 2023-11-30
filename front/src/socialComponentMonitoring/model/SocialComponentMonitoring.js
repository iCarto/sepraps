import {comments_api_adapter, createComments} from "comment/model";

class SocialComponentMonitorings extends Array {}

const social_component_monitoring_api_adapter = socialComponentMonitoring => {
    if (socialComponentMonitoring["comments"]) {
        socialComponentMonitoring["comments"] = createComments(
            comments_api_adapter(socialComponentMonitoring["comments"])
        );
    }

    return socialComponentMonitoring;
};

const social_component_monitoring_view_adapter = socialComponentMonitoring => {
    delete socialComponentMonitoring["folder"];
    delete socialComponentMonitoring["created_by"];
    delete socialComponentMonitoring["created_at"];
    delete socialComponentMonitoring["updated_at"];
    delete socialComponentMonitoring["updated_by"];

    delete socialComponentMonitoring["comments"];

    return socialComponentMonitoring;
};

const social_component_monitorings_api_adapter = socialComponentMonitorings => {
    return socialComponentMonitorings.map(social_component_monitoring_api_adapter);
};

const createSocialComponentMonitorings = (data = []) => {
    const socialComponentMonitorings = SocialComponentMonitorings.from(
        data,
        socialComponentMonitoring =>
            createSocialComponentMonitoring(socialComponentMonitoring)
    );
    return socialComponentMonitorings;
};

const createSocialComponentMonitoring = ({
    id = null,
    code = "",
    name = "",
    execution_status = "",
    execution_status_label = "",
    quality_status = "",
    quality_status_label = "",
    expected_end_date = "",
    real_end_date = "",
    progress_percentage = "",
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
        expected_end_date,
        real_end_date,
        progress_percentage,
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

export {
    createSocialComponentMonitoring as default,
    createSocialComponentMonitorings,
    social_component_monitoring_api_adapter,
    social_component_monitorings_api_adapter,
    social_component_monitoring_view_adapter,
};
