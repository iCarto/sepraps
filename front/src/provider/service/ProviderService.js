import {
    createProvider,
    createProviders,
    provider_api_adapter,
    providers_api_adapter,
} from "provider/model";
import {AuthApiService} from "../../base/api/service";
import {ServiceUtil} from "base/api/utilities";

const basePath = "/api/monitoring/providers";

const ProviderService = {
    getAll(filter, page, sort, order) {
        return AuthApiService.get(
            `${basePath}?page=${page}&${ServiceUtil.getFilterQueryString(
                filter
            )}&${ServiceUtil.getOrderQueryString(sort, order)}`
        ).then(response => {
            response.results = createProviders(providers_api_adapter(response.results));
            return response;
        });
    },

    getBySearchText(searchText) {
        return AuthApiService.get(basePath + `?search=${searchText}`).then(response => {
            return createProviders(providers_api_adapter(response.results));
        });
    },

    get(id) {
        return AuthApiService.get(basePath + "/" + id).then(response => {
            return createProvider(provider_api_adapter(response));
        });
    },

    create(provider) {
        return AuthApiService.post(basePath, provider).then(response => {
            return createProvider(provider_api_adapter(response));
        });
    },

    update(provider) {
        return AuthApiService.put(basePath + "/" + provider.id, provider).then(
            response => {
                return createProvider(provider_api_adapter(response));
            }
        );
    },
};

export default ProviderService;
