import {createLocality} from "model";
import {locality_api_adapter} from "./Locality";

class Providers extends Array {}

const provider_api_adapter = provider => {
    if (provider["locality"]) {
        provider["locality"] = createLocality(
            locality_api_adapter(provider["locality"])
        );
    }
    return provider;
};

const providers_api_adapter = providers => providers.map(provider_api_adapter);

const createProviders = (data = []) => {
    const providers = Providers.from(data, provider => createProvider(provider));
    return providers;
};

const createProvider = ({
    id = null,
    name = "",
    area = "",
    locality = createLocality(),
} = {}) => {
    const publicApi = {
        id,
        name,
        area,
        locality,
    };

    return Object.freeze(publicApi);
};

export {
    createProvider as default,
    createProviders,
    provider_api_adapter,
    providers_api_adapter,
};
