import {createLocality} from "model";
import {contacts_api_adapter, createContacts} from "./Contact";
import {locality_api_adapter} from "./Locality";

class Providers extends Array {}

const provider_api_adapter = provider => {
    if (provider["locality"]) {
        provider["locality"] = createLocality(
            locality_api_adapter(provider["locality"])
        );
    }
    if (provider["contacts"]) {
        provider["contacts"] = createContacts(
            contacts_api_adapter(provider["contacts"])
        );
    }
    return provider;
};

const provider_view_adapter = provider => {
    if (provider["locality"]) {
        provider["locality"] = provider["locality"].code;
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
    project = -1, // project id
    contacts = [],
} = {}) => {
    const publicApi = {
        id,
        name,
        area,
        locality,
        project,
        contacts,
    };

    return Object.freeze(publicApi);
};

export {
    createProvider as default,
    createProviders,
    provider_api_adapter,
    providers_api_adapter,
    provider_view_adapter,
};
