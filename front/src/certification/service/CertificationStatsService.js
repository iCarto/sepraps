import {ServiceUtil} from "base/api/utilities";
import {AuthApiService} from "../../base/api/service";

const basePath = "/api/app/certificationstats";

const CertificationStatsService = {
    getCertificationStatsTemporal(filter) {
        return AuthApiService.get(
            `${basePath}/temporal?${ServiceUtil.getFilterQueryString(filter)}`
        ).then(response => {
            return response;
        });
    },

    getCertificationStatsTotals(filter, format = null) {
        return AuthApiService.get(
            `${basePath}/certifications?${ServiceUtil.getFilterQueryString(filter)}`,
            ServiceUtil.getAcceptHeader(format)
        ).then(response => {
            return response;
        });
    },
};

export default CertificationStatsService;
