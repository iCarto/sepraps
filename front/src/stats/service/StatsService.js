import {AuthApiService} from "../../base/api/service";

const getQueryStringByFilter = filter => {
    return Object.keys(filter)
        .filter(key => filter[key])
        .map(key => {
            return key + "=" + filter[key];
        })
        .join("&");
};

const StatsService = {
    getStatsByPhase(filter) {
        const queryString = filter
            ? "?" +
              Object.keys(filter)
                  .map(filterAttribute => {
                      return `${filterAttribute}=${filter[filterAttribute]}`;
                  })
                  .join("&")
            : "";
        return AuthApiService.get(
            "/api/monitoring/stats/projectbyphase" + queryString
        ).then(response => {
            return response;
        });
    },

    getMapsByPhase(filter) {
        const queryString = filter
            ? "?" +
              Object.keys(filter)
                  .map(filterAttribute => {
                      return `${filterAttribute}=${filter[filterAttribute]}`;
                  })
                  .join("&")
            : "";
        return AuthApiService.get(
            "/api/monitoring/stats/projectbyphasemap" + queryString
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
        return `/api/monitoring/stats/monthlyquestionnaires/${questionnaireCode}/${fieldCode}?${getQueryStringByFilter(
            filter
        )}`;
    },

    getStatsByGender(filter = {}) {
        return AuthApiService.get(
            `/api/monitoring/stats/contacts/gender?${getQueryStringByFilter(filter)}`
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
