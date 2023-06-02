import {contacts_api_adapter, createContacts} from "contact/model";

class Providers extends Array {}

const provider_api_adapter = provider => {
    if (provider["contacts"]) {
        provider["contacts"] = createContacts(
            contacts_api_adapter(provider["contacts"])
        );
    }
    return provider;
};

const provider_view_adapter = provider => {
    delete provider["created_by"];
    delete provider["created_at"];
    delete provider["updated_at"];
    delete provider["updated_by"];

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
    area_label = "",
    type = "",
    type_label = "",
    number_of_members = null,
    number_of_women = null,
    is_legalized = false,
    is_legalized_label = false,
    legalization_date = null,
    legal_status = "",
    legal_status_label = "",
    legal_registry_code = "",
    project = null, // project id
    contacts = [],
    created_by = "",
    created_at = null,
    updated_at = null,
    updated_by = "",
} = {}) => {
    const publicApi = {
        id,
        name,
        area,
        type,
        area_label,
        type_label,
        number_of_members,
        number_of_women,
        is_legalized,
        is_legalized_label,
        legalization_date,
        legal_status,
        legal_status_label,
        legal_registry_code,
        project,
        contacts,
        created_by,
        created_at,
        updated_at,
        updated_by,
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
