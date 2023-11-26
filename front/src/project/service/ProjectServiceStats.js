import {ServiceUtil} from "base/api/utilities";
import {AuthApiService} from "../../base/api/service";

const basePath = "/api/app/projectstats";

const ProjectStatsService = {
    getBuildingComponentsStats(filter) {
        return AuthApiService.get(
            `${basePath}/buildingcomponents?${ServiceUtil.getFilterQueryString(filter)}`
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

    getSocialComponentTrainingsStats(groupByAttribute = "component_code", filter) {
        return AuthApiService.get(
            `${basePath}/socialcomponenttrainings/${groupByAttribute}?${ServiceUtil.getFilterQueryString(
                filter
            )}`
        ).then(response => {
            return response;
        });
    },
};

export default ProjectStatsService;
