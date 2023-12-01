import {ServiceUtil} from "base/api/utilities";
import {AuthApiService} from "../../base/api/service";

const basePath = "/api/app/paymentstats";

const PaymentStatsService = {
    getPaymentStats(filter) {
        return AuthApiService.get(
            `${basePath}?${ServiceUtil.getFilterQueryString(filter)}`
        ).then(response => {
            return response;
        });
    },
};

export default PaymentStatsService;
