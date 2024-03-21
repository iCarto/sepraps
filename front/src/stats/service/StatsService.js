import {AuthApiService} from "base/api/service";
import {ServiceUtil} from "base/api/utilities";

const StatsService = {
    getStatsByPhase(filter) {
        return AuthApiService.get(
            `/api/app/stats/projectbyphase?${ServiceUtil.getFilterQueryString(filter)}`
        ).then(response => {
            return response;
        });
    },

    getMapsByPhase(filter) {
        return AuthApiService.get(
            `/api/app/stats/projectbyphasemap?${ServiceUtil.getFilterQueryString(
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
        return `/api/app/stats/monthlyquestionnaires/${questionnaireCode}/${fieldCode}?${ServiceUtil.getFilterQueryString(
            filter
        )}`;
    },

    getStatsByGender(filter = {}) {
        return AuthApiService.get(
            `/api/app/stats/providersgender?${ServiceUtil.getFilterQueryString(filter)}`
        ).then(response => {
            return response;
        });
    },

    getStatsProviderContacts(filter = {}) {
        return AuthApiService.get(
            `/api/app/stats/providerscontacts?${ServiceUtil.getFilterQueryString(
                filter
            )}`
        ).then(response => {
            return response;
        });
    },

    getStatsForProjectsContractsAndProviders(filter = {}) {
        return AuthApiService.get(`/api/app/stats/projectscontractsandproviders`).then(
            response => {
                return response;
            }
        );
    },
};

export default StatsService;
