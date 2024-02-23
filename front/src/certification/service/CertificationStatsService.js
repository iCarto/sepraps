import {ServiceUtil} from "base/api/utilities";
import {AuthApiService} from "../../base/api/service";

const basePath = "/api/app/certificationstats";

const CertificationStatsService = {
    getCertificationStats(filter) {
        return AuthApiService.get(
            `${basePath}?${ServiceUtil.getFilterQueryString(filter)}`
        ).then(response => {
            return response;
        });
    },
};

export default CertificationStatsService;
