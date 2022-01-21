class Providers extends Array {}

const provider_api_adapter = provider => {
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
    department = "",
    department_name = "",
    district = "",
    district_name = "",
    locality = "",
    locality_name = "",
} = {}) => {
    const publicApi = {
        id,
        name,
        area,
        department,
        department_name,
        district,
        district_name,
        locality,
        locality_name,
    };

    return Object.freeze(publicApi);
};

export {
    createProvider as default,
    createProviders,
    provider_api_adapter,
    providers_api_adapter,
};
