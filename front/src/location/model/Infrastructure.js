import {NumberUtil} from "base/format/utilities";

class Infrastructures extends Array {}

const infrastructure_api_adapter = infrastructure => {
    return infrastructure;
};

const infrastructure_view_adapter = infrastructure => {
    // in front-end falsy values are "" or undefined or null
    infrastructure["latitude"] = !!infrastructure["latitude"]
        ? NumberUtil.parseFloat(infrastructure["latitude"])
        : null;
    infrastructure["longitude"] = !!infrastructure["longitude"]
        ? NumberUtil.parseFloat(infrastructure["longitude"])
        : null;
    infrastructure["altitude"] = !!infrastructure["altitude"]
        ? NumberUtil.parseIntOrNull(infrastructure["altitude"])
        : null;
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
    latitude = null,
    longitude = null,
    altitude = null,
} = {}) => {
    const publicApi = {
        id,
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
    infrastructure_view_adapter,
};
