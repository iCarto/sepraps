class Localities extends Array {}

const locality_api_adapter = locality => {
    return locality;
};

const localities_api_adapter = localities => localities.map(locality_api_adapter);

const createLocalities = (data = []) => {
    const localities = Localities.from(data, locality => createLocality(locality));
    return localities;
};

const createLocality = ({
    code = "",
    name = "",
    district = "",
    district_name = "",
    department = "",
    department_name = "",
} = {}) => {
    const publicApi = {
        code,
        name,
        district,
        district_name,
        department,
        department_name,
    };

    return Object.freeze(publicApi);
};

export {
    createLocality as default,
    createLocalities,
    locality_api_adapter,
    localities_api_adapter,
};
