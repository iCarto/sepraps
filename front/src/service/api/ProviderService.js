import {
    createProvider,
    createProviders,
    providers_api_adapter,
    provider_api_adapter,
} from "model";
import AuthApiService from "./AuthApiService";

const basePath = "/api/monitoring/providers";

const ProviderService = {
    getProviders() {
        return AuthApiService.get(basePath).then(response => {
            return createProviders(providers_api_adapter(response));
        });
    },

    createProvider(provider) {
        return AuthApiService.post(basePath, provider).then(response => {
            return createProvider(provider_api_adapter(response));
        });
    },

    updateProvider(provider) {
        return AuthApiService.put(basePath + "/" + provider.id, provider).then(
            response => {
                return createProvider(provider_api_adapter(response));
            }
        );
    },
};

export default ProviderService;
