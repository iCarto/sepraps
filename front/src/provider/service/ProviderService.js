import {
    createProvider,
    createProviders,
    provider_api_adapter,
    providers_api_adapter,
} from "provider/model";
import {AuthApiService} from "../../base/api/service";

const basePath = "/api/monitoring/providers";

const ProviderService = {
    getAll() {
        return AuthApiService.get(basePath).then(response => {
            return createProviders(providers_api_adapter(response));
        });
    },

    getBySearchText(searchText) {
        return AuthApiService.get(basePath + `?search=${searchText}`).then(response => {
            return createProviders(providers_api_adapter(response));
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
