import {contacts_api_adapter, createContacts} from "contact/model";
import {createLocality, locality_api_adapter} from "location/model";

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
    delete provider["creation_user"];
    delete provider["created_at"];
    delete provider["updated_at"];

    return provider;
};

const providers_api_adapter = providers => {
    return providers.map(provider_api_adapter);
};

const createProviders = (data = []) => {
    const providers = Providers.from(data, provider => createProvider(provider));
    return providers;
};

const createProvider = ({
    id = null,
    name = "",
    area = "",
    locality = createLocality(),
    project = null, // project id
    contacts = [],
    creation_user = "",
    created_at = null,
    updated_at = null,
} = {}) => {
    const publicApi = {
        id,
        name,
        area,
        locality,
        project,
        contacts,
        creation_user,
        created_at,
        updated_at,
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
