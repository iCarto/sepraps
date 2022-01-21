import {createProviders, providers_api_adapter} from "model";
import AuthApiService from "./AuthApiService";

const basePath = "/api/monitoring/providers";

const ProviderService = {
    getProviders() {
        return AuthApiService.get(basePath).then(response => {
            return createProviders(providers_api_adapter(response));
        });
    },
};

export default ProviderService;
