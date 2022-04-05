import AuthApiService from "./AuthApiService";

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
};

export default StatsService;
