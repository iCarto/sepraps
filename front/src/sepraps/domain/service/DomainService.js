import {AuthApiService} from "base/api/service";

const basePath = "/api/domains/domains";

const DomainService = {
    getDomain() {
        return AuthApiService.get(basePath).then(response => {
            let domain = {};
            response.forEach(domainEntry => {
                if (!domain[domainEntry["category"]]) {
                    domain[domainEntry["category"]] = [];
                }
                domain[domainEntry["category"]].push({
                    value: domainEntry["key"],
                    label: domainEntry["value"],
                    ordering: domainEntry["ordering"],
                });
            });
            Object.entries(domain).forEach(domainCategory => {
                // sort array for every category by "ordering" field
                domainCategory[1].sort((a, b) => {
                    return a["ordering"] - b["ordering"];
                });
            });
            return domain;
        });
    },
};

export default DomainService;
