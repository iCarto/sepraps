import {AuthApiService} from "base/api/service";
import {ServiceUtil} from "base/api/utilities";

const StatsService = {
    getStatsByPhase(filter) {
        return AuthApiService.get(
            `/api/monitoring/stats/projectbyphase?${ServiceUtil.getFilterQueryString(
                filter
            )}`
        ).then(response => {
            return response;
        });
    },

    getMapsByPhase(filter) {
        return AuthApiService.get(
            `/api/monitoring/stats/projectbyphasemap?${ServiceUtil.getFilterQueryString(
                filter
            )}`
        ).then(response => {
            return response;
        });
    },

    getStatsByQuestionnaires(questionnaireCode, fieldCode, filter = {}) {
        return AuthApiService.get(
            this.getStatsByQuestionnairesUrl(questionnaireCode, fieldCode, filter)
        ).then(response => {
            return response;
        });
    },

    getStatsByQuestionnairesUrl(questionnaireCode, fieldCode, filter = {}) {
        return `/api/monitoring/stats/monthlyquestionnaires/${questionnaireCode}/${fieldCode}?${ServiceUtil.getFilterQueryString(
            filter
        )}`;
    },

    getStatsByGender(filter = {}) {
        return AuthApiService.get(
            `/api/monitoring/stats/contacts/gender?${ServiceUtil.getFilterQueryString(
                filter
            )}`
        ).then(response => {
            return response;
        });
    },

    getStatsByProjectsAndContracts(filter = {}) {
        return AuthApiService.get(`/api/monitoring/stats/projectandcontract`).then(
            response => {
                return response;
            }
        );
    },
};

export default StatsService;
