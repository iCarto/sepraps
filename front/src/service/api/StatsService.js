import AuthApiService from "./AuthApiService";

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
            "/api/monitoring/projects/stats_by_phase" + queryString
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
            "/api/monitoring/projects/map_by_phase" + queryString
        ).then(response => {
            return response;
        });
    },

    getStatsByQuestionnaires(questionnaireCode, fieldCode, filter = {}) {
        return AuthApiService.get(
            `/api/monitoring/stats/monthlyquestionnaires/${questionnaireCode}/${fieldCode}?${getQueryStringByFilter(
                filter
            )}`
        ).then(response => {
            return response;
        });
    },

    getStatsByGender(filter = {}) {
        return AuthApiService.get(
            `/api/monitoring/stats/contacts/gender?${getQueryStringByFilter(filter)}`
        ).then(response => {
            return response;
        });
    },
};

export default StatsService;
