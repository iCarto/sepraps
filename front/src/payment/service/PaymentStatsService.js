import {ServiceUtil} from "base/api/utilities";
import {AuthApiService} from "../../base/api/service";

const basePath = "/api/app/paymentstats";

const PaymentStatsService = {
    getPaymentStatsTemporal(filter, format = null) {
        return AuthApiService.get(
            `${basePath}/temporal?${ServiceUtil.getFilterQueryString(filter)}`,
            ServiceUtil.getAcceptHeader(format)
        ).then(response => {
            return response;
        });
    },

    getPaymentStatsTotals(filter, format = null) {
        return AuthApiService.get(
            `${basePath}/payments?${ServiceUtil.getFilterQueryString(filter)}`,
            ServiceUtil.getAcceptHeader(format)
        ).then(response => {
            return response;
        });
    },
};

export default PaymentStatsService;
