import {ServiceUtil} from "base/api/utilities";
import {AuthApiService} from "../../base/api/service";

const basePath = "/api/app/projectstats";

const ProjectStatsService = {
    getBuildingComponentsStats(groupByAttribute, filter) {
        groupByAttribute = groupByAttribute || "component_code";
        return AuthApiService.get(
            `${basePath}/buildingcomponents/${groupByAttribute}?${ServiceUtil.getFilterQueryString(
                filter
            )}`
        ).then(response => {
            return response;
        });
    },

    getBuildingComponentsTotalStats(filter) {
        return AuthApiService.get(
            `${basePath}/buildingcomponentstotal?${ServiceUtil.getFilterQueryString(
                filter
            )}`
        ).then(response => {
            return response;
        });
    },

    // All trainings details
    getSocialComponentTrainingsTotalStats(filter, format = null) {
        console.log({format});
        return AuthApiService.get(
            `${basePath}/socialcomponenttrainingssum?${ServiceUtil.getFilterQueryString(
                filter
            )}`,
            ServiceUtil.getAcceptHeader(format)
        ).then(response => {
            console.log("getSocialComponentTrainingsTotalStats", response);
            return response;
        });
    },

    // Training totals by component (men, women, women %, etc.) -- get_social_component_trainings_multi_stats()
    getSocialComponentTrainingsStats(groupByAttribute = "component_code", filter) {
        return AuthApiService.get(
            `${basePath}/socialcomponenttrainings/${groupByAttribute}?${ServiceUtil.getFilterQueryString(
                filter
            )}`
        ).then(response => {
            console.log("getSocialComponentTrainingsStats", response);
            return response;
        });
    },

    getConnectionsTotalStats(filter, format = null) {
        return AuthApiService.get(
            `${basePath}/connectionstotal?${ServiceUtil.getFilterQueryString(filter)}`,
            ServiceUtil.getAcceptHeader(format)
        ).then(response => {
            return response;
        });
    },
};

export default ProjectStatsService;
