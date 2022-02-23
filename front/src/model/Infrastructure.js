import {createLocality, locality_api_adapter} from "model";

class Infrastructures extends Array {}

const infrastructure_api_adapter = infrastructure => {
    if (infrastructure["locality"]) {
        infrastructure["locality"] = createLocality(
            locality_api_adapter(infrastructure["locality"])
        );
    }
    return infrastructure;
};

const infrastructures_api_adapter = infrastructures =>
    infrastructures.map(infrastructure_api_adapter);

const createInfrastructures = (data = []) => {
    const infrastructures = Infrastructures.from(data, infrastructure =>
        createInfrastructure(infrastructure)
    );
    return infrastructures;
};

const createInfrastructure = ({
    id = -1,
    locality = createLocality(),
    latitude = -1,
    longitude = -1,
    altitude = -1,
} = {}) => {
    const publicApi = {
        id,
        locality,
        latitude,
        longitude,
        altitude,
    };

    return Object.freeze(publicApi);
};

export {
    createInfrastructure as default,
    createInfrastructures,
    infrastructure_api_adapter,
    infrastructures_api_adapter,
};
